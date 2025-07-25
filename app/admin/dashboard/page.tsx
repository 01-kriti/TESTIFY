"use client"

import { CardDescription } from "@/components/ui/card"

import type * as React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  Trophy,
  Clock,
  FileText,
  Calendar,
  Play,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Star,
  Target,
  Award,
  BarChart3,
  Bell,
  Download,
  Share2,
  Eye,
  ChevronRight,
  Zap,
  Brain,
  Timer,
  PieChart,
  Medal,
} from "lucide-react"
import { TestCard } from "@/components/test-card"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { useToast } from "@/hooks/use-toast"

interface UserData {
  id: number
  name: string
  email: string
  domain?: string
}

// Enhanced mock data for available tests
const availableTests = [
  {
    id: 1,
    name: "JavaScript Fundamentals",
    questions: 20,
    time: 30,
    difficulty: "Easy",
    description: "Test your basic JavaScript knowledge including variables, functions, and data types.",
    category: "Programming",
    rating: 4.8,
    attempts: 1250,
    tags: ["JavaScript", "Frontend", "Basics"],
    featured: true,
  },
  {
    id: 2,
    name: "React Basics",
    questions: 15,
    time: 25,
    difficulty: "Medium",
    description: "Evaluate your React.js skills including components, hooks, and state management.",
    category: "Frontend",
    rating: 4.6,
    attempts: 890,
    tags: ["React", "Frontend", "Components"],
    featured: false,
  },
  {
    id: 3,
    name: "Node.js Advanced",
    questions: 25,
    time: 40,
    difficulty: "Hard",
    description: "Challenge your Node.js expertise with advanced concepts and best practices.",
    category: "Backend",
    rating: 4.9,
    attempts: 567,
    tags: ["Node.js", "Backend", "Advanced"],
    featured: true,
  },
  {
    id: 4,
    name: "SQL Queries",
    questions: 18,
    time: 35,
    difficulty: "Medium",
    description: "Test your database skills with complex SQL queries and optimization.",
    category: "Database",
    rating: 4.7,
    attempts: 723,
    tags: ["SQL", "Database", "Queries"],
    featured: false,
  },
  {
    id: 5,
    name: "HTML & CSS Basics",
    questions: 20,
    time: 30,
    difficulty: "Easy",
    description: "Fundamental web development skills including HTML structure and CSS styling.",
    category: "Frontend",
    rating: 4.5,
    attempts: 1456,
    tags: ["HTML", "CSS", "Frontend"],
    featured: false,
  },
  {
    id: 6,
    name: "Python Programming",
    questions: 22,
    time: 35,
    difficulty: "Medium",
    description: "Comprehensive Python test covering syntax, data structures, and algorithms.",
    category: "Programming",
    rating: 4.8,
    attempts: 934,
    tags: ["Python", "Programming", "Algorithms"],
    featured: true,
  },
  {
    id: 7,
    name: "Data Structures & Algorithms",
    questions: 30,
    time: 45,
    difficulty: "Hard",
    description: "Advanced DSA concepts including trees, graphs, and dynamic programming.",
    category: "Computer Science",
    rating: 4.9,
    attempts: 445,
    tags: ["DSA", "Algorithms", "Computer Science"],
    featured: false,
  },
  {
    id: 8,
    name: "Machine Learning Basics",
    questions: 25,
    time: 40,
    difficulty: "Medium",
    description: "Introduction to ML concepts, supervised learning, and model evaluation.",
    category: "AI/ML",
    rating: 4.6,
    attempts: 678,
    tags: ["ML", "AI", "Data Science"],
    featured: true,
  },
]

// Enhanced test history with more details
const testHistory = [
  {
    id: 1,
    testName: "JavaScript Fundamentals",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeTaken: "24:30",
    date: "2024-01-15",
    status: "completed",
    rank: 12,
    percentile: 78,
    category: "Programming",
    difficulty: "Easy",
    improvement: "+5%",
  },
  {
    id: 2,
    testName: "React Basics",
    score: 92,
    totalQuestions: 15,
    correctAnswers: 14,
    timeTaken: "18:45",
    date: "2024-01-10",
    status: "completed",
    rank: 5,
    percentile: 95,
    category: "Frontend",
    difficulty: "Medium",
    improvement: "+12%",
  },
  {
    id: 3,
    testName: "HTML & CSS Basics",
    score: 78,
    totalQuestions: 20,
    correctAnswers: 16,
    timeTaken: "28:15",
    date: "2024-01-05",
    status: "completed",
    rank: 23,
    percentile: 65,
    category: "Frontend",
    difficulty: "Easy",
    improvement: "-3%",
  },
  {
    id: 4,
    testName: "SQL Queries",
    score: 88,
    totalQuestions: 18,
    correctAnswers: 16,
    timeTaken: "31:20",
    date: "2024-01-02",
    status: "completed",
    rank: 8,
    percentile: 89,
    category: "Database",
    difficulty: "Medium",
    improvement: "+8%",
  },
]

