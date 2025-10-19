"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Lock, 
  Star, 
  BookOpen, 
  ArrowRight,
  Trophy,
  Flame,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

interface Module {
  id: number
  title: string
  description: string
  lessons: number
  completedLessons: number
  points: number
  status: "completed" | "in-progress" | "locked"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  unlocked: boolean
  position: { x: number; y: number }
}

interface LevelMapProps {
  modules: Module[]
  userStats: {
    totalPoints: number
    currentStreak: number
    level: number
    nextLevelPoints: number
    badges: number
  }
}

export function LevelMap({ modules, userStats }: LevelMapProps) {
  const [activeModule, setActiveModule] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close module info when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveModule(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  const getModuleStatus = (module: Module) => {
    if (module.status === "completed") return "completed"
    if (module.status === "in-progress") return "current"
    return "locked"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "from-secondary to-secondary/80"
      case "Intermediate":
        return "from-accent to-accent/80"
      case "Advanced":
        return "from-primary to-primary/80"
      default:
        return "from-muted to-muted/80"
    }
  }

  const getStatusColor = (status: string, difficulty: string) => {
    if (status === "completed") {
      return `fill-secondary stroke-secondary/80 stroke-2 cursor-pointer`
    }
    if (status === "current") {
      return `fill-primary stroke-primary/80 stroke-2 cursor-pointer`
    }
    return `fill-muted stroke-muted/50 stroke-2 cursor-pointer`
  }

  const getPathColor = (fromStatus: string, toStatus: string) => {
    if (fromStatus === "completed" && toStatus === "completed") {
      return "stroke-secondary/60"
    }
    if (fromStatus === "completed" && toStatus === "current") {
      return "stroke-primary/60"
    }
    if (fromStatus === "current" && toStatus === "locked") {
      return "stroke-muted/30"
    }
    return "stroke-muted/30"
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-card to-card/80 p-4 sm:p-6 lg:p-8 border-3 border-primary">
      {/* Subtle Ghibli-inspired background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Map Title */}
      <div className="relative mb-6 sm:mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          🎮 Learning Adventure
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete levels to master Jamaican Sign Language ✨
        </p>
      </div>

      {/* SVG Level Map - Responsive */}
      <div className="relative mx-auto w-full max-w-4xl">
        <svg
          viewBox="0 0 900 280"
          className="h-auto w-full min-h-[280px] sm:min-h-[320px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Zig-zag dotted path connecting levels */}
          <path
            d="M 50 80 L 150 80 L 150 180 L 250 180 L 250 80 L 350 80 L 350 180 L 450 180 L 450 80 L 550 80 L 550 180 L 650 180 L 650 80 L 750 80 L 750 180 L 820 180"
            stroke="#cbd5e0"
            strokeWidth="2"
            strokeDasharray="4, 6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Level Nodes */}
          {modules.map((module, index) => {
            const status = getModuleStatus(module)
            const isCompleted = status === "completed"
            const isCurrent = status === "current"
            const isLocked = status === "locked"
            
            // Calculate position for zig-zag pattern
            const positions = [
              { x: 50, y: 80 },
              { x: 150, y: 80 },
              { x: 250, y: 180 },
              { x: 350, y: 180 },
              { x: 450, y: 80 },
              { x: 550, y: 80 },
              { x: 650, y: 180 },
              { x: 750, y: 180 }
            ]
            
            const pos = positions[index] || { x: 50 + (index * 100), y: 80 }
            const size = 20
            
            return (
              <g 
                key={module.id}
                onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                className="cursor-pointer"
              >
                {/* Level circle with gradient */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={size}
                  className={getStatusColor(status, module.difficulty)}
                  style={{
                    filter: isCompleted ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))' : 
                            isCurrent ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : 'none'
                  }}
                />
                
                {/* Level number */}
                <text
                  x={pos.x}
                  y={pos.y + 6}
                  textAnchor="middle"
                  className={`text-sm font-bold ${isLocked ? 'text-gray-500' : 'text-white'}`}
                >
                  {module.id}
                </text>
                
                {/* Status indicator - checkmark for completed */}
                {isCompleted && (
                  <circle
                    cx={pos.x + 18}
                    cy={pos.y - 18}
                    r={10}
                    className="fill-green-500 stroke-2 stroke-white"
                  />
                )}
                
                {/* Current indicator - dot for current */}
                {isCurrent && (
                  <circle
                    cx={pos.x + 18}
                    cy={pos.y - 18}
                    r={6}
                    className="fill-blue-500"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.8))' }}
                  />
                )}
                
                {/* Lock icon for locked levels */}
                {isLocked && (
                  <Lock
                    x={pos.x + 12}
                    y={pos.y - 20}
                    size={16}
                    className="fill-gray-400 text-gray-400"
                  />
                )}
              </g>
            )
          })}
          
          {/* Boss Level Crown Icon */}
          <g 
            onClick={() => setActiveModule(999)}
            className="cursor-pointer"
          >
            <g transform="translate(820, 180)">
              <ellipse cx="0" cy="8" rx="20" ry="7" className="fill-yellow-400 stroke-yellow-600 stroke-2" />
              <polygon 
                points="-16,8 -12,-10 -6,8 0,-14 6,8 12,-10 16,8" 
                className="fill-yellow-400 stroke-yellow-600 stroke-2"
              />
              <circle cx="-12" cy="-10" r="2.5" className="fill-red-500 stroke-red-700 stroke-1" />
              <circle cx="0" cy="-14" r="3" className="fill-red-500 stroke-red-700 stroke-1" />
              <circle cx="12" cy="-10" r="2.5" className="fill-red-500 stroke-red-700 stroke-1" />
              <circle cx="-10" cy="10" r="2" className="fill-blue-400 stroke-blue-600 stroke-1" />
              <circle cx="0" cy="12" r="2" className="fill-blue-400 stroke-blue-600 stroke-1" />
              <circle cx="10" cy="10" r="2" className="fill-blue-400 stroke-blue-600 stroke-1" />
              <circle cx="0" cy="0" r="32" fill="none" stroke="url(#bossGlow)" strokeWidth="2" opacity="0.6" />
            </g>
            <text
              x="820"
              y="220"
              textAnchor="middle"
              className="text-xs font-bold fill-orange-600"
            >
              BOSS
            </text>
          </g>

          {/* Gradients */}
          <defs>
            <linearGradient id="beginnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="intermediateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="advancedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <radialGradient id="bossGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

        </svg>
      </div>

      {/* Module Info Card - Appears on click */}
      {activeModule && (() => {
        // Handle boss level separately
        if (activeModule === 999) {
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20" onClick={() => setActiveModule(null)}>
              <div 
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top section with boss badge */}
                <div className="px-6 pt-6 pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="px-4 py-2 rounded-full text-white font-medium text-sm bg-gradient-to-r from-yellow-500 to-orange-500">
                      BOSS LEVEL
                    </div>
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Final Challenge</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">Master all your skills in this ultimate test. Defeat the boss to prove you're a true Jamaican Sign Language expert!</p>
                </div>
                
                {/* Action button */}
                <div className="px-6 py-4">
                  <Link href="/learn/boss" className="w-full block">
                    <Button
                      className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      size="lg"
                    >
                      <Trophy className="mr-2 h-5 w-5" />
                      Face the Boss
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        }
        
        const module = modules.find(m => m.id === activeModule)
        if (!module) return null
        
        const status = getModuleStatus(module)
        const isCompleted = status === "completed"
        const isCurrent = status === "current"
        const isLocked = status === "locked"

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20" onClick={() => setActiveModule(null)}>
            <div 
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top section with difficulty badge and status icon */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div className={`px-4 py-2 rounded-full text-white font-medium text-sm ${
                    module.difficulty === "Beginner" ? "bg-blue-500" :
                    module.difficulty === "Intermediate" ? "bg-orange-400" : "bg-red-400"
                  }`}>
                    {module.difficulty}
                  </div>
                  <div>
                    {isCompleted && <CheckCircle2 className="h-6 w-6 text-green-500" />}
                    {isCurrent && <div className="h-4 w-4 rounded-full bg-blue-500" />}
                    {isLocked && <Lock className="h-6 w-6 text-gray-400" />}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{module.title}</h3>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
              </div>
              
              {/* Progress section */}
              <div className="px-6 py-4 border-t border-gray-100">
                {!isLocked && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">{module.completedLessons} / {module.lessons} lessons</span>
                      <span className={`font-bold text-lg ${
                        module.difficulty === "Beginner" ? "text-blue-500" :
                        module.difficulty === "Intermediate" ? "text-orange-500" : "text-red-500"
                      }`}>
                        {module.points} XP
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-3 rounded-full ${
                          module.difficulty === "Beginner" ? "bg-blue-500" :
                          module.difficulty === "Intermediate" ? "bg-orange-500" : "bg-red-500"
                        }`}
                        style={{ width: `${(module.completedLessons / module.lessons) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action button */}
              <div className="px-6 py-4">
                {!isLocked ? (
                  <Link href={`/learn/module/${module.id}`} className="w-full block">
                    <Button
                      className={`w-full py-3 rounded-2xl font-semibold text-white ${
                        module.difficulty === "Beginner" ? "bg-blue-500 hover:bg-blue-600" :
                        module.difficulty === "Intermediate" ? "bg-orange-500 hover:bg-orange-600" :
                        "bg-red-500 hover:bg-red-600"
                      }`}
                      size="lg"
                    >
                      {isCompleted ? (
                        <>
                          <BookOpen className="mr-2 h-5 w-5" />
                          Review
                        </>
                      ) : (
                        <>
                          {isCurrent ? "Continue Learning" : "Start Learning"}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    className="w-full py-3 rounded-2xl font-semibold bg-gray-200 text-gray-600 hover:bg-gray-300"
                    disabled 
                    size="lg"
                  >
                    <Lock className="mr-2 h-5 w-5" />
                    Complete previous modules
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
      })()}

      {/* Legend */}
      <div className="relative mt-8 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-gray-700 font-medium">Completed</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-gray-700 font-medium">Current</span>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200">
          <div className="h-3 w-3 rounded-full bg-gray-300" />
          <span className="text-gray-700 font-medium">Locked</span>
        </div>
      </div>
      
      {/* Difficulty Legend */}
      <div className="relative mt-3 flex flex-wrap justify-center gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-2 w-6 rounded-full bg-gradient-to-r from-green-400 to-green-600" />
          <span className="text-gray-500">Beginner</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-6 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
          <span className="text-gray-500">Intermediate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-6 rounded-full bg-gradient-to-r from-red-400 to-red-600" />
          <span className="text-gray-500">Advanced</span>
        </div>
      </div>
    </div>
  )
}
