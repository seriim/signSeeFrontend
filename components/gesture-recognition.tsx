"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, CameraOff, CheckCircle2, XCircle, Loader2, Hand } from "lucide-react"

interface GestureRecognitionProps {
  targetSign: string
  onSuccess?: () => void
  onSkip?: () => void
  compact?: boolean
}

export function GestureRecognition({ targetSign, onSuccess, onSkip, compact = false }: GestureRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [detectionStatus, setDetectionStatus] = useState<"idle" | "detecting" | "success" | "error">("idle")
  const [confidence, setConfidence] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup: stop video stream when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = async () => {
    setIsLoading(true)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setIsActive(true)
        setDetectionStatus("detecting")
        setFeedback("Position your hand in the camera view")

        // Simulate gesture detection (in production, this would use MediaPipe)
        simulateGestureDetection()
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      setDetectionStatus("error")
      setFeedback("Unable to access camera. Please check permissions.")
    } finally {
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsActive(false)
    setDetectionStatus("idle")
    setConfidence(0)
    setFeedback("")
  }

  // Simulate gesture detection (replace with actual MediaPipe implementation)
  const simulateGestureDetection = () => {
    let attempts = 0
    const maxAttempts = 10

    const interval = setInterval(() => {
      attempts++
      const randomConfidence = Math.floor(Math.random() * 100)
      setConfidence(randomConfidence)

      if (randomConfidence > 85) {
        setDetectionStatus("success")
        setFeedback(`Great job! "${targetSign}" detected with ${randomConfidence}% confidence`)
        clearInterval(interval)
        setTimeout(() => {
          if (onSuccess) onSuccess()
        }, 2000)
      } else if (randomConfidence > 60) {
        setFeedback("Almost there! Adjust your hand position slightly")
      } else if (randomConfidence > 30) {
        setFeedback("Hand detected. Try to match the target sign more closely")
      } else {
        setFeedback("Position your hand in the camera view")
      }

      if (attempts >= maxAttempts && randomConfidence <= 85) {
        setFeedback("Keep practicing! Try again or skip to continue")
        clearInterval(interval)
      }
    }, 1500)
  }

  return (
    <Card className={compact ? "overflow-hidden border" : "overflow-hidden border-2"}>
      {/* Camera View */}
      <div className={compact ? "relative bg-muted aspect-[4/3]" : "relative aspect-video bg-muted"}>
        {!isActive ? (
          <div className={compact ? "flex h-full flex-col items-center justify-center gap-3 p-6 text-center" : "flex h-full flex-col items-center justify-center gap-4 p-8 text-center"}>
            <Camera className={compact ? "h-10 w-10 text-muted-foreground" : "h-16 w-16 text-muted-foreground"} />
            <div>
              <h3 className={compact ? "mb-1 text-base font-semibold" : "mb-2 text-xl font-semibold"}>Practice with AI Recognition</h3>
              <p className={compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
                Use your webcam to practice signing "{targetSign}". Our AI will verify your gesture in real-time.
              </p>
            </div>
            <Button size={compact ? "sm" : "lg"} onClick={startCamera} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className={compact ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-5 w-5 animate-spin"} />
                  {compact ? "Starting..." : "Starting Camera..."}
                </>
              ) : (
                <>
                  <Camera className={compact ? "mr-2 h-4 w-4" : "mr-2 h-5 w-5"} />
                  {compact ? "Start" : "Start Practice"}
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              onLoadedMetadata={(e) => {
                const video = e.currentTarget
                video.play()
              }}
            />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

            {/* Detection Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={compact ? "rounded-lg border-2 border-dashed border-primary/50 p-16" : "rounded-lg border-4 border-dashed border-primary/50 p-32"} />
            </div>

            {/* Status Badge */}
            <div className={compact ? "absolute right-3 top-3" : "absolute right-4 top-4"}>
              <Badge
                variant={
                  detectionStatus === "success" ? "default" : detectionStatus === "error" ? "destructive" : "secondary"
                }
                className={compact ? "text-[11px] py-0.5" : "text-sm"}
              >
                {detectionStatus === "detecting" && (
                  <>
                    <Hand className={compact ? "mr-1 h-3 w-3 animate-pulse" : "mr-1 h-3 w-3 animate-pulse"} />
                    Detecting...
                  </>
                )}
                {detectionStatus === "success" && (
                  <>
                    <CheckCircle2 className={compact ? "mr-1 h-3 w-3" : "mr-1 h-3 w-3"} />
                    Success!
                  </>
                )}
                {detectionStatus === "error" && (
                  <>
                    <XCircle className={compact ? "mr-1 h-3 w-3" : "mr-1 h-3 w-3"} />
                    Error
                  </>
                )}
              </Badge>
            </div>

            {/* Stop Button */}
            <div className={compact ? "absolute left-3 top-3" : "absolute left-4 top-4"}>
              <Button variant="destructive" size={compact ? "xs" : "sm"} onClick={stopCamera}>
                <CameraOff className={compact ? "mr-2 h-3.5 w-3.5" : "mr-2 h-4 w-4"} />
                Stop
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Feedback Section */}
      {isActive && (
        <div className={compact ? "border-t p-4" : "border-t p-6"}>
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className={compact ? "text-xs font-medium" : "text-sm font-medium"}>Confidence</span>
              <span className={compact ? "text-xs font-semibold text-primary" : "text-sm font-semibold text-primary"}>{confidence}%</span>
            </div>
            <div className={compact ? "h-1.5 overflow-hidden rounded-full bg-muted" : "h-2 overflow-hidden rounded-full bg-muted"}>
              <div
                className={`h-full transition-all duration-300 ${
                  confidence > 85
                    ? "bg-success"
                    : confidence > 60
                      ? "bg-accent"
                      : confidence > 30
                        ? "bg-secondary"
                        : "bg-muted-foreground"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          <div
            className={`rounded-lg ${compact ? "border-l-2 p-3" : "border-l-4 p-4"} ${
              detectionStatus === "success"
                ? "border-l-success bg-success/5"
                : detectionStatus === "error"
                  ? "border-l-destructive bg-destructive/5"
                  : "border-l-accent bg-accent/5"
            }`}
          >
            <p className={compact ? "text-xs font-medium" : "text-sm font-medium"}>{feedback}</p>
          </div>

          {detectionStatus !== "success" && (
            <div className={compact ? "mt-3 flex gap-2" : "mt-4 flex gap-2"}>
              <Button variant="outline" onClick={stopCamera} className="flex-1 bg-transparent" size={compact ? "sm" : "default"}>
                Try Again
              </Button>
              {onSkip && (
                <Button variant="ghost" onClick={onSkip} className="flex-1" size={compact ? "sm" : "default"}>
                  Skip for Now
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info Footer */}
      {!isActive && (
        <div className={compact ? "border-t bg-muted/30 p-3" : "border-t bg-muted/30 p-4"}>
          <p className={compact ? "text-center text-[11px] text-muted-foreground" : "text-center text-xs text-muted-foreground"}>
            AI-powered gesture recognition using MediaPipe technology. Your video is processed locally and never stored.
          </p>
        </div>
      )}
    </Card>
  )
}
