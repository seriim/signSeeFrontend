import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Lock, CheckCircle2, Star, Trophy, Flame, Target, ArrowRight, Sparkles } from "lucide-react"

// Mock data for learning modules
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-6 w-6 text-primary" />
            SignSee
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/translator">
              <Button variant="ghost">Translator</Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline">Profile</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Dashboard */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-3xl font-bold text-primary">{userStats.totalPoints}</p>
              </div>
              <Star className="h-10 w-10 text-primary" />
            </div>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-3xl font-bold text-accent">{userStats.currentStreak} days</p>
              </div>
              <Flame className="h-10 w-10 text-accent" />
            </div>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/10 to-secondary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Level</p>
                <p className="text-3xl font-bold text-secondary">{userStats.level}</p>
              </div>
              <Trophy className="h-10 w-10 text-secondary" />
            </div>
          </Card>

          <Card className="border-2 border-success/20 bg-gradient-to-br from-success/10 to-success/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-3xl font-bold text-success">{userStats.badges}</p>
              </div>
              <Sparkles className="h-10 w-10 text-success" />
            </div>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Level {userStats.level} Progress</h3>
            <span className="text-sm text-muted-foreground">
              {userStats.totalPoints} / {userStats.nextLevelPoints} XP
            </span>
          </div>
          <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="h-3" />
          <p className="mt-2 text-sm text-muted-foreground">
            {userStats.nextLevelPoints - userStats.totalPoints} XP until Level {userStats.level + 1}
          </p>
        </Card>

        {/* Learning Modules */}
        <div className="mb-6">
          <h2 className="mb-2 text-3xl font-bold">Learning Path</h2>
          <p className="text-muted-foreground">Progress through modules to master Jamaican Sign Language</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card
              key={module.id}
              className={`group relative overflow-hidden border-2 p-6 transition-all ${
                module.unlocked ? "hover:border-primary hover:shadow-lg" : "cursor-not-allowed opacity-60"
              }`}
            >
              {/* Status Badge */}
              <div className="mb-4 flex items-center justify-between">
                <Badge
                  variant={
                    module.difficulty === "Beginner"
                      ? "default"
                      : module.difficulty === "Intermediate"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {module.difficulty}
                </Badge>
                {module.status === "completed" && <CheckCircle2 className="h-6 w-6 text-success" />}
                {module.status === "in-progress" && <div className="h-3 w-3 animate-pulse rounded-full bg-accent" />}
                {module.status === "locked" && <Lock className="h-5 w-5 text-muted-foreground" />}
              </div>

              {/* Module Info */}
              <h3 className="mb-2 text-xl font-bold">{module.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{module.description}</p>

              {/* Progress */}
              {module.unlocked && (
                <>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {module.completedLessons} / {module.lessons} lessons
                    </span>
                    <span className="font-semibold text-primary">{module.points} XP</span>
                  </div>
                  <Progress value={(module.completedLessons / module.lessons) * 100} className="mb-4 h-2" />
                </>
              )}

              {/* Action Button */}
              {module.unlocked ? (
                <Link href={`/learn/module/${module.id}`}>
                  <Button className="w-full" variant={module.status === "completed" ? "outline" : "default"}>
                    {module.status === "completed" ? (
                      <>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Review
                      </>
                    ) : module.status === "in-progress" ? (
                      <>
                        Continue Learning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Start Module
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </Link>
              ) : (
                <Button className="w-full" disabled>
                  <Lock className="mr-2 h-4 w-4" />
                  Complete previous modules
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
