import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, UserCog, Ban } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock users data
const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", tests: 8, avatar: "JD", active: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", tests: 7, avatar: "JS", active: true },
  { id: 3, name: "Alex Johnson", email: "alex@example.com", tests: 9, avatar: "AJ", active: true },
  { id: 4, name: "Sam Wilson", email: "sam@example.com", tests: 6, avatar: "SW", active: false },
  { id: 5, name: "Taylor Brown", email: "taylor@example.com", tests: 5, avatar: "TB", active: true },
  { id: 6, name: "Jordan Lee", email: "jordan@example.com", tests: 7, avatar: "JL", active: true },
  { id: 7, name: "Casey Miller", email: "casey@example.com", tests: 4, avatar: "CM", active: false },
  { id: 8, name: "Riley Davis", email: "riley@example.com", tests: 6, avatar: "RD", active: true },
]

export function UsersTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Tests Taken</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?text=${user.avatar}`} alt={user.name} />
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>{user.name}</div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-right">{user.tests}</TableCell>
              <TableCell>
                {user.active ? <Badge variant="success">Active</Badge> : <Badge variant="destructive">Suspended</Badge>}
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
                    <DropdownMenuItem>
                      <UserCog className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className={user.active ? "text-red-600" : "text-green-600"}>
                      <Ban className="mr-2 h-4 w-4" />
                      {user.active ? "Suspend User" : "Activate User"}
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
