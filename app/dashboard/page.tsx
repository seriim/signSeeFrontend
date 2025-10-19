"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  Trophy,
  Flame,
  Star,
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react"

const userStats = {
  name: "Alex Johnson",
  level: 5,
  xp: 1250,
  xpToNextLevel: 1500,
  streak: 7,
  totalLessons: 24,
  completedLessons: 18,
  totalQuizzes: 12,
  completedQuizzes: 8,
  averageScore: 85,
  totalPracticeTime: 180, // minutes
  signsLearned: 45,
}

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first lesson",
    icon: BookOpen,
    unlocked: true,
    unlockedDate: "2025-01-10",
    xpReward: 50,
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: Flame,
    unlocked: true,
    unlockedDate: "2025-01-15",
    xpReward: 100,
  },
  {
    id: 3,
    title: "Quiz Master",
    description: "Score 100% on any quiz",
    icon: Trophy,
    unlocked: true,
    unlockedDate: "2025-01-12",
    xpReward: 150,
  },
  {
    id: 4,
    title: "Sign Collector",
    description: "Learn 50 different signs",
    icon: Star,
    unlocked: false,
    progress: 45,
    total: 50,
    xpReward: 200,
  },
  {
    id: 5,
    title: "Perfect Practice",
    description: "Complete 10 practice sessions",
    icon: Target,
    unlocked: false,
    progress: 6,
    total: 10,
    xpReward: 150,
  },
  {
    id: 6,
    title: "Module Champion",
    description: "Complete all lessons in a module",
    icon: Award,
    unlocked: true,
    unlockedDate: "2025-01-14",
    xpReward: 250,
  },
]

const recentActivity = [
  { date: "2025-01-18", activity: "Completed Lesson: Basic Greetings", xp: 50 },
  { date: "2025-01-18", activity: "Quiz Score: 90% on Polite Expressions", xp: 90 },
  { date: "2025-01-17", activity: "Practice Session: 15 minutes", xp: 30 },
  { date: "2025-01-17", activity: "Unlocked Achievement: Week Warrior", xp: 100 },
  { date: "2025-01-16", activity: "Completed Lesson: Thank You & Please", xp: 50 },
]

