import { NextResponse } from "next/server"
import { userQueries } from "@/lib/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    console.log("Login attempt for:", email) // Debug log

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Get user from database
    const user = await userQueries.getUserByEmail(email)
    console.log("User found:", user ? "Yes" : "No") // Debug log

    // Check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log("Password valid:", isPasswordValid) // Debug log

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.u_id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "7d",
      },
    )

    console.log("Login successful for:", user.email) // Debug log

    // Return user data and token
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.u_id,
        name: user.name,
        email: user.email,
        domain: user.domain,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
