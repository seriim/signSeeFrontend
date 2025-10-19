import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, CheckCircle2, Lock, Star, Trophy, Target, BookOpen } from "lucide-react"

// Mock data for lessons within a module
const moduleLessons = {
  1: {
    title: "JSL Basics",
    description: "Learn the fundamentals of Jamaican Sign Language",
    lessons: [
      {
        id: 1,
        title: "Introduction to JSL",
        description: "Understanding the basics and history of JSL",
        duration: "5 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 2,
        title: "Hand Shapes & Positions",
        description: "Learn the fundamental hand shapes",
        duration: "8 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 3,
        title: "Basic Greetings",
        description: "Hello, goodbye, and common greetings",
        duration: "10 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 4,
        title: "Yes, No, Please, Thank You",
        description: "Essential polite expressions",
        duration: "7 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 5,
        title: "Asking Questions",
        description: "Who, what, where, when, why, how",
        duration: "12 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 6,
        title: "Personal Pronouns",
        description: "I, you, he, she, we, they",
        duration: "8 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 7,
        title: "Time & Days",
        description: "Telling time and days of the week",
        duration: "10 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 8,
        title: "Module Quiz",
        description: "Test your knowledge of JSL basics",
        duration: "15 min",
        points: 100,
        completed: true,
        unlocked: true,
        isQuiz: true,
      },
    ],
  },
  2: {
    title: "Alphabet & Numbers",
    description: "Master the JSL alphabet and number signs",
    lessons: [
      {
        id: 1,
        title: "Letters A-F",
        description: "Learn the first six letters of the JSL alphabet",
        duration: "10 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 2,
        title: "Letters G-L",
        description: "Continue with letters G through L",
        duration: "10 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 3,
        title: "Letters M-R",
        description: "Master letters M through R",
        duration: "10 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 4,
        title: "Letters S-Z",
        description: "Complete the alphabet with S through Z",
        duration: "10 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 5,
        title: "Fingerspelling Practice",
        description: "Practice spelling words with the alphabet",
        duration: "15 min",
        points: 75,
        completed: true,
        unlocked: true,
      },
      {
        id: 6,
        title: "Numbers 0-10",
        description: "Learn to sign numbers zero through ten",
        duration: "8 min",
        points: 50,
        completed: true,
        unlocked: true,
      },
      {
        id: 7,
        title: "Numbers 11-100",
        description: "Master larger numbers and counting",
        duration: "12 min",
        points: 50,
        completed: false,
        unlocked: true,
      },
      {
        id: 8,
        title: "Ordinal Numbers",
        description: "First, second, third, and more",
        duration: "8 min",
        points: 50,
        completed: false,
        unlocked: true,
      },
      {
        id: 9,
        title: "Practice Session",
        description: "Interactive practice with alphabet and numbers",
        duration: "20 min",
        points: 100,
        completed: false,
        unlocked: true,
      },
      {
        id: 10,
        title: "Module Quiz",
        description: "Test your alphabet and number knowledge",
        duration: "15 min",
        points: 100,
        completed: false,
        unlocked: false,
        isQuiz: true,
      },
    ],
  },
}

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const moduleId = Number.parseInt(id)
  const module = moduleLessons[moduleId as keyof typeof moduleLessons]

  if (!module) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Module Not Found</h2>
          <Link href="/learn">
            <Button>Back to Learning Path</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const completedLessons = module.lessons.filter((l) => l.completed).length
  const totalLessons = module.lessons.length
  const progressPercentage = (completedLessons / totalLessons) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/learn" className="flex items-center gap-2 text-xl font-bold">
            <ArrowLeft className="h-5 w-5" />
            Back to Learning Path
          </Link>
          <Link href="/">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Target className="h-6 w-6 text-primary" />
              SignSee
            </div>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-8">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{module.title}</h1>
              <p className="text-lg text-muted-foreground">{module.description}</p>
            </div>
            <Badge variant="default" className="text-lg">
              <Star className="mr-1 h-4 w-4" />
              {module.lessons.reduce((sum, lesson) => sum + lesson.points, 0)} XP
            </Badge>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Module Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedLessons} / {totalLessons} lessons completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </Card>

        {/* Lessons List */}
        <div className="mb-6">
          <h2 className="mb-4 text-2xl font-bold">Lessons</h2>
        </div>

        <div className="grid gap-4">
          {module.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={`group border-2 p-6 transition-all ${
                lesson.unlocked ? "hover:border-primary hover:shadow-lg" : "cursor-not-allowed opacity-60"
              }`}
            >
              <div className="flex items-center gap-6">
                {/* Lesson Number */}
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                    lesson.completed
                      ? "bg-success text-success-foreground"
                      : lesson.unlocked
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {lesson.completed ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : lesson.unlocked ? (
                    index + 1
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{lesson.title}</h3>
                    {lesson.isQuiz && (
                      <Badge variant="secondary">
                        <Trophy className="mr-1 h-3 w-3" />
                        Quiz
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{lesson.duration}</span>
                    <span>•</span>
                    <span className="font-semibold text-primary">{lesson.points} XP</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  {lesson.unlocked ? (
                    <Link href={`/learn/lesson/${moduleId}-${lesson.id}`}>
                      <Button size="lg" variant={lesson.completed ? "outline" : "default"}>
                        {lesson.completed ? (
                          <>
                            <BookOpen className="mr-2 h-5 w-5" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-5 w-5" />
                            {lesson.isQuiz ? "Take Quiz" : "Start Lesson"}
                          </>
                        )}
                      </Button>
                    </Link>
                  ) : (
                    <Button size="lg" disabled>
                      <Lock className="mr-2 h-5 w-5" />
                      Locked
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
