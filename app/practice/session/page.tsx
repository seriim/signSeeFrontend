"use client"

import { useRouter } from "next/navigation"
import { PracticeSession } from "@/components/practice-session"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

const signs = [
  { id: 1, sign: "Hello", description: "Wave your hand forward from your forehead", completed: false },
  { id: 2, sign: "Thank You", description: "Touch your chin and move hand forward", completed: false },
  { id: 3, sign: "Please", description: "Move your open hand in a small circle on your chest", completed: false },
  { id: 4, sign: "Yes", description: "Nod your fist up and down", completed: false },
  { id: 5, sign: "No", description: "Tap index and middle finger to thumb twice", completed: false },
]

export default function PracticeSessionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/10 via-background to-primary/5">
      {/* Ghibli-style header */}
      <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-2 px-3 py-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h1 className="text-base md:text-lg font-semibold">Practice Session</h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-3 py-4 max-w-6xl">
        <PracticeSession
          signs={signs}
          layout="split"
          onComplete={() => router.push("/practice")}
        />

        {/* Subtle footer note */}
        <div className="mx-auto mt-4 max-w-6xl text-center text-[11px] text-muted-foreground">
          Your video is processed locally and never stored.
        </div>
      </div>
    </div>
  )
}
