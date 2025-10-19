export interface Module {
  id: number
  name: string
  description: string
  lessons: number
  completedLessons: number
  points: number
  status: "completed" | "in-progress" | "locked"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  unlocked: boolean
  position: { x: number; y: number }
}

export interface Lesson {
  id: string
  name: string // matches database 'name' field
  description: string
  moduleId: number // matches database 'moduleId' field
  order: number // matches database 'order' field
  category: "basics" | "alphabet" | "numbers" | "phrases" | "conversation" | "emotions" | "commands" | "advanced"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  signs: Sign[]
  completed: boolean
  locked: boolean
  xpReward: number
  content?: LessonContent[]
}

export interface Question {
  id: number
  lessonId: number
  type: string | null
  text: string | null
  media: string | null
  gesture: string | null // UUID
}

export interface LessonContent {
  id: string
  type: "instruction" | "quiz"
  title: string
  description?: string
  videoUrl?: string
  thumbnailUrl?: string
  tip?: string
  instruction?: string
  options?: string[]
  correctAnswer?: number
}

export interface Sign {
  id: string
  word: string
  category: string
  videoUrl: string
  thumbnailUrl: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
}

export interface UserProgress {
  userId: string
  level: number
  xp: number
  xpToNextLevel: number
  streak: number
  lastActiveDate: string
  completedLessons: string[]
  badges: Badge[]
  stats: {
    totalSignsLearned: number
    totalPracticeTime: number
    quizzesPassed: number
    perfectScores: number
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export interface Quiz {
  id: string
  lessonId: string
  questions: QuizQuestion[]
  passingScore: number
}

export interface QuizQuestion {
  id: string
  type: "multiple-choice" | "gesture-recognition" | "video-match"
  question: string
  options?: string[]
  correctAnswer: string
  signVideoUrl?: string
  points: number
}

export interface GestureRecognitionResult {
  detected: boolean
  confidence: number
  gesture: string
  landmarks: number[][]
}
