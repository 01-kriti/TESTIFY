import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Play, BookOpen } from "lucide-react"

interface TestCardProps {
  test: {
    id: number
    name: string
    questions: number
    time: number
    difficulty: string
    description?: string
    category?: string
  }
}

export function TestCard({ test }: TestCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{test.name}</CardTitle>
          <Badge className={`font-normal ${getDifficultyColor(test.difficulty)}`}>{test.difficulty}</Badge>
        </div>
        {test.category && (
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="mr-1 h-3 w-3" />
            {test.category}
          </div>
        )}
        {test.description && <CardDescription className="text-sm">{test.description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FileText className="mr-1 h-4 w-4" />
            <span>{test.questions} questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{test.time} minutes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/test/${test.id}`}>
            <Play className="mr-2 h-4 w-4" />
            Start Test
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
