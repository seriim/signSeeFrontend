import { useState, useEffect } from 'react'
import { lessonsApi, signsApi, userProgressApi, gestureRecognitionApi, questionsApi } from '@/lib/api'
import type { Lesson, Sign, UserProgress, GestureRecognitionResult, Question } from '@/lib/types'

// Custom hook for lessons
export const useLessons = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLessons = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await lessonsApi.getAll()
      setLessons(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lessons')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLessons()
  }, [])

  return { lessons, loading, error, refetch: fetchLessons }
}

// Custom hook for lessons by module
export const useLessonsByModule = (moduleId: number) => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLessons = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await lessonsApi.getByModule(moduleId)
      setLessons(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lessons')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (moduleId) {
      fetchLessons()
    }
  }, [moduleId])

  return { lessons, loading, error, refetch: fetchLessons }
}

// Custom hook for single lesson
export const useLesson = (id: string) => {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLesson = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await lessonsApi.getById(id)
      setLesson(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch lesson')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchLesson()
    }
  }, [id])

  return { lesson, loading, error, refetch: fetchLesson }
}

// Custom hook for signs
export const useSigns = () => {
  const [signs, setSigns] = useState<Sign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSigns = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await signsApi.getAll()
      setSigns(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch signs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSigns()
  }, [])

  return { signs, loading, error, refetch: fetchSigns }
}

// Custom hook for signs by category
export const useSignsByCategory = (category: string) => {
  const [signs, setSigns] = useState<Sign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSigns = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await signsApi.getByCategory(category)
      setSigns(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch signs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (category) {
      fetchSigns()
    }
  }, [category])

  return { signs, loading, error, refetch: fetchSigns }
}

// Custom hook for user progress
export const useUserProgress = (userId: string) => {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProgress = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await userProgressApi.get(userId)
      setProgress(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user progress')
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (newProgress: Partial<UserProgress>) => {
    try {
      await userProgressApi.upsert(newProgress)
      await fetchProgress()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress')
    }
  }

  const markLessonCompleted = async (lessonId: string) => {
    try {
      await lessonsApi.markCompleted(lessonId, userId)
      await fetchProgress()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark lesson as completed')
    }
  }

  const updateStreak = async () => {
    try {
      await userProgressApi.updateStreak(userId)
      await fetchProgress()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update streak')
    }
  }

  useEffect(() => {
    if (userId) {
      fetchProgress()
    }
  }, [userId])

  return { 
    progress, 
    loading, 
    error, 
    refetch: fetchProgress,
    updateProgress,
    markLessonCompleted,
    updateStreak
  }
}

// Custom hook for gesture recognition
export const useGestureRecognition = (userId?: string) => {
  const [history, setHistory] = useState<GestureRecognitionResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const effectiveUserId = userId || 'guest'

  const saveResult = async (result: GestureRecognitionResult) => {
    try {
      setLoading(true)
      setError(null)
      await gestureRecognitionApi.saveResult(effectiveUserId, result)
      await fetchHistory()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save gesture result')
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async (limit: number = 50) => {
    try {
      setLoading(true)
      setError(null)
      const data = await gestureRecognitionApi.getHistory(effectiveUserId, limit)
      setHistory(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gesture history')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (effectiveUserId) {
      fetchHistory()
    }
  }, [effectiveUserId])

  return { 
    history, 
    loading, 
    error, 
    saveResult,
    refetch: fetchHistory
  }
}

// Custom hook for questions
export const useQuestions = (lessonId: number) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await questionsApi.getByLesson(lessonId)
      setQuestions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (lessonId) {
      fetchQuestions()
    }
  }, [lessonId])

  return { 
    questions, 
    loading, 
    error, 
    refetch: fetchQuestions
  }
}

// Custom hook for a single question
export const useQuestion = (questionId: number) => {
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestion = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await questionsApi.getById(questionId)
      setQuestion(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch question')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (questionId) {
      fetchQuestion()
    }
  }, [questionId])

  return { 
    question, 
    loading, 
    error, 
    refetch: fetchQuestion
  }
}
