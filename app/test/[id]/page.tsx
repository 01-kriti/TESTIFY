"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for a test
const mockTest = {
  id: 1,
  name: "JavaScript Fundamentals",
  time: 30, // minutes
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a JavaScript data type?",
      marks: 1,
      options: [
        { id: 1, text: "String", isCorrect: false },
        { id: 2, text: "Boolean", isCorrect: false },
        { id: 3, text: "Float", isCorrect: true },
        { id: 4, text: "Object", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "What does the '===' operator do in JavaScript?",
      marks: 1,
      options: [
        { id: 5, text: "Checks for equality with type conversion", isCorrect: false },
        { id: 6, text: "Checks for equality without type conversion", isCorrect: true },
        { id: 7, text: "Assigns a value to a variable", isCorrect: false },
        { id: 8, text: "None of the above", isCorrect: false },
      ],
    },
    {
      id: 3,
      text: "Which method is used to add elements to the end of an array?",
      marks: 1,
      options: [
        { id: 9, text: "push()", isCorrect: true },
        { id: 10, text: "pop()", isCorrect: false },
        { id: 11, text: "unshift()", isCorrect: false },
        { id: 12, text: "shift()", isCorrect: false },
      ],
    },
    {
      id: 4,
      text: "What is the correct way to create a function in JavaScript?",
      marks: 1,
      options: [
        { id: 13, text: "function = myFunction() {}", isCorrect: false },
        { id: 14, text: "function:myFunction() {}", isCorrect: false },
        { id: 15, text: "function myFunction() {}", isCorrect: true },
        { id: 16, text: "create myFunction() {}", isCorrect: false },
      ],
    },
    {
      id: 5,
      text: "Which of these is not a JavaScript framework or library?",
      marks: 1,
      options: [
        { id: 17, text: "React", isCorrect: false },
        { id: 18, text: "Angular", isCorrect: false },
        { id: 19, text: "Django", isCorrect: true },
        { id: 20, text: "Vue", isCorrect: false },
      ],
    },
  ],
}

export default function TestPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(mockTest.time * 60) // convert to seconds
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswer = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // In a real app, you would send the answers to the server here
    setTimeout(() => {
      // Redirect to results page
      router.push(`/results/${params.id}`)
    }, 1500)
  }

  const question = mockTest.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / mockTest.questions.length) * 100
  const isLastQuestion = currentQuestion === mockTest.questions.length - 1
  const timeWarning = timeLeft <= 60 // 1 minute warning

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{mockTest.name}</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {mockTest.questions.length}
          </p>
        </div>
        <div className={`flex items-center gap-2 ${timeWarning ? "text-red-500 animate-pulse" : ""}`}>
          <Clock className="h-5 w-5" />
          <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <Progress value={progress} className="mb-6" />

      {timeWarning && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Time is running out!</AlertTitle>
          <AlertDescription>You have less than a minute remaining to complete this test.</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{question.text}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[question.id]?.toString()}
            onValueChange={(value) => handleAnswer(question.id, Number.parseInt(value))}
          >
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                <Label htmlFor={`option-${option.id}`} className="flex-grow cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-auto">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        {isLastQuestion ? (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  )
}
