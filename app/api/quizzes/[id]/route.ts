import { NextResponse } from "next/server"
import { quizQueries, questionQueries, optionQueries } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const quizId = Number.parseInt(params.id)

    // Get quiz details
    const quiz = await quizQueries.getQuizById(quizId)

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 })
    }

    // Get questions for this quiz
    const questions = await questionQueries.getQuestionsByQuizId(quizId)

    // For each question, get its options
    const questionsWithOptions = await Promise.all(
      questions.map(async (question: any) => {
        const options = await optionQueries.getOptionsByQuestionId(question.ques_id)
        return {
          ...question,
          options,
        }
      }),
    )

    return NextResponse.json({
      ...quiz,
      questions: questionsWithOptions,
    })
  } catch (error) {
    console.error("Error fetching quiz:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
