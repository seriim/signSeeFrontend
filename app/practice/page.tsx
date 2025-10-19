"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PracticeSession } from "@/components/practice-session"
import { ArrowLeft, Target, Play } from "lucide-react"

const practiceSigns = [
  { id: 1, sign: "Hello", description: "Wave your hand forward from your forehead", completed: false },
  { id: 2, sign: "Thank You", description: "Touch your chin and move hand forward", completed: false },
  { id: 3, sign: "Please", description: "Circle your hand on your chest", completed: false },
  { id: 4, sign: "Yes", description: "Nod your fist up and down", completed: false },
  { id: 5, sign: "No", description: "Close your fingers to thumb twice", completed: false },
]

export default function PracticePage() {
  const [sessionStarted, setSessionStarted] = useState(false)

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
        {/* Header */}
        <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/learn" className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105">
              <ArrowLeft className="h-5 w-5" />
              Back to Learning
            </Link>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Target className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignSee</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Card className="border-2 border-primary/40 bg-white/50 p-6 rounded-2xl">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/20 p-4">
                  <Play className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h1 className="mb-2 text-2xl font-bold">AI Practice Session</h1>
              <p className="mb-4 text-sm text-muted-foreground">
                Practice {practiceSigns.length} essential JSL signs with real-time AI gesture recognition. Earn XP for
                each successful sign!
              </p>

              <div className="mb-4 space-y-1">
                {practiceSigns.map((sign, index) => (
                  <div key={sign.id} className="flex items-center gap-2 rounded-2xl border-2 border-primary bg-primary/10 p-2 text-left">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/30 text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{sign.sign}</p>
                      <p className="text-xs text-muted-foreground">{sign.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="sm" onClick={() => setSessionStarted(true)} className="w-full rounded-full border-2 border-primary bg-primary/20 text-primary hover:bg-primary/30">
                <Play className="mr-2 h-4 w-4" />
                Start Practice Session
              </Button>

              <p className="mt-4 text-xs text-muted-foreground">
                Make sure your camera is enabled and you're in a well-lit area
              </p>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
      {/* Header */}
      <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/practice" onClick={() => setSessionStarted(false)} className="flex items-center gap-2 transition-transform hover:scale-105">
            <ArrowLeft className="h-5 w-5" />
            Exit Practice
          </Link>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignSee</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <PracticeSession
          signs={practiceSigns}
          onComplete={() => {
            alert("Practice session complete! Great job!")
            setSessionStarted(false)
          }}
        />
      </div>
    </div>
  )
}