// Enhanced upcoming tests
const upcomingTests = [
  {
    id: 6,
    name: "Python Programming",
    date: "2024-01-25",
    time: "10:00 AM",
    duration: 45,
    questions: 25,
    difficulty: "Medium",
    category: "Programming",
    registered: true,
    reminder: true,
  },
  {
    id: 7,
    name: "Data Structures",
    date: "2024-01-28",
    time: "2:00 PM",
    duration: 60,
    questions: 30,
    difficulty: "Hard",
    category: "Computer Science",
    registered: false,
    reminder: false,
  },
  {
    id: 8,
    name: "Machine Learning Basics",
    date: "2024-02-01",
    time: "11:00 AM",
    duration: 40,
    questions: 25,
    difficulty: "Medium",
    category: "AI/ML",
    registered: true,
    reminder: false,
  },
]

// Achievement data
const achievements = [
  {
    id: 1,
    title: "First Test Completed",
    description: "Complete your first test",
    icon: "🎯",
    earned: true,
    date: "2024-01-05",
  },
  {
    id: 2,
    title: "High Scorer",
    description: "Score above 90% in any test",
    icon: "🏆",
    earned: true,
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "Speed Demon",
    description: "Complete a test in under 15 minutes",
    icon: "⚡",
    earned: false,
    date: null,
  },
  {
    id: 4,
    title: "Consistent Performer",
    description: "Complete 5 tests in a week",
    icon: "📈",
    earned: false,
    date: null,
  },
  {
    id: 5,
    title: "Category Master: Frontend",
    description: "Score above 85% in 3 Frontend tests",
    icon: "💻",
    earned: false,
    date: null,
  },
  {
    id: 6,
    title: "Top 10 Ranker",
    description: "Achieve a rank in the top 10 on any test",
    icon: "🏅",
    earned: true,
    date: "2024-01-10",
  },
]

