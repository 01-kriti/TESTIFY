import { NextResponse } from "next/server"
import { resultQueries } from "@/lib/db"

export async function GET() {
  try {
    const leaderboard = await resultQueries.getLeaderboard()
    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, quizId, score, timeTaken } = await request.json()

    // Validate input
    if (!userId || !quizId || score === undefined || !timeTaken) {
      return NextResponse.json({ error: "User ID, quiz ID, score, and time taken are required" }, { status: 400 })
    }

    // Calculate rank (simplified for now)
    const rank = 1 // In a real app, you would calculate this based on other scores

    // Create result
    const result = await resultQueries.createResult(userId, quizId, score, timeTaken, rank)

    // Since result is an array with the first element containing the insert metadata
    const insertId = result[0]?.insertId || null

    return NextResponse.json({
      message: "Result saved successfully",
      resultId: insertId,
    })
  } catch (error) {
    console.error("Error saving result:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
