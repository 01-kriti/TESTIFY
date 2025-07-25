import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock questions data
const questionsData = [
  {
    id: 1,
    text: "Which of the following is NOT a JavaScript data type?",
    quiz: "JavaScript Fundamentals",
    marks: 1,
    options: 4,
  },
  {
    id: 2,
    text: "What does the '===' operator do in JavaScript?",
    quiz: "JavaScript Fundamentals",
    marks: 1,
    options: 4,
  },
  {
    id: 3,
    text: "Which method is used to add elements to the end of an array?",
    quiz: "JavaScript Fundamentals",
    marks: 1,
    options: 4,
  },
  {
    id: 4,
    text: "What is the correct way to create a function in JavaScript?",
    quiz: "JavaScript Fundamentals",
    marks: 1,
    options: 4,
  },
  {
    id: 5,
    text: "Which of these is not a JavaScript framework or library?",
    quiz: "JavaScript Fundamentals",
    marks: 1,
    options: 4,
  },
  {
    id: 6,
    text: "What is JSX in React?",
    quiz: "React Basics",
    marks: 2,
    options: 4,
  },
  {
    id: 7,
    text: "What is the purpose of useState hook in React?",
    quiz: "React Basics",
    marks: 2,
    options: 4,
  },
  {
    id: 8,
    text: "How do you create a controlled component in React?",
    quiz: "React Basics",
    marks: 3,
    options: 4,
  },
]

export function QuestionsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Question</TableHead>
            <TableHead>Quiz</TableHead>
            <TableHead className="text-right">Marks</TableHead>
            <TableHead className="text-right">Options</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questionsData.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="font-medium">
                {question.text.length > 60 ? `${question.text.substring(0, 60)}...` : question.text}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{question.quiz}</Badge>
              </TableCell>
              <TableCell className="text-right">{question.marks}</TableCell>
              <TableCell className="text-right">{question.options}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