const weeklyProgress = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 30 },
  { day: "Wed", minutes: 20 },
  { day: "Thu", minutes: 35 },
  { day: "Fri", minutes: 28 },
  { day: "Sat", minutes: 22 },
  { day: "Sun", minutes: 20 },
]

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const levelProgress = (userStats.xp / userStats.xpToNextLevel) * 100
  const lessonsProgress = (userStats.completedLessons / userStats.totalLessons) * 100
  const quizzesProgress = (userStats.completedQuizzes / userStats.totalQuizzes) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-6 w-6 text-primary" />
            SignSee
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/learn">
              <Button variant="ghost">Learn</Button>
            </Link>
            <Link href="/practice">
              <Button variant="ghost">Practice</Button>
            </Link>
            <Link href="/translator">
              <Button variant="ghost">Translate</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Welcome back, {userStats.name}!</h1>
          <p className="text-lg text-muted-foreground">Track your progress and celebrate your achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <Zap className="h-8 w-8 text-primary" />
              <Badge variant="secondary">Level {userStats.level}</Badge>
            </div>
            <p className="mb-1 text-3xl font-bold">{userStats.xp} XP</p>
            <p className="mb-3 text-sm text-muted-foreground">{userStats.xpToNextLevel - userStats.xp} to next level</p>
            <Progress value={levelProgress} className="h-2" />
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <Flame className="h-8 w-8 text-accent" />
              <Badge className="bg-accent/20 text-accent">Active</Badge>
            </div>
            <p className="mb-1 text-3xl font-bold">{userStats.streak} Days</p>
            <p className="text-sm text-muted-foreground">Current streak</p>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <BookOpen className="h-8 w-8 text-secondary" />
              <Badge className="bg-secondary/20 text-secondary">Learning</Badge>
            </div>
            <p className="mb-1 text-3xl font-bold">{userStats.signsLearned}</p>
            <p className="text-sm text-muted-foreground">Signs learned</p>
          </Card>

          <Card className="border-2 p-6">
            <div className="mb-2 flex items-center justify-between">
              <Trophy className="h-8 w-8 text-primary" />
              <Badge variant="outline">{userStats.averageScore}%</Badge>
            </div>
            <p className="mb-1 text-3xl font-bold">{userStats.completedQuizzes}</p>
            <p className="text-sm text-muted-foreground">Quizzes completed</p>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Learning Progress */}
              <Card className="border-2 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Learning Progress
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Lessons Completed</span>
                      <span className="text-muted-foreground">
                        {userStats.completedLessons}/{userStats.totalLessons}
                      </span>
                    </div>
                    <Progress value={lessonsProgress} className="h-3" />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Quizzes Completed</span>
                      <span className="text-muted-foreground">
                        {userStats.completedQuizzes}/{userStats.totalQuizzes}
                      </span>
                    </div>
                    <Progress value={quizzesProgress} className="h-3" />
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Practice Time</p>
                        <p className="text-2xl font-bold">{userStats.totalPracticeTime} min</p>
                      </div>
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Weekly Activity */}
              <Card className="border-2 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekly Activity
                </h3>

                <div className="space-y-3">
                  {weeklyProgress.map((day, index) => {
                    const maxMinutes = Math.max(...weeklyProgress.map((d) => d.minutes))
                    const barWidth = (day.minutes / maxMinutes) * 100

                    return (
                      <div key={index}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium">{day.day}</span>
                          <span className="text-muted-foreground">{day.minutes} min</span>
                        </div>
                        <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-4 rounded-lg border bg-accent/10 p-3 text-center">
                  <p className="text-sm font-medium text-accent">
                    Great job! You practiced {weeklyProgress.reduce((sum, day) => sum + day.minutes, 0)} minutes this
                    week
                  </p>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-2 p-6">
              <h3 className="mb-4 text-xl font-bold">Continue Learning</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <Link href="/learn">
                  <Button variant="outline" className="h-auto w-full flex-col gap-2 bg-transparent py-6">
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span className="font-semibold">Resume Lessons</span>
                    <span className="text-xs text-muted-foreground">6 lessons remaining</span>
                  </Button>
                </Link>
                <Link href="/practice">
                  <Button variant="outline" className="h-auto w-full flex-col gap-2 bg-transparent py-6">
                    <Target className="h-8 w-8 text-accent" />
                    <span className="font-semibold">Practice Signs</span>
                    <span className="text-xs text-muted-foreground">Improve your skills</span>
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" className="h-auto w-full flex-col gap-2 bg-transparent py-6">
                    <Trophy className="h-8 w-8 text-secondary" />
                    <span className="font-semibold">Take Quiz</span>
                    <span className="text-xs text-muted-foreground">Test your knowledge</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="border-2 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Your Achievements</h3>
                <Badge variant="secondary">
                  {achievements.filter((a) => a.unlocked).length}/{achievements.length} Unlocked
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card
                      key={achievement.id}
                      className={`border-2 p-6 ${
                        achievement.unlocked
                          ? "border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5"
                          : "border-dashed opacity-60"
                      }`}
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                            achievement.unlocked ? "bg-accent/20" : "bg-muted"
                          }`}
                        >
                          {achievement.unlocked ? (
                            <Icon className="h-6 w-6 text-accent" />
                          ) : (
                            <Lock className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                          +{achievement.xpReward} XP
                        </Badge>
                      </div>

                      <h4 className="mb-1 font-bold">{achievement.title}</h4>
                      <p className="mb-3 text-sm text-muted-foreground">{achievement.description}</p>

                      {achievement.unlocked ? (
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Unlocked {achievement.unlockedDate}</span>
                        </div>
                      ) : achievement.progress !== undefined && achievement.total !== undefined ? (
                        <div>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Keep learning to unlock!</p>
                      )}
                    </Card>
                  )
                })}
              </div>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-2 p-6">
              <h3 className="mb-6 text-xl font-bold">Recent Activity</h3>

              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 font-medium">{item.activity}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge variant="secondary">+{item.xp} XP</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="bg-transparent">
                  Load More Activity
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
