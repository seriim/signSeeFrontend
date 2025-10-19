"use client"

import { useState, useEffect } from "react"

interface ModuleProgress {
  id: number
  completed: boolean
  completedLessons: number
  totalLessons: number
  points: number
  unlocked: boolean
}

interface UserProgress {
  modules: ModuleProgress[]
  totalXP: number
  level: number
  currentStreak: number
  badges: number
}

const defaultProgress: UserProgress = {
  modules: [
    { id: 1, completed: false, completedLessons: 0, totalLessons: 3, points: 0, unlocked: true },
    { id: 2, completed: false, completedLessons: 0, totalLessons: 3, points: 0, unlocked: false },
    { id: 3, completed: false, completedLessons: 0, totalLessons: 2, points: 0, unlocked: false },
    { id: 4, completed: false, completedLessons: 0, totalLessons: 0, points: 0, unlocked: false },
    { id: 5, completed: false, completedLessons: 0, totalLessons: 0, points: 0, unlocked: false },
    { id: 6, completed: false, completedLessons: 0, totalLessons: 0, points: 0, unlocked: false },
  ],
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  badges: 0,
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("signsee-progress")
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress)
        setProgress(parsedProgress)
      } catch (error) {
        console.error("Failed to load progress:", error)
        setProgress(defaultProgress)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save progress to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("signsee-progress", JSON.stringify(progress))
    }
  }, [progress, isLoaded])

  const completeLesson = (moduleId: number, lessonId: string, xpReward: number) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      const module = newProgress.modules.find(m => m.id === moduleId)
      
      if (module) {
        // Update lesson completion
        module.completedLessons += 1
        module.points += xpReward
        newProgress.totalXP += xpReward
        
        // Check if module is completed
        if (module.completedLessons >= module.totalLessons) {
          module.completed = true
          
          // Unlock next module
          const nextModule = newProgress.modules.find(m => m.id === moduleId + 1)
          if (nextModule) {
            nextModule.unlocked = true
          }
        }
      }
      
      return newProgress
    })
  }

  const completeModule = (moduleId: number) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      const module = newProgress.modules.find(m => m.id === moduleId)
      
      if (module) {
        module.completed = true
        
        // Unlock next module
        const nextModule = newProgress.modules.find(m => m.id === moduleId + 1)
        if (nextModule) {
          nextModule.unlocked = true
        }
      }
      
      return newProgress
    })
  }

  const getModuleStatus = (moduleId: number): "completed" | "in-progress" | "locked" => {
    const module = progress.modules.find(m => m.id === moduleId)
    if (!module) return "locked"
    
    if (module.completed) return "completed"
    if (module.unlocked) return "in-progress"
    return "locked"
  }

  const resetProgress = () => {
    setProgress(defaultProgress)
  }

  return {
    progress,
    isLoaded,
    completeLesson,
    completeModule,
    getModuleStatus,
    resetProgress,
  }
}
