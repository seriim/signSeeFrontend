import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LevelMap } from "@/components/level-map"
import { BookOpen, Lock, CheckCircle2, Star, Trophy, Flame, Target, ArrowRight, Sparkles } from "lucide-react"

// Mock data for learning modules with positions for level map
const modules = [
  {
    id: 1,
    title: "JSL Basics",
    description: "Learn the fundamentals of Jamaican Sign Language",
    lessons: 8,
    completedLessons: 8,
    points: 400,
    status: "completed",
    difficulty: "Beginner",
    unlocked: true,
    position: { x: 100, y: 200 },
  },
  {
    id: 2,
    title: "Alphabet & Numbers",
    description: "Master the JSL alphabet and number signs",
    lessons: 10,
    completedLessons: 6,
    points: 300,
    status: "in-progress",
    difficulty: "Beginner",
    unlocked: true,
    position: { x: 300, y: 160 },
  },
  {
    id: 3,
    title: "Common Phrases",
    description: "Essential everyday phrases and greetings",
    lessons: 12,
    completedLessons: 0,
    points: 0,
    status: "locked",
    difficulty: "Intermediate",
    unlocked: false,
    position: { x: 500, y: 200 },
  },
  {
    id: 4,
    title: "Family & Relationships",
    description: "Signs for family members and relationships",
    lessons: 10,
    completedLessons: 0,
    points: 0,
    status: "locked",
    difficulty: "Intermediate",
    unlocked: false,
    position: { x: 600, y: 260 },
  },
  {
    id: 5,
    title: "Food & Dining",
    description: "Learn signs related to food and dining",
    lessons: 15,
    completedLessons: 0,
    points: 0,
    status: "locked",
    difficulty: "Intermediate",
    unlocked: false,
    position: { x: 700, y: 200 },
  },
  {
    id: 6,
    title: "Emotions & Feelings",
    description: "Express emotions and feelings in JSL",
    lessons: 12,
    completedLessons: 0,
    points: 0,
    status: "locked",
    difficulty: "Advanced",
    unlocked: false,
    position: { x: 400, y: 320 },
  },
]

const userStats = {
  totalPoints: 700,
  currentStreak: 7,
  level: 3,
  nextLevelPoints: 1000,
  badges: 5,
}

export default function LearnPage() {
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
            <Link href="/translator">
              <Button variant="ghost" className="rounded-full hover:bg-primary/10">Translator</Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10">Profile</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Dashboard */}
        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Total Points</p>
                <p className="text-2xl font-bold text-primary">{userStats.totalPoints}</p>
              </div>
              <Star className="h-7 w-7 text-primary" />
            </div>
          </Card>

          <Card className="border-2 border-accent bg-gradient-to-b from-accent/15 to-accent/5 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Current Streak</p>
                <p className="text-2xl font-bold text-accent">{userStats.currentStreak} days</p>
              </div>
              <Flame className="h-7 w-7 text-accent" />
            </div>
          </Card>

          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Level</p>
                <p className="text-2xl font-bold text-primary">{userStats.level}</p>
              </div>
              <Trophy className="h-7 w-7 text-primary" />
            </div>
          </Card>

          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Badges Earned</p>
                <p className="text-2xl font-bold text-primary">{userStats.badges}</p>
              </div>
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-6 p-4 border-2 border-primary/40 bg-white/50 rounded-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Level {userStats.level} Progress</h3>
            <span className="text-sm text-muted-foreground">
              {userStats.totalPoints} / {userStats.nextLevelPoints} XP
            </span>
          </div>
          <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="h-3 rounded-full" />
          <p className="mt-2 text-sm text-muted-foreground">
            {userStats.nextLevelPoints - userStats.totalPoints} XP until Level {userStats.level + 1}
          </p>
        </Card>

        {/* Level Map */}
        <LevelMap modules={modules} userStats={userStats} />
      </div>
    </div>
  )
}
