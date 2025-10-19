"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GestureRecognition } from "@/components/gesture-recognition"
import { Trophy, Star, ArrowRight, CheckCircle2 } from "lucide-react"

interface PracticeSign {
  id: number
  sign: string
  description: string
  completed: boolean
}

interface PracticeSessionProps {
  signs: PracticeSign[]
  onComplete?: () => void
}

export function PracticeSession({ signs, onComplete }: PracticeSessionProps) {
  const [currentSignIndex, setCurrentSignIndex] = useState(0)
  const [completedSigns, setCompletedSigns] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

  const currentSign = signs[currentSignIndex]
  const progress = (completedSigns.length / signs.length) * 100

  const handleSuccess = () => {
    if (!completedSigns.includes(currentSign.id)) {
      setCompletedSigns([...completedSigns, currentSign.id])
      setTotalPoints(totalPoints + 50)
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

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="border-2 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Practice Session</h2>
            <p className="text-sm text-muted-foreground">
              Sign {currentSignIndex + 1} of {signs.length}
            </p>
          </div>
          <Badge variant="default" className="text-lg">
            <Star className="mr-1 h-4 w-4" />
            {totalPoints} XP
          </Badge>
        </div>
        <Progress value={progress} className="h-3" />
      </Card>

      {/* Current Sign Info */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-3xl font-bold">{currentSign.sign}</h3>
          {completedSigns.includes(currentSign.id) && <CheckCircle2 className="h-6 w-6 text-success" />}
        </div>
        <p className="text-muted-foreground">{currentSign.description}</p>
      </Card>

      {/* Gesture Recognition */}
      <GestureRecognition targetSign={currentSign.sign} onSuccess={handleSuccess} onSkip={handleSkip} />

      {/* Sign List */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Practice Signs</h3>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {signs.map((sign, index) => (
            <div
              key={sign.id}
              className={`flex items-center gap-2 rounded-lg border p-3 ${
                index === currentSignIndex
                  ? "border-primary bg-primary/10"
                  : completedSigns.includes(sign.id)
                    ? "border-success/30 bg-success/5"
                    : "border-border"
              }`}
            >
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  completedSigns.includes(sign.id)
                    ? "bg-success text-success-foreground"
                    : index === currentSignIndex
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {completedSigns.includes(sign.id) ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
              </div>
              <span className="text-sm font-medium">{sign.sign}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Completion Card */}
      {completedSigns.length === signs.length && (
        <Card className="border-2 border-success bg-gradient-to-br from-success/10 to-success/5 p-8 text-center">
          <Trophy className="mx-auto mb-4 h-16 w-16 text-success" />
          <h3 className="mb-2 text-2xl font-bold">Practice Complete!</h3>
          <p className="mb-4 text-muted-foreground">You've successfully practiced all signs in this session</p>
          <div className="mb-6 text-4xl font-bold text-success">{totalPoints} XP Earned</div>
          {onComplete && (
            <Button size="lg" onClick={onComplete}>
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          )}
        </Card>
      )}
    </div>
  )
}
