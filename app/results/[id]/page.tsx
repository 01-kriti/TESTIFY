"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Clock, Trophy, ArrowLeft } from "lucide-react"

// Mock result data
const mockResult = {
  testId: 1,
  testName: "JavaScript Fundamentals",
  score: 4,
  totalQuestions: 5,
  timeTaken: "12:45",
  rank: 3,
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a JavaScript data type?",
      userAnswer: 3,
      correctAnswer: 3,
      isCorrect: true,
      options: [
        { id: 1, text: "String" },
        { id: 2, text: "Boolean" },
        { id: 3, text: "Float" },
        { id: 4, text: "Object" },
      ],
    },
    {
      id: 2,
      text: "What does the '===' operator do in JavaScript?",
      userAnswer: 5,
      correctAnswer: 6,
      isCorrect: false,
      options: [
        { id: 5, text: "Checks for equality with type conversion" },
        { id: 6, text: "Checks for equality without type conversion" },
        { id: 7, text: "Assigns a value to a variable" },
        { id: 8, text: "None of the above" },
      ],
    },
    {
      id: 3,
      text: "Which method is used to add elements to the end of an array?",
      userAnswer: 9,
      correctAnswer: 9,
      isCorrect: true,
      options: [
        { id: 9, text: "push()" },
        { id: 10, text: "pop()" },
        { id: 11, text: "unshift()" },
        { id: 12, text: "shift()" },
      ],
    },
    {
      id: 4,
      text: "What is the correct way to create a function in JavaScript?",
      userAnswer: 15,
      correctAnswer: 15,
      isCorrect: true,
      options: [
        { id: 13, text: "function = myFunction() {}" },
        { id: 14, text: "function:myFunction() {}" },
        { id: 15, text: "function myFunction() {}" },
        { id: 16, text: "create myFunction() {}" },
      ],
    },
    {
      id: 5,
      text: "Which of these is not a JavaScript framework or library?",
      userAnswer: 19,
      correctAnswer: 19,
      isCorrect: true,
      options: [
        { id: 17, text: "React" },
        { id: 18, text: "Angular" },
        { id: 19, text: "Django" },
        { id: 20, text: "Vue" },
      ],
    },
  ],
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [showExplanations, setShowExplanations] = useState(false)

  const percentage = Math.round((mockResult.score / mockResult.totalQuestions) * 100)
  const isPassing = percentage >= 70

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold">Test Results</h1>
        <p className="text-muted-foreground">{mockResult.testName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="text-3xl font-bold">
                {mockResult.score}/{mockResult.totalQuestions}
              </div>
              <Badge variant={isPassing ? "success" : "destructive"} className="mb-1">
                {percentage}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Taken</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="text-3xl font-bold">{mockResult.timeTaken}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rank</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <div className="text-3xl font-bold">#{mockResult.rank}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Question Review</h2>
        <Button variant="outline" onClick={() => setShowExplanations(!showExplanations)}>
          {showExplanations ? "Hide Explanations" : "Show Explanations"}
        </Button>
      </div>

      <div className="space-y-6">
        {mockResult.questions.map((question, index) => (
          <Card key={question.id} className={question.isCorrect ? "border-green-200" : "border-red-200"}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                {question.isCorrect ? (
                  <Badge variant="success" className="ml-auto">
                    Correct
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="ml-auto">
                    Incorrect
                  </Badge>
                )}
              </div>
              <CardDescription>{question.text}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {question.options.map((option) => {
                  const isUserAnswer = option.id === question.userAnswer
                  const isCorrectAnswer = option.id === question.correctAnswer

                  let className = "p-3 rounded-md flex justify-between items-center"

                  if (isUserAnswer && isCorrectAnswer) {
                    className += " bg-green-100 dark:bg-green-900/20"
                  } else if (isUserAnswer && !isCorrectAnswer) {
                    className += " bg-red-100 dark:bg-red-900/20"
                  } else if (isCorrectAnswer) {
                    className += " bg-green-100 dark:bg-green-900/20"
                  } else {
                    className += " bg-muted/40"
                  }

                  return (
                    <div key={option.id} className={className}>
                      <span>{option.text}</span>
                      <div>
                        {isUserAnswer && isCorrectAnswer && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                        {isUserAnswer && !isCorrectAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                        {!isUserAnswer && isCorrectAnswer && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                      </div>
                    </div>
                  )
                })}
              </div>

              {showExplanations && (
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <p className="font-medium">Explanation:</p>
                  <p className="text-muted-foreground">
                    {question.isCorrect
                      ? "Your answer is correct! Well done."
                      : `The correct answer is "${question.options.find((o) => o.id === question.correctAnswer)?.text}". ${
                          question.id === 2
                            ? "The === operator checks for equality without type conversion, meaning it checks both value and type."
                            : ""
                        }`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
