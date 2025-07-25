import { NextResponse } from "next/server"
import { userQueries } from "@/lib/db"
import { jwtVerify } from "jose"

// Helper to get user ID from token
async function getUserIdFromToken(request: Request) {
  const authHeader = request.headers.get("Authorization")
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")
    const { payload } = await jwtVerify(token, secret)
    return payload.userId as number
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await userQueries.getUserById(userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Exclude password from response
    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await getUserIdFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, gender, age, domain } = await request.json()

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Check if email is already taken by another user
    const existingUser = await userQueries.getUserByEmail(email)
    if (existingUser && existingUser.u_id !== userId) {
      return NextResponse.json({ error: "Email already in use by another account" }, { status: 409 })
    }

    await userQueries.updateUser(userId, name, email, gender, age, domain)

    const updatedUser = await userQueries.getUserById(userId)
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found after update" }, { status: 404 })
    }

    const { password, ...userWithoutPassword } = updatedUser
    return NextResponse.json({ message: "Profile updated successfully", user: userWithoutPassword })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
