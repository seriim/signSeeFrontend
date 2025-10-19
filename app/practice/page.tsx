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
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/learn" className="flex items-center gap-2 text-xl font-bold">
              <ArrowLeft className="h-5 w-5" />
              Back to Learning
            </Link>
            <div className="flex items-center gap-2 text-xl font-bold">
              <Target className="h-6 w-6 text-primary" />
              SignSee
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <Card className="border-2 p-12">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <Play className="h-16 w-16 text-primary" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold">AI Practice Session</h1>
              <p className="mb-8 text-lg text-muted-foreground">
                Practice {practiceSigns.length} essential JSL signs with real-time AI gesture recognition. Earn XP for
                each successful sign!
              </p>

              <div className="mb-8 space-y-2">
                {practiceSigns.map((sign, index) => (
                  <div key={sign.id} className="flex items-center gap-3 rounded-lg border p-3 text-left">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{sign.sign}</p>
                      <p className="text-sm text-muted-foreground">{sign.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={() => setSessionStarted(true)} className="w-full">
                <Play className="mr-2 h-5 w-5" />
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/practice" onClick={() => setSessionStarted(false)} className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            Exit Practice
          </Link>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-6 w-6 text-primary" />
            SignSee
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
