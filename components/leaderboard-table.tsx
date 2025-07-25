import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock leaderboard data
const leaderboardData = [
  { id: 1, name: "John Doe", score: 95, tests: 8, rank: 1, avatar: "JD" },
  { id: 2, name: "Jane Smith", score: 92, tests: 7, rank: 2, avatar: "JS" },
  { id: 3, name: "Alex Johnson", score: 88, tests: 9, rank: 3, avatar: "AJ" },
  { id: 4, name: "Sam Wilson", score: 85, tests: 6, rank: 4, avatar: "SW" },
  { id: 5, name: "Taylor Brown", score: 82, tests: 5, rank: 5, avatar: "TB" },
  { id: 6, name: "Jordan Lee", score: 78, tests: 7, rank: 6, avatar: "JL" },
  { id: 7, name: "Casey Miller", score: 75, tests: 4, rank: 7, avatar: "CM" },
  { id: 8, name: "Riley Davis", score: 72, tests: 6, rank: 8, avatar: "RD" },
  { id: 9, name: "Morgan White", score: 68, tests: 5, rank: 9, avatar: "MW" },
  { id: 10, name: "Jamie Garcia", score: 65, tests: 3, rank: 10, avatar: "JG" },
]

export function LeaderboardTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Avg. Score</TableHead>
            <TableHead className="text-right">Tests Taken</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.rank === 1 && <Badge className="bg-yellow-500">🏆 {user.rank}</Badge>}
                {user.rank === 2 && (
                  <Badge variant="outline" className="border-gray-400 text-gray-400">
                    🥈 {user.rank}
                  </Badge>
                )}
                {user.rank === 3 && (
                  <Badge variant="outline" className="border-amber-700 text-amber-700">
                    🥉 {user.rank}
                  </Badge>
                )}
                {user.rank > 3 && <span className="text-muted-foreground">{user.rank}</span>}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?text=${user.avatar}`} alt={user.name} />
                    <AvatarFallback>{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>{user.name}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">{user.score}%</TableCell>
              <TableCell className="text-right">{user.tests}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
