export interface Lesson {
  id: string
  title: string
  description: string
  category: "basics" | "alphabet" | "numbers" | "phrases" | "conversation"
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // in minutes
  signs: Sign[]
  completed: boolean
  locked: boolean
  xpReward: number
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
