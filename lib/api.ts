import type { Lesson, Sign, UserProgress, Badge, GestureRecognitionResult, Question } from './types'
import { mockSigns, mockLessons, mockUserProgress } from './mock-data'
import { lessonsData, getLessonsByModule, getLessonById } from './modules-data'

// Lessons API - Using hardcoded data
export const lessonsApi = {
  // Get all lessons
  async getAll(): Promise<Lesson[]> {
    return lessonsData
  },

  // Get lessons by module
  async getByModule(moduleId: number): Promise<Lesson[]> {
    return getLessonsByModule(moduleId)
  },

  // Get single lesson
  async getById(id: string): Promise<Lesson | null> {
    return getLessonById(id) || null
  },

  // Mark lesson as completed (no-op for hardcoded data)
  async markCompleted(id: string, userId: string): Promise<void> {
    console.log(`📚 Lesson ${id} marked as completed for user ${userId}`)
    // Update user progress
    await userProgressApi.addCompletedLesson(userId, id)
  }
}

// Signs API - Using mock data
export const signsApi = {
  // Get all signs
  async getAll(): Promise<Sign[]> {
    return mockSigns
  },

  // Get signs by category
  async getByCategory(category: string): Promise<Sign[]> {
    return mockSigns.filter(sign => sign.category === category)
  }
}

// User Progress API - Using mock data
export const userProgressApi = {
  // Get user progress
  async get(userId: string): Promise<UserProgress | null> {
    console.log('📊 Using mock data for user progress')
    return mockUserProgress
  },

  // Create or update user progress (no-op for hardcoded data)
  async upsert(progress: Partial<UserProgress>): Promise<void> {
    console.log('📊 User progress updated (mock):', progress)
  },

  // Add completed lesson (no-op for hardcoded data)
  async addCompletedLesson(userId: string, lessonId: string): Promise<void> {
    console.log(`📊 Lesson ${lessonId} marked as completed for user ${userId}`)
  },

  // Update streak (no-op for hardcoded data)
  async updateStreak(userId: string): Promise<void> {
    console.log(`📊 Streak updated for user ${userId}`)
  }
}

// Gesture Recognition API
export const gestureRecognitionApi = {
  // Save gesture recognition result
  // Note: Currently not saving to database as there's no dedicated practice_results table
  // gesture_videos is for video file storage only
  async saveResult(userId: string, result: GestureRecognitionResult): Promise<void> {
    try {
      console.log(`📊 Practice result recorded: ${result.gesture} at ${Math.round(result.confidence * 100)}% confidence`)
      // TODO: When a practice_results table is created, save here
      // For now, just log the result
    } catch (error) {
      console.error('Error in gestureRecognitionApi.saveResult:', error)
      // Don't throw, just log - practice should continue even if save fails
    }
  },

  // Get user's gesture recognition history
  // Returns empty array as there's no dedicated practice_results table yet
  async getHistory(userId: string, limit: number = 50): Promise<GestureRecognitionResult[]> {
    try {
      console.log(`📊 Fetching gesture history for user: ${userId}`)
      // TODO: When a practice_results table is created, fetch from there
      // For now, return empty array
      return []
    } catch (error) {
      console.error('Error in gestureRecognitionApi.getHistory:', error)
      // Return empty array as fallback
      return []
    }
  }
}

// Questions API - Not used with hardcoded data
export const questionsApi = {
  // Get questions for a specific lesson
  async getByLesson(lessonId: number): Promise<Question[]> {
    console.log(`📝 Fetching questions for lesson ${lessonId} (using hardcoded data)`)
    return []
  },

  // Get a specific question by ID
  async getById(id: number): Promise<Question | null> {
    console.log(`📝 Fetching question ${id} (using hardcoded data)`)
    return null
  },

  // Create a new question (no-op)
  async create(question: Omit<Question, 'id'>): Promise<Question> {
    throw new Error('Cannot create questions with hardcoded data')
  },

  // Update a question (no-op)
  async update(id: number, updates: Partial<Omit<Question, 'id'>>): Promise<void> {
    console.log(`📝 Question ${id} updated (mock)`)
  },

  // Delete a question (no-op)
  async delete(id: number): Promise<void> {
    console.log(`📝 Question ${id} deleted (mock)`)
  }
}
