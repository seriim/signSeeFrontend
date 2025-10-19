import { supabase } from './supabase'
import type { Lesson, Sign, UserProgress, Badge, GestureRecognitionResult, Question } from './types'
import { mockSigns, mockLessons, mockUserProgress } from './mock-data'

// Lessons API
export const lessonsApi = {
  // Get all lessons
  async getAll(): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        signs:lesson_signs(
          sign:signs(*)
        )
      `)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching lessons:', error)
      return mockLessons
    }

    const lessons = data?.map((lesson: any) => ({
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
      moduleId: lesson.module_id,
      order: lesson.order,
      category: lesson.category as any,
      difficulty: lesson.difficulty as any,
      duration: lesson.duration,
      signs: lesson.signs?.map((ls: any) => ({
        id: ls.sign.id,
        word: ls.sign.word,
        category: ls.sign.category,
        videoUrl: ls.sign.video_url,
        thumbnailUrl: ls.sign.thumbnail_url,
        description: ls.sign.description,
        difficulty: ls.sign.difficulty as any,
      })) || [],
      completed: lesson.completed,
      locked: lesson.locked,
      xpReward: lesson.xp_reward,
    })) || []
    
    // Return demo data if no lessons from Supabase
    return lessons.length > 0 ? lessons : mockLessons
  },

  // Get lessons by module
  async getByModule(moduleId: number): Promise<Lesson[]> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        signs:lesson_signs(
          sign:signs(*)
        )
      `)
      .eq('module_id', moduleId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching lessons by module:', error)
      return mockLessons.filter(lesson => {
        const moduleMap: { [key: number]: string } = {
          1: 'basics',
          2: 'alphabet',
          3: 'numbers',
          4: 'phrases',
          5: 'commands',
          6: 'advanced'
        }
        return lesson.category === moduleMap[moduleId]
      })
    }

    const lessons = data?.map((lesson: any) => ({
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
      moduleId: lesson.module_id,
      order: lesson.order,
      category: lesson.category as any,
      difficulty: lesson.difficulty as any,
      duration: lesson.duration,
      signs: lesson.signs?.map((ls: any) => ({
        id: ls.sign.id,
        word: ls.sign.word,
        category: ls.sign.category,
        videoUrl: ls.sign.video_url,
        thumbnailUrl: ls.sign.thumbnail_url,
        description: ls.sign.description,
        difficulty: ls.sign.difficulty as any,
      })) || [],
      completed: lesson.completed,
      locked: lesson.locked,
      xpReward: lesson.xp_reward,
    })) || []
    
    // Return demo data filtered by module if no lessons from Supabase
    if (lessons.length === 0) {
      return mockLessons.filter(lesson => {
        // Map module IDs to lesson categories for demo data
        const moduleMap: { [key: number]: string } = {
          1: 'basics',
          2: 'alphabet',
          3: 'phrases',
          4: 'emotions',
          5: 'commands',
          6: 'conversations'
        }
        return lesson.category === moduleMap[moduleId]
      })
    }
    
    return lessons
  },

  // Get single lesson
  async getById(id: string): Promise<Lesson | null> {
    const { data, error } = await supabase
      .from('lessons')
      .select(`
        *,
        signs:lesson_signs(
          sign:signs(*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching lesson:', error)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      moduleId: data.module_id,
      order: data.order,
      category: data.category as any,
      difficulty: data.difficulty as any,
      duration: data.duration,
      signs: data.signs?.map((ls: any) => ({
        id: ls.sign.id,
        word: ls.sign.word,
        category: ls.sign.category,
        videoUrl: ls.sign.video_url,
        thumbnailUrl: ls.sign.thumbnail_url,
        description: ls.sign.description,
        difficulty: ls.sign.difficulty as any,
      })) || [],
      completed: data.completed,
      locked: data.locked,
      xpReward: data.xp_reward,
    }
  },

  // Mark lesson as completed
  async markCompleted(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('lessons')
      .update({ completed: true })
      .eq('id', id)

    if (error) {
      console.error('Error marking lesson as completed:', error)
      throw error
    }

    // Update user progress
    await userProgressApi.addCompletedLesson(userId, id)
  }
}

// Signs API
export const signsApi = {
  // Get all signs
  async getAll(): Promise<Sign[]> {
    try {
      const { data, error } = await supabase
        .from('signs')
        .select('*')
        .order('word', { ascending: true })

      if (error) {
        console.error('Error fetching signs:', error)
        // Return mock data instead of throwing error
        return mockSigns
      }

      const signs = data?.map((sign: any) => ({
        id: sign.id,
        word: sign.word,
        category: sign.category,
        videoUrl: sign.video_url,
        thumbnailUrl: sign.thumbnail_url,
        description: sign.description,
        difficulty: sign.difficulty as any,
      })) || []
      
      // Return demo data if no signs from Supabase
      return signs.length > 0 ? signs : mockSigns
    } catch (error) {
      console.error('Error in signsApi.getAll:', error)
      // Return mock data as fallback
      return mockSigns
    }
  },

  // Get signs by category
  async getByCategory(category: string): Promise<Sign[]> {
    const { data, error } = await supabase
      .from('signs')
      .select('*')
      .eq('category', category)
      .order('word', { ascending: true })

    if (error) {
      console.error('Error fetching signs by category:', error)
      throw error
    }

    return data?.map((sign: any) => ({
      id: sign.id,
      word: sign.word,
      category: sign.category,
      videoUrl: sign.video_url,
      thumbnailUrl: sign.thumbnail_url,
      description: sign.description,
      difficulty: sign.difficulty as any,
    })) || []
  }
}

// User Progress API
export const userProgressApi = {
  // Get user progress
  async get(userId: string): Promise<UserProgress | null> {
    try {
      // Check if Supabase is properly configured
      if (!supabase || typeof supabase.from !== 'function') {
        console.log('📊 Using mock data - Supabase not configured')
        return mockUserProgress
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.log('📊 Using mock data - Supabase error:', error.message)
        return mockUserProgress
      }

      return {
        userId: data.user_id,
        level: data.level,
        xp: data.xp,
        xpToNextLevel: data.xp_to_next_level,
        streak: data.streak,
        lastActiveDate: data.last_active_date,
        completedLessons: data.completed_lessons,
        badges: data.badges,
        stats: data.stats,
      }
    } catch (error) {
      console.log('📊 Using mock data - API error:', error)
      return mockUserProgress
    }
  },

  // Create or update user progress
  async upsert(progress: Partial<UserProgress>): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: progress.userId!,
          level: progress.level,
          xp: progress.xp,
          xp_to_next_level: progress.xpToNextLevel,
          streak: progress.streak,
          last_active_date: progress.lastActiveDate,
          completed_lessons: progress.completedLessons,
          badges: progress.badges,
          stats: progress.stats,
        })

      if (error) {
        console.error('Error upserting user progress:', error)
        // Don't throw error, just log it
        return
      }
    } catch (error) {
      console.error('Error in userProgressApi.upsert:', error)
      // Don't throw error, just log it
    }
  },

  // Add completed lesson
  async addCompletedLesson(userId: string, lessonId: string): Promise<void> {
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('completed_lessons, xp')
      .eq('user_id', userId)
      .single()

    if (currentProgress) {
      const updatedLessons = [...(currentProgress.completed_lessons || []), lessonId]
      const newXp = (currentProgress.xp || 0) + 100 // Assuming 100 XP per lesson

      await supabase
        .from('user_progress')
        .update({
          completed_lessons: updatedLessons,
          xp: newXp,
        })
        .eq('user_id', userId)
    }
  },

  // Update streak
  async updateStreak(userId: string): Promise<void> {
    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('streak, last_active_date')
      .eq('user_id', userId)
      .single()

    if (currentProgress) {
      const today = new Date().toISOString().split('T')[0]
      const lastActive = currentProgress.last_active_date?.split('T')[0]
      
      let newStreak = currentProgress.streak || 0
      if (lastActive !== today) {
        // Check if it's consecutive days
        if (lastActive) {
          const lastActiveDate = new Date(lastActive)
          const todayDate = new Date(today)
          const diffTime = todayDate.getTime() - lastActiveDate.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          
          if (diffDays === 1) {
            newStreak += 1
          } else {
            newStreak = 1
          }
        } else {
          newStreak = 1
        }
      }

      await supabase
        .from('user_progress')
        .update({
          streak: newStreak,
          last_active_date: today,
        })
        .eq('user_id', userId)
    }
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

// Questions API
export const questionsApi = {
  // Get questions for a specific lesson
  async getByLesson(lessonId: number): Promise<Question[]> {
    const { data, error } = await supabase
      .from('Question')
      .select('*')
      .eq('lessonId', lessonId)
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching questions:', error)
      throw error
    }

    return data?.map((question: any) => ({
      id: question.id,
      lessonId: question.lessonId,
      type: question.type,
      text: question.text,
      media: question.media,
      gesture: question.gesture,
    })) || []
  },

  // Get a specific question by ID
  async getById(id: number): Promise<Question | null> {
    const { data, error } = await supabase
      .from('Question')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching question:', error)
      return null
    }

    return {
      id: data.id,
      lessonId: data.lessonId,
      type: data.type,
      text: data.text,
      media: data.media,
      gesture: data.gesture,
    }
  },

  // Create a new question
  async create(question: Omit<Question, 'id'>): Promise<Question> {
    const { data, error } = await supabase
      .from('Question')
      .insert({
        lessonId: question.lessonId,
        type: question.type,
        text: question.text,
        media: question.media,
        gesture: question.gesture,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating question:', error)
      throw error
    }

    return {
      id: data.id,
      lessonId: data.lessonId,
      type: data.type,
      text: data.text,
      media: data.media,
      gesture: data.gesture,
    }
  },

  // Update a question
  async update(id: number, updates: Partial<Omit<Question, 'id'>>): Promise<void> {
    const { error } = await supabase
      .from('Question')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error('Error updating question:', error)
      throw error
    }
  },

  // Delete a question
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('Question')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting question:', error)
      throw error
    }
  }
}
