"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useProgress } from "@/hooks/use-progress"
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
  RotateCcw,
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
  const { progress, isLoaded, resetProgress } = useProgress()

  // Show loading state while progress is being loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    )
  }

  // Update userStats with real progress data
  const realUserStats = {
    ...userStats,
    level: progress.level,
    xp: progress.totalXP,
    streak: progress.currentStreak,
    completedLessons: progress.modules.reduce((sum, module) => sum + module.completedLessons, 0),
    badges: progress.badges,
  }

  const levelProgress = (realUserStats.xp / realUserStats.xpToNextLevel) * 100
  const lessonsProgress = (realUserStats.completedLessons / realUserStats.totalLessons) * 100
  const quizzesProgress = (realUserStats.completedQuizzes / realUserStats.totalQuizzes) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
      {/* Header */}
      <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105">
            <Target className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignSee</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/learn">
              <Button variant="ghost" className="rounded-full hover:bg-primary/10">Learn</Button>
            </Link>
            <Link href="/translator">
              <Button variant="ghost" className="rounded-full hover:bg-primary/10">Translate</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-1 text-3xl font-bold">Welcome back, {realUserStats.name}!</h1>
            <p className="text-sm text-muted-foreground">Track your progress and celebrate your achievements</p>
          </div>
          <Button
            onClick={() => {
              resetProgress()
              window.location.reload()
            }}
            variant="outline"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset Progress
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="mb-1 flex items-center justify-between">
              <Zap className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="rounded-full text-xs">Level {realUserStats.level}</Badge>
            </div>
            <p className="mb-1 text-2xl font-bold">{realUserStats.xp} XP</p>
            <p className="mb-2 text-xs text-muted-foreground">{realUserStats.xpToNextLevel - realUserStats.xp} to next level</p>
            <Progress value={levelProgress} className="h-2 rounded-full" />
          </Card>

          <Card className="border-2 border-accent bg-gradient-to-b from-accent/15 to-accent/5 p-4 rounded-2xl">
            <div className="mb-1 flex items-center justify-between">
              <Flame className="h-6 w-6 text-accent" />
              <Badge className="bg-accent/20 text-accent rounded-full text-xs">Active</Badge>
            </div>
            <p className="mb-1 text-2xl font-bold">{realUserStats.streak} Days</p>
            <p className="text-xs text-muted-foreground">Current streak</p>
          </Card>

          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="mb-1 flex items-center justify-between">
              <BookOpen className="h-6 w-6 text-primary" />
              <Badge className="bg-primary/20 text-primary rounded-full text-xs">Learning</Badge>
            </div>
            <p className="mb-1 text-2xl font-bold">{realUserStats.signsLearned}</p>
            <p className="text-xs text-muted-foreground">Signs learned</p>
          </Card>

          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="mb-1 flex items-center justify-between">
              <Trophy className="h-6 w-6 text-primary" />
              <Badge variant="outline" className="rounded-full text-xs">{realUserStats.averageScore}%</Badge>
            </div>
            <p className="mb-1 text-2xl font-bold">{realUserStats.completedQuizzes}</p>
            <p className="text-xs text-muted-foreground">Quizzes completed</p>
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
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Learning Progress */}
              <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Learning Progress
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Lessons Completed</span>
                      <span className="text-muted-foreground">
                        {realUserStats.completedLessons}/{realUserStats.totalLessons}
                      </span>
                    </div>
                    <Progress value={lessonsProgress} className="h-3" />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Quizzes Completed</span>
                      <span className="text-muted-foreground">
                        {realUserStats.completedQuizzes}/{realUserStats.totalQuizzes}
                      </span>
                    </div>
                    <Progress value={quizzesProgress} className="h-3" />
                  </div>

                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Practice Time</p>
                        <p className="text-2xl font-bold">{realUserStats.totalPracticeTime} min</p>
                      </div>
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Weekly Activity */}
              <Card className="border-2 border-accent bg-gradient-to-b from-accent/15 to-accent/5 p-4 rounded-2xl">
                <h3 className="mb-3 flex items-center gap-2 text-base font-bold">
                  <Calendar className="h-4 w-4 text-primary" />
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
            <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
              <h3 className="mb-3 text-base font-bold">Continue Learning</h3>
              <div className="grid gap-3 md:grid-cols-3">
                <Link href="/learn">
                  <Button variant="outline" className="h-auto w-full flex-col gap-1 bg-primary/15 border-2 border-primary rounded-2xl py-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold">Resume Lessons</span>
                    <span className="text-xs text-muted-foreground">6 lessons remaining</span>
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" className="h-auto w-full flex-col gap-1 bg-primary/15 border-2 border-primary rounded-2xl py-3">
                    <Trophy className="h-6 w-6 text-primary" />
                    <span className="text-sm font-semibold">Take Quiz</span>
                    <span className="text-xs text-muted-foreground">Test your knowledge</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold">Your Achievements</h3>
                <Badge variant="secondary" className="rounded-full text-xs">
                  {achievements.filter((a) => a.unlocked).length}/{achievements.length} Unlocked
                </Badge>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <Card
                      key={achievement.id}
                      className={`border-2 p-3 rounded-2xl ${
                        achievement.unlocked
                          ? "border-accent bg-gradient-to-b from-accent/15 to-accent/5"
                          : "border-dashed opacity-60 rounded-2xl"
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
          <TabsContent value="activity" className="space-y-4">
            <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
              <h3 className="mb-4 text-base font-bold">Recent Activity</h3>

              <div className="space-y-2">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-2xl border-2 border-primary bg-primary/10 p-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/30">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-0.5 text-sm font-medium">{item.activity}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <Badge variant="secondary" className="rounded-full text-xs">+{item.xp} XP</Badge>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Button variant="outline" className="bg-primary/15 border-2 border-primary rounded-full text-sm">
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
