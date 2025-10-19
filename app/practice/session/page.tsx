"use client"

import { useRouter } from "next/navigation"
import { PracticeSession } from "@/components/practice-session"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"
import { useSigns } from "@/hooks/use-api"
import { config } from "@/lib/config"
import { PracticeLoadingScreen } from "@/components/ui/loading-screen"
import { NetworkErrorScreen } from "@/components/ui/error-screen"

export default function PracticeSessionPage() {
  const router = useRouter()
  const { signs, loading, error } = useSigns()
  
  // For now, using a hardcoded user ID. In a real app, this would come from authentication
  const userId = "demo-user-123"

  if (loading) {
    return <PracticeLoadingScreen />
  }

  if (error) {
    return (
      <NetworkErrorScreen 
        onRetry={() => window.location.reload()}
      />
    )
  }

  // Use first N signs from the API based on config
  const practiceSigns = signs.slice(0, config.practice.maxSignsPerSession)

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
          signs={practiceSigns}
          userId={userId}
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
