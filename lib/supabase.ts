import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if Supabase is properly configured
let supabase: any

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
  // Using mock data - no warning needed
  // Create a mock client to prevent crashes
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      delete: () => ({ data: [], error: null }),
      eq: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
      limit: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: { message: 'Supabase not configured' } }),
      upsert: () => ({ data: [], error: null })
    })
  }
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }

// Database types (you'll need to generate these from your Supabase schema)
export interface Database {
  public: {
    Tables: {
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: string
          duration: number
          completed: boolean
          locked: boolean
          xp_reward: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          difficulty: string
          duration: number
          completed?: boolean
          locked?: boolean
          xp_reward: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: string
          duration?: number
          completed?: boolean
          locked?: boolean
          xp_reward?: number
          created_at?: string
          updated_at?: string
        }
      }
      signs: {
        Row: {
          id: string
          word: string
          category: string
          video_url: string
          thumbnail_url: string
          description: string
          difficulty: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          word: string
          category: string
          video_url: string
          thumbnail_url: string
          description: string
          difficulty: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          word?: string
          category?: string
          video_url?: string
          thumbnail_url?: string
          description?: string
          difficulty?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          user_id: string
          level: number
          xp: number
          xp_to_next_level: number
          streak: number
          last_active_date: string
          completed_lessons: string[]
          badges: any[]
          stats: any
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          level?: number
          xp?: number
          xp_to_next_level?: number
          streak?: number
          last_active_date?: string
          completed_lessons?: string[]
          badges?: any[]
          stats?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          level?: number
          xp?: number
          xp_to_next_level?: number
          streak?: number
          last_active_date?: string
          completed_lessons?: string[]
          badges?: any[]
          stats?: any
          created_at?: string
          updated_at?: string
        }
      }
      gesture_recognition: {
        Row: {
          id: string
          user_id: string
          gesture: string
          confidence: number
          landmarks: number[][]
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          gesture: string
          confidence: number
          landmarks: number[][]
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          gesture?: string
          confidence?: number
          landmarks?: number[][]
          created_at?: string
        }
      }
    }
  }
}
