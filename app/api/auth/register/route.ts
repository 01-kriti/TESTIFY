import { NextResponse } from "next/server"
import { userQueries } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { name, email, password, gender, age, domain } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await userQueries.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await userQueries.createUser(name, email, hashedPassword, gender || "", age || 0, domain || "")

    // Debug log to see the structure
    console.log("Database result structure:", JSON.stringify(result, null, 2))

    // Get the last inserted ID directly from a separate query
    const newUser = await userQueries.getUserByEmail(email)
    console.log("New user object:", JSON.stringify(newUser, null, 2))

    // Get the user ID
    const userId = newUser ? newUser.u_id : null

    return NextResponse.json({
      message: "User registered successfully",
      userId: userId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
