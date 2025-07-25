import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock tests data
const testsData = [
  { id: 1, name: "JavaScript Fundamentals", questions: 20, time: 30, active: true, attempts: 45 },
  { id: 2, name: "React Basics", questions: 15, time: 20, active: true, attempts: 32 },
  { id: 3, name: "Node.js Advanced", questions: 25, time: 40, active: false, attempts: 18 },
  { id: 4, name: "SQL Queries", questions: 15, time: 25, active: true, attempts: 27 },
  { id: 5, name: "HTML & CSS Basics", questions: 20, time: 30, active: true, attempts: 56 },
  { id: 6, name: "Python Programming", questions: 25, time: 35, active: false, attempts: 12 },
  { id: 7, name: "Data Structures", questions: 30, time: 45, active: true, attempts: 8 },
  { id: 8, name: "Algorithms", questions: 20, time: 40, active: false, attempts: 5 },
]

export function TestsTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Questions</TableHead>
            <TableHead className="text-right">Time (min)</TableHead>
            <TableHead className="text-right">Attempts</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testsData.map((test) => (
            <TableRow key={test.id}>
              <TableCell className="font-medium">{test.name}</TableCell>
              <TableCell className="text-right">{test.questions}</TableCell>
              <TableCell className="text-right">{test.time}</TableCell>
              <TableCell className="text-right">{test.attempts}</TableCell>
              <TableCell>
                {test.active ? <Badge variant="success">Active</Badge> : <Badge variant="outline">Inactive</Badge>}
              </TableCell>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/tests/${test.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
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
