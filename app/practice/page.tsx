"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Camera, Lightbulb, Target, Star } from "lucide-react"

const practiceSigns = [
  {
    id: 1,
    name: "Hello",
    instruction: "Wave your hand forward from your forehead",
    xpReward: 10,
  },
  {
    id: 2,
    name: "Thank You",
    instruction: "Touch your chin and move hand forward",
    xpReward: 10,
  },
  {
    id: 3,
    name: "Please",
    instruction: "Circle your hand on your chest",
    xpReward: 10,
  },
  {
    id: 4,
    name: "Yes",
    instruction: "Nod your fist up and down",
    xpReward: 10,
  },
  {
    id: 5,
    name: "No",
    instruction: "Close your fingers to thumb twice",
    xpReward: 10,
  },
]

export default function PracticePage() {
  const [isStarting, setIsStarting] = useState(false)
  const router = useRouter()

  const handleStartPractice = () => {
    setIsStarting(true)
    router.push("/practice/session")
  }

  const totalXP = practiceSigns.reduce((sum, sign) => sum + sign.xpReward, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
      {/* Header */}
      <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/learn" className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105">
            <ArrowLeft className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Back to Learn</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/translator">
              <Button variant="ghost" className="rounded-full hover:bg-primary/10">Translator</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Card className="border-2 border-primary/20 bg-white/80 backdrop-blur-sm p-6 text-center rounded-2xl shadow-lg">
            {/* Practice Icon */}
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-3">
                <Play className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">AI Practice Session</h1>
              <p className="text-sm text-muted-foreground">
                Practice 5 essential JSL signs with real-time AI gesture recognition. Earn XP for each successful sign!
              </p>
            </div>

            {/* Practice Signs List */}
            <div className="mb-6 space-y-2">
              {practiceSigns.map((sign, index) => (
                <div
                  key={sign.id}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-border/50"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-foreground">{sign.name}</h3>
                    <p className="text-xs text-muted-foreground">{sign.instruction}</p>
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                    <Star className="mr-1 h-2 w-2" />
                    {sign.xpReward} XP
                  </Badge>
                </div>
              ))}
            </div>

            {/* Total XP Display */}
            <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Total XP Available</span>
              </div>
              <p className="text-lg font-bold text-accent">{totalXP} XP</p>
            </div>

            {/* Start Button */}
            <div className="mb-4">
              <Button
                onClick={handleStartPractice}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-lg"
                disabled={isStarting}
              >
                <Play className="mr-2 h-4 w-4" />
                {isStarting ? "Starting Session..." : "Start Practice Session"}
              </Button>
            </div>

            {/* Camera Requirements */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Camera className="h-3 w-3" />
              <span>Make sure your camera is enabled and you're in a well-lit area.</span>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-3">
              <Lightbulb className="h-3 w-3" />
              <span>Tips for better recognition</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div className="p-2 bg-white/50 rounded-lg border border-border/50">
                <strong>Good Lighting:</strong> Ensure your face and hands are well-lit
              </div>
              <div className="p-2 bg-white/50 rounded-lg border border-border/50">
                <strong>Clear Background:</strong> Avoid busy backgrounds behind you
              </div>
              <div className="p-2 bg-white/50 rounded-lg border border-border/50">
                <strong>Steady Position:</strong> Keep your hands visible and steady
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