export default function Dashboard(): React.JSX.Element {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [router])

  // Filter and sort tests
  const filteredTests = availableTests
    .filter((test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || test.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.attempts - a.attempts
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id - a.id
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 }
          return (
            difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
            difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
          )
        default:
          return 0
      }
    })

  // Handle register/unregister for upcoming tests (mock)
  const handleRegisterToggle = (testId: number) => {
    const testIndex = upcomingTests.findIndex((test) => test.id === testId)
    if (testIndex > -1) {
      upcomingTests[testIndex].registered = !upcomingTests[testIndex].registered
      toast({
        title: upcomingTests[testIndex].registered ? "Registered!" : "Unregistered",
        description: upcomingTests[testIndex].registered
          ? `You are now registered for ${upcomingTests[testIndex].name}.`
          : `You have unregistered from ${upcomingTests[testIndex].name}.`,
      })
      // Force re-render
      setActiveTab("upcoming")
      setActiveTab("upcoming")
    }
  }

  // Handle reminder toggle for upcoming tests (mock)
  const handleReminderToggle = (testId: number) => {
    const testIndex = upcomingTests.findIndex((test) => test.id === testId)
    if (testIndex > -1) {
      upcomingTests[testIndex].reminder = !upcomingTests[testIndex].reminder
      toast({
        title: upcomingTests[testIndex].reminder ? "Reminder Set!" : "Reminder Removed",
        description: upcomingTests[testIndex].reminder
          ? `You will be reminded for ${upcomingTests[testIndex].name}.`
          : `Reminder for ${upcomingTests[testIndex].name} removed.`,
      })
      // Force re-render
      setActiveTab("upcoming")
      setActiveTab("upcoming")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <></>
  }

  // Calculate enhanced user stats
  const totalTests = testHistory.length
  const averageScore =
    totalTests > 0 ? Math.round(testHistory.reduce((sum, test) => sum + test.score, 0) / totalTests) : 0
  const bestRank = totalTests > 0 ? Math.min(...testHistory.map((test) => test.rank)) : 0
  const totalQuestionsAttempted = testHistory.reduce((sum, test) => sum + test.totalQuestions, 0)
  const totalCorrectAnswers = testHistory.reduce((sum, test) => sum + test.correctAnswers, 0)
  const accuracy = totalQuestionsAttempted > 0 ? Math.round((totalCorrectAnswers / totalQuestionsAttempted) * 100) : 0
  const earnedAchievements = achievements.filter((a) => a.earned).length

  // Get categories for filter
  const categories = ["all", ...Array.from(new Set(availableTests.map((test) => test.category)))]

  // Get popular tags for quick access
  const allTags = availableTests.flatMap((test) => test.tags)
  const tagCounts = allTags.reduce((acc: { [key: string]: number }, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {})
  const popularTags = Object.entries(tagCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .map(([tag]) => tag)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text={`Welcome back, ${user.name}!`} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Browse Tests</TabsTrigger>
          <TabsTrigger value="history">My Results</TabsTrigger>
          <TabsTrigger value="upcoming">Scheduled</TabsTrigger>
          <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Enhanced Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Welcome Section with Quick Stats */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 rounded-lg p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
                <p className="text-indigo-100 mb-4">Ready to challenge yourself? You're doing great!</p>
                <div className="flex space-x-6 text-sm">
                  <div>
                    <span className="text-indigo-200">Tests Completed</span>
                    <p className="text-xl font-bold">{totalTests}</p>
                  </div>
                  <div>
                    <span className="text-indigo-200">Average Score</span>
                    <p className="text-xl font-bold">{averageScore}%</p>
                  </div>
                  <div>
                    <span className="text-indigo-200">Best Rank</span>
                    <p className="text-xl font-bold">#{bestRank || "--"}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Zap className="mr-2 h-4 w-4" />
                  Quick Test
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Accuracy</CardTitle>
                <Target className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accuracy}%</div>
                <p className="text-xs text-muted-foreground">
                  {totalCorrectAnswers}/{totalQuestionsAttempted} questions correct
                </p>
                <Progress value={accuracy} className="mt-2 h-2" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <Zap className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 days</div>
                <p className="text-xs text-muted-foreground">Keep it up! 🔥</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                <Award className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {earnedAchievements}/{achievements.length}
                </div>
                <p className="text-xs text-muted-foreground">Badges earned</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                <Timer className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5h</div>
                <p className="text-xs text-muted-foreground">Efficient learning</p>
              </CardContent>
            </Card>
          </div>

          {/* Featured Tests & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Featured Tests */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    Featured Tests
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("tests")}>
                    View All <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableTests
                    .filter((test) => test.featured)
                    .slice(0, 3)
                    .map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{test.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Badge variant="outline" className="text-xs">
                              {test.difficulty}
                            </Badge>
                            <span>•</span>
                            <span>{test.questions} questions</span>
                            <span>•</span>
                            <span>{test.time} min</span>
                          </div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href={`/test/${test.id}`}>
                            <Play className="mr-1 h-3 w-3" />
                            Start
                          </Link>
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Medal className="mr-2 h-5 w-5 text-purple-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {earnedAchievements > 0 ? (
                  <div className="space-y-4">
                    {achievements
                      .filter((a) => a.earned)
                      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
                      .slice(0, 3)
                      .map((achievement) => (
                        <div
                          key={achievement.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{achievement.icon}</span>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-sm text-gray-500">
                                Earned on {achievement.date && new Date(achievement.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Badge variant="success">Earned</Badge>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No achievements earned yet.</p>
                )}
                <div className="pt-4">
                  <Button className="w-full" variant="outline" onClick={() => setActiveTab("achievements")}>
                    <Award className="mr-2 h-4 w-4" />
                    View All Achievements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-16 flex-col" asChild>
                  <Link href="/test/1">
                    <Brain className="h-6 w-6 mb-2" />
                    Take Random Test
                  </Link>
                </Button>
                <Button variant="outline" className="h-16 flex-col" onClick={() => setActiveTab("history")}>
                  <BarChart3 className="h-6 w-6 mb-2" />
                  View Progress
                </Button>
                <Button variant="outline" className="h-16 flex-col" onClick={() => setActiveTab("leaderboard")}>
                  <Trophy className="h-6 w-6 mb-2" />
                  Check Rankings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Available Tests Tab */}
        <TabsContent value="tests" className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Browse Tests</h2>
              <p className="text-gray-600 dark:text-gray-400">Discover and take tests to improve your skills</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Results
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share Progress
              </Button>
            </div>
          </div>

          {/* Enhanced Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {popularTags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Popular Tags:</span>
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Results */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredTests.length} of {availableTests.length} tests
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          {filteredTests.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tests found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedDifficulty("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Enhanced Test History Tab */}
        <TabsContent value="history" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">My Test Results</h2>
              <p className="text-gray-600 dark:text-gray-400">Track your progress and performance over time</p>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{totalTests}</div>
                <p className="text-sm text-gray-600">Tests Completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{averageScore}%</div>
                <p className="text-sm text-gray-600">Average Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">#{bestRank}</div>
                <p className="text-sm text-gray-600">Best Rank</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{accuracy}%</div>
                <p className="text-sm text-gray-600">Accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trends Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your score and rank over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-muted rounded-md text-muted-foreground">
                <PieChart className="h-12 w-12 mr-2" />
                Chart coming soon! (e.g., using Recharts or Chart.js)
              </div>
            </CardContent>
          </Card>

          {testHistory.length > 0 ? (
            <div className="space-y-4">
              {testHistory.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-full ${
                            test.score >= 80
                              ? "bg-green-100 text-green-600"
                              : test.score >= 60
                                ? "bg-blue-100 text-blue-600"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {test.score >= 80 ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : test.score >= 60 ? (
                            <Clock className="h-6 w-6" />
                          ) : (
                            <XCircle className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{test.testName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Completed on {new Date(test.date).toLocaleDateString()}</span>
                            <Badge variant="outline">{test.category}</Badge>
                            <Badge variant="outline">{test.difficulty}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="grid grid-cols-4 gap-6 text-center">
                          <div>
                            <p className="text-sm text-gray-500">Score</p>
                            <p className="font-semibold text-lg">{test.score}%</p>
                            <span
                              className={`text-xs ${test.improvement.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                            >
                              {test.improvement}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Rank</p>
                            <p className="font-semibold text-lg">#{test.rank}</p>
                            <p className="text-xs text-gray-500">{test.percentile}th percentile</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-semibold text-lg">{test.timeTaken}</p>
                            <p className="text-xs text-gray-500">
                              {test.correctAnswers}/{test.totalQuestions} correct
                            </p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/results/${test.id}`}>
                                <Eye className="mr-1 h-3 w-3" />
                                Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Performance</span>
                        <span>{test.score}%</span>
                      </div>
                      <Progress value={test.score} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No test history</h3>
                <p className="text-gray-500 mb-4">You haven't completed any tests yet.</p>
                <Button onClick={() => setActiveTab("tests")}>Browse Available Tests</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Enhanced Upcoming Tests Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Scheduled Tests</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage your upcoming test schedule</p>
          </div>

          <div className="space-y-4">
            {upcomingTests.map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{test.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            {new Date(test.date).toLocaleDateString()} at {test.time}
                          </span>
                          <Badge variant="outline">{test.category}</Badge>
                          <Badge variant="outline">{test.difficulty}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-semibold">{test.duration} min</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Questions</p>
                          <p className="font-semibold">{test.questions}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant={test.registered ? "default" : "outline"}
                            onClick={() => handleRegisterToggle(test.id)}
                          >
                            {test.registered ? "Registered" : "Register"}
                          </Button>
                          <Button
                            size="sm"
                            variant={test.reminder ? "default" : "outline"}
                            onClick={() => handleReminderToggle(test.id)}
                          >
                            <Bell className="mr-1 h-3 w-3" />
                            {test.reminder ? "Reminder Set" : "Set Reminder"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {upcomingTests.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No upcoming tests</h3>
                <p className="text-gray-500 mb-4">Check back later for scheduled tests or browse available tests.</p>
                <Button onClick={() => setActiveTab("tests")}>Browse Tests</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Enhanced Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Global Rankings</h2>
            <p className="text-gray-600 dark:text-gray-400">See how you rank against other users worldwide</p>
          </div>

          <LeaderboardTable />
        </TabsContent>

        {/* New Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Achievements & Badges</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your learning milestones and accomplishments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`hover:shadow-lg transition-shadow ${
                  achievement.earned ? "border-green-200 bg-green-50 dark:bg-green-900/10" : "opacity-60"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                  {achievement.earned ? (
                    <div>
                      <Badge variant="success" className="mb-2">
                        Earned
                      </Badge>
                      <p className="text-xs text-gray-500">
                        Completed on {achievement.date && new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <Badge variant="outline">Not Earned</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span>Overall Progress</span>
                <span>
                  {earnedAchievements}/{achievements.length} completed
                </span>
              </div>
              <Progress value={(earnedAchievements / achievements.length) * 100} className="h-3" />
              <p className="text-sm text-gray-500 mt-2">Keep taking tests to unlock more achievements!</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
