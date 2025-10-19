"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GestureRecognition } from "@/components/gesture-recognition"
import { Trophy, Star, ArrowRight, CheckCircle2 } from "lucide-react"
import { useUserProgress } from "@/hooks/use-api"
import { config } from "@/lib/config"
import type { Sign } from "@/lib/types"

interface PracticeSessionProps {
  signs: Sign[]
  userId: string
  onComplete?: () => void
  compact?: boolean
  layout?: "default" | "split"
}

export function PracticeSession({ signs, userId, onComplete, compact = false, layout = "default" }: PracticeSessionProps) {
  const [currentSignIndex, setCurrentSignIndex] = useState(0)
  const [completedSigns, setCompletedSigns] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  
  const { progress: userProgress, updateProgress, markLessonCompleted, loading: progressLoading, error: progressError } = useUserProgress(userId)

  const currentSign = signs[currentSignIndex]
  const progress = (completedSigns.length / signs.length) * 100

  // Handle errors gracefully
  if (progressError) {
    console.error('Progress error:', progressError)
  }

  const handleSuccess = () => {
    if (!completedSigns.includes(currentSign.id)) {
      setCompletedSigns([...completedSigns, currentSign.id])
      setTotalPoints(totalPoints + config.practice.xpPerSign)
      
      // Update user progress in the backend
      if (userProgress) {
        try {
          updateProgress({
            ...userProgress,
            xp: (userProgress.xp || 0) + config.practice.xpPerSign,
            stats: {
              ...userProgress.stats,
              totalSignsLearned: (userProgress.stats?.totalSignsLearned || 0) + 1,
              totalPracticeTime: (userProgress.stats?.totalPracticeTime || 0) + 1
            }
          })
        } catch (error) {
          console.error('Failed to update progress:', error)
          // Continue with the practice session even if progress update fails
        }
      }
    }

    if (currentSignIndex < signs.length - 1) {
      setTimeout(() => {
        setCurrentSignIndex(currentSignIndex + 1)
      }, 2000)
    } else {
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 2000)
    }
  }

  const handleSkip = () => {
    if (currentSignIndex < signs.length - 1) {
      setCurrentSignIndex(currentSignIndex + 1)
    } else {
      if (onComplete) onComplete()
    }
  }

  if (layout === "split") {
    return (
      <div className="grid gap-4 md:grid-cols-12">
        {/* Left: current sign + camera - following backend design */}
        <div className="md:col-span-8 space-y-4">
          {/* Current Sign Info - following backend design */}
          <Card className={compact ? "border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-4" : "border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-5"}>
            <div className="mb-1 flex items-center gap-2">
              <h3 className={compact ? "text-xl font-bold" : "text-2xl font-bold"}>{currentSign.word}</h3>
              {completedSigns.includes(currentSign.id) && (
                <CheckCircle2 className={compact ? "h-5 w-5 text-success" : "h-5 w-5 text-success"} />
              )}
            </div>
            <p className={compact ? "text-sm text-muted-foreground" : "text-sm text-muted-foreground"}>{currentSign.description}</p>
          </Card>

          {/* Gesture Recognition - following backend design */}
          <GestureRecognition targetSign={currentSign.word} userId={userId} onSuccess={handleSuccess} onSkip={handleSkip} compact={compact} />
        </div>

        {/* Right: progress + sign list - following backend design */}
        <div className="md:col-span-4 space-y-4">
          {/* Progress/XP - following backend design */}
          <Card className={compact ? "border p-4" : "border p-5"}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className={compact ? "text-base font-semibold" : "text-lg font-semibold"}>Progress</h2>
                <p className={compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
                  Sign {currentSignIndex + 1} of {signs.length}
                </p>
              </div>
              <Badge variant="default" className={compact ? "text-xs" : "text-sm"}>
                <Star className={compact ? "mr-1 h-3 w-3" : "mr-1 h-3.5 w-3.5"} />
                {totalPoints} XP
              </Badge>
            </div>
            <Progress value={progress} className={compact ? "h-2" : "h-2.5"} />
          </Card>

          {/* Sign List - following backend design */}
          <Card className={compact ? "p-3" : "p-4"}>
            <h3 className={compact ? "mb-2 text-sm font-semibold" : "mb-3 text-sm font-semibold"}>Practice Signs</h3>
            <div className="grid gap-2">
              {signs.map((sign, index) => (
                <button
                  key={sign.id}
                  onClick={() => setCurrentSignIndex(index)}
                  className={`flex items-center gap-2 rounded-lg border text-left ${compact ? "p-2" : "p-2.5"} ${
                    index === currentSignIndex
                      ? "border-primary bg-primary/10"
                      : completedSigns.includes(sign.id)
                        ? "border-success/30 bg-success/5"
                        : "border-border"
                  }`}
                >
                  <div
                    className={`flex ${compact ? "h-7 w-7" : "h-8 w-8"} flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      completedSigns.includes(sign.id)
                        ? "bg-success text-success-foreground"
                        : index === currentSignIndex
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {completedSigns.includes(sign.id) ? <CheckCircle2 className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} /> : index + 1}
                  </div>
                  <span className={compact ? "text-xs font-medium" : "text-sm font-medium"}>{sign.word}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Completion - following backend design */}
          {completedSigns.length === signs.length && (
            <Card className={compact ? "border border-success bg-gradient-to-br from-success/10 to-success/5 p-4 text-center" : "border border-success bg-gradient-to-br from-success/10 to-success/5 p-5 text-center"}>
              <Trophy className={compact ? "mx-auto mb-2 h-10 w-10 text-success" : "mx-auto mb-3 h-12 w-12 text-success"} />
              <div className={compact ? "text-lg font-bold text-success" : "text-xl font-bold text-success"}>{totalPoints} XP</div>
              {onComplete && (
                <Button size={compact ? "sm" : "default"} className="mt-2" onClick={onComplete}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {/* Progress Header */}
      <Card className={compact ? "border p-4" : "border-2 p-6"}>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className={compact ? "text-lg font-bold" : "text-2xl font-bold"}>Practice Session</h2>
            <p className={compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
              Sign {currentSignIndex + 1} of {signs.length}
            </p>
          </div>
          <Badge variant="default" className={compact ? "text-sm" : "text-lg"}>
            <Star className={compact ? "mr-1 h-3 w-3" : "mr-1 h-4 w-4"} />
            {totalPoints} XP
          </Badge>
        </div>
        <Progress value={progress} className={compact ? "h-2" : "h-3"} />
      </Card>

      {/* Current Sign Info */}
      <Card className={compact ? "border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-4" : "border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-6"}>
        <div className="mb-2 flex items-center gap-2">
          <h3 className={compact ? "text-xl font-bold" : "text-3xl font-bold"}>{currentSign.word}</h3>
          {completedSigns.includes(currentSign.id) && <CheckCircle2 className={compact ? "h-5 w-5 text-success" : "h-6 w-6 text-success"} />}
        </div>
        <p className={compact ? "text-sm text-muted-foreground" : "text-muted-foreground"}>{currentSign.description}</p>
      </Card>

      {/* Gesture Recognition */}
      <GestureRecognition targetSign={currentSign.word} userId={userId} onSuccess={handleSuccess} onSkip={handleSkip} compact={compact} />

      {/* Sign List */}
      <Card className={compact ? "p-4" : "p-6"}>
        <h3 className={compact ? "mb-3 text-sm font-semibold" : "mb-4 font-semibold"}>Practice Signs</h3>
        <div className={compact ? "grid gap-1.5 sm:grid-cols-2 md:grid-cols-3" : "grid gap-2 sm:grid-cols-2 md:grid-cols-3"}>
          {signs.map((sign, index) => (
            <div
              key={sign.id}
              className={`flex items-center gap-2 rounded-lg border ${compact ? "p-2" : "p-3"} ${
                index === currentSignIndex
                  ? "border-primary bg-primary/10"
                  : completedSigns.includes(sign.id)
                    ? "border-success/30 bg-success/5"
                    : "border-border"
              }`}
            >
              <div
                className={`flex ${compact ? "h-7 w-7" : "h-8 w-8"} flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  completedSigns.includes(sign.id)
                    ? "bg-success text-success-foreground"
                    : index === currentSignIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {completedSigns.includes(sign.id) ? <CheckCircle2 className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} /> : index + 1}
              </div>
              <span className={compact ? "text-xs font-medium" : "text-sm font-medium"}>{sign.word}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Completion Card */}
      {completedSigns.length === signs.length && (
        <Card className={compact ? "border border-success bg-gradient-to-br from-success/10 to-success/5 p-6 text-center" : "border-2 border-success bg-gradient-to-br from-success/10 to-success/5 p-8 text-center"}>
          <Trophy className={compact ? "mx-auto mb-3 h-12 w-12 text-success" : "mx-auto mb-4 h-16 w-16 text-success"} />
          <h3 className={compact ? "mb-1 text-xl font-bold" : "mb-2 text-2xl font-bold"}>Practice Complete!</h3>
          <p className={compact ? "mb-3 text-sm text-muted-foreground" : "mb-4 text-muted-foreground"}>You've successfully practiced all signs in this session</p>
          <div className={compact ? "mb-4 text-3xl font-bold text-success" : "mb-6 text-4xl font-bold text-success"}>{totalPoints} XP Earned</div>
          {onComplete && (
            <Button size={compact ? "sm" : "lg"} onClick={onComplete}>
              Continue
              <ArrowRight className={compact ? "ml-2 h-4 w-4" : "ml-2 h-5 w-5"} />
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
