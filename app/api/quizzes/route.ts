import { NextResponse } from "next/server"
import { quizQueries } from "@/lib/db"

export async function GET() {
  try {
    const quizzes = await quizQueries.getAllQuizzes()
    return NextResponse.json(quizzes)
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, time } = await request.json()

    // Validate input
    if (!name || !time) {
      return NextResponse.json({ error: "Name and time are required" }, { status: 400 })
    }

    // Create quiz
    const result = await quizQueries.createQuiz(name, time)

    // Since result is an array with the first element containing the insert metadata
    const insertId = result[0]?.insertId || null

    return NextResponse.json({
      message: "Quiz created successfully",
      quizId: insertId,
    })
  } catch (error) {
    console.error("Error creating quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
