"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, BookmarkPlus, Share2, Volume2 } from "lucide-react"

interface SignDisplayProps {
  word: string
  signData: {
    description: string
    category: string
    imageUrl: string
  }
}

export function SignDisplay({ word, signData }: SignDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In production, this would control video playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 3000) // Auto-stop after 3 seconds
    }
  }

  const handleReplay = () => {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    // In production, this would save to user's favorites
  }

  const handleShare = () => {
    // In production, this would open share dialog
    alert(`Share: ${word}`)
  }

  return (
    <Card className="overflow-hidden border-2">
      {/* Sign Title */}
      <div className="border-b bg-gradient-to-r from-primary/10 to-accent/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold capitalize">{word}</h2>
            <Badge variant="secondary" className="mt-1">
              {signData.category}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleSave} className={isSaved ? "text-primary" : ""}>
              <BookmarkPlus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video/Animation Display */}
      <div className="relative aspect-square bg-muted">
        <img
          src={signData.imageUrl || "/placeholder.svg"}
          alt={`JSL sign for ${word}`}
          className="h-full w-full object-cover"
        />

        {/* Play Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button size="lg" onClick={handlePlayPause} className="h-16 w-16 rounded-full">
              <Play className="h-8 w-8" />
            </Button>
          </div>
        )}

        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute right-4 top-4">
            <Badge variant="default" className="animate-pulse">
              <Volume2 className="mr-1 h-3 w-3" />
              Playing
            </Badge>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="border-t p-4">
        <div className="mb-4 flex gap-2">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={handlePlayPause}>
            {isPlaying ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Play
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handleReplay}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Description */}
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">How to sign</p>
          <p className="text-sm">{signData.description}</p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="border-t bg-muted/30 p-4">
        <p className="text-center text-xs text-muted-foreground">
          Practice this sign in our learning modules for XP rewards
        </p>
      </div>
    </Card>
  )
}
