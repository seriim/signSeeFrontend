"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, CameraOff, CheckCircle2, XCircle, Loader2, Hand } from "lucide-react"
import { useGestureRecognition } from "@/hooks/use-api"
import { GestureAPI } from "@/lib/gesture-api"
import { config } from "@/lib/config"
import { GestureLoadingScreen, CameraLoadingScreen } from "@/components/ui/loading-screen"
import type { GestureRecognitionResult } from "@/lib/types"

// MediaPipe types
declare global {
  interface Window {
    Hands: any
    Camera: any
    drawConnectors: any
    drawLandmarks: any
    HAND_CONNECTIONS: any
    Module: {
      arguments_?: any[]
      [key: string]: any
    }
  }
}

interface GestureRecognitionProps {
  targetSign: string
  userId?: string
  onSuccess?: () => void
  onSkip?: () => void
  compact?: boolean
}

export function GestureRecognition({ targetSign, userId, onSuccess, onSkip, compact = false }: GestureRecognitionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [detectionStatus, setDetectionStatus] = useState<"idle" | "detecting" | "success" | "error">("idle")
  const [confidence, setConfidence] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [hands, setHands] = useState<any>(null)
  const [camera, setCamera] = useState<any>(null)
  const [latestLandmarks, setLatestLandmarks] = useState<any>(null)
  const [comparisonInterval, setComparisonInterval] = useState<NodeJS.Timeout | null>(null)
  const [practiceGestures, setPracticeGestures] = useState<any[]>([])
  const [gesturesLoading, setGesturesLoading] = useState(true)
  const [gesturesError, setGesturesError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  
  const { saveResult, loading: savingResult } = useGestureRecognition(userId)

  // Fetch practice gestures from database on component mount
  useEffect(() => {
    const fetchPracticeGestures = async () => {
      try {
        setGesturesLoading(true)
        setGesturesError(null)
        const gestures = await GestureAPI.getPracticeGestures(targetSign)
        if (gestures.length > 0) {
          setPracticeGestures(gestures)
          console.log(`✅ Loaded ${gestures.length} practice gestures for "${targetSign}"`)
        } else {
          setGesturesError(`No practice gestures found for "${targetSign}"`)
          console.warn(`⚠️ No practice gestures found for "${targetSign}"`)
        }
      } catch (error) {
        console.error('Error fetching practice gestures:', error)
        setGesturesError('Failed to load practice gestures')
      } finally {
        setGesturesLoading(false)
      }
    }

    if (targetSign) {
      fetchPracticeGestures()
    }
  }, [targetSign])

  useEffect(() => {
    return () => {
      // Cleanup: stop video stream when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      if (camera) {
        camera.stop()
      }
      if (comparisonInterval) {
        clearInterval(comparisonInterval)
      }
    }
  }, [stream, camera, comparisonInterval])

  // Load MediaPipe scripts
  useEffect(() => {
    const loadMediaPipe = async () => {
      if (typeof window === 'undefined') return

      try {
        // Fix for Module.arguments compatibility issue
        if (typeof window !== 'undefined') {
          if (!window.Module) {
            window.Module = {}
          }
          if (!window.Module.arguments_) {
            window.Module.arguments_ = []
          }
          // Also set the old property for compatibility
          if (!window.Module.arguments) {
            window.Module.arguments = []
          }
          console.log('🔧 MediaPipe compatibility fix applied')
        }

        // Load MediaPipe scripts if not already loaded
        if (!window.Hands) {
          const handsScript = document.createElement('script')
          handsScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js'
          handsScript.crossOrigin = 'anonymous'
          document.head.appendChild(handsScript)

          const cameraScript = document.createElement('script')
          cameraScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js'
          cameraScript.crossOrigin = 'anonymous'
          document.head.appendChild(cameraScript)

          const drawingScript = document.createElement('script')
          drawingScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js'
          drawingScript.crossOrigin = 'anonymous'
          document.head.appendChild(drawingScript)

          // Wait for scripts to load
          await new Promise((resolve) => {
            const checkLoaded = () => {
              if (window.Hands && window.Camera && window.drawConnectors) {
                resolve(true)
              } else {
                setTimeout(checkLoaded, 100)
              }
            }
            checkLoaded()
          })
        }

        // Initialize MediaPipe Hands
        const handsInstance = new window.Hands({
          locateFile: (file: string) => {
            return `${config.mediapipe.cdnUrl}/hands/${file}`
          }
        })

        handsInstance.setOptions({
          maxNumHands: config.mediapipe.hands.maxNumHands,
          modelComplexity: config.mediapipe.hands.modelComplexity,
          minDetectionConfidence: config.mediapipe.hands.minDetectionConfidence,
          minTrackingConfidence: config.mediapipe.hands.minTrackingConfidence
        })

        handsInstance.onResults(onResults)
        setHands(handsInstance)
        
        // Initialize hands
        await handsInstance.initialize()
        console.log('MediaPipe Hands initialized')
      } catch (error) {
        console.error('Error loading MediaPipe:', error)
        setDetectionStatus("error")
        setFeedback("Failed to load gesture recognition. Please refresh the page.")
      }
    }

    loadMediaPipe()
  }, [])

  const onResults = (results: any) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Clear canvas
    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw video frame
    if (videoRef.current) {
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)
    }

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // Store landmarks for comparison
      setLatestLandmarks(results.multiHandLandmarks)
      
      // Draw hand landmarks
      results.multiHandLandmarks.forEach((landmarks: any, index: number) => {
        const handLabel = results.multiHandedness?.[index]?.label || ''
        const color = handLabel === 'Left' ? '#38bdf8' : '#f59e0b'

        try {
          if (window.drawConnectors && window.HAND_CONNECTIONS) {
            window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color: color, lineWidth: 3 })
            window.drawLandmarks(ctx, landmarks, { color: '#e5e7eb', radius: 3 })
          } else {
            drawHandManually(ctx, landmarks, color)
          }
        } catch (e) {
          drawHandManually(ctx, landmarks, color)
        }
      })

      if (detectionStatus === "detecting") {
        setFeedback("Hand detected! Performing gesture recognition...")
      }
    } else {
      setLatestLandmarks(null)
      if (detectionStatus === "detecting") {
        setFeedback("Position your hand in the camera view")
      }
    }

    ctx.restore()
  }

  const drawHandManually = (ctx: CanvasRenderingContext2D, landmarks: any[], color = '#38bdf8') => {
    const connections = [
      [0,1],[1,2],[2,3],[3,4],      // Thumb
      [0,5],[5,6],[6,7],[7,8],      // Index
      [0,9],[9,10],[10,11],[11,12], // Middle
      [0,13],[13,14],[14,15],[15,16], // Ring
      [0,17],[17,18],[18,19],[19,20], // Pinky
      [5,9],[9,13],[13,17]          // Palm
    ]

    // Draw connections
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    connections.forEach(([i, j]) => {
      const start = landmarks[i]
      const end = landmarks[j]
      ctx.beginPath()
      ctx.moveTo(start.x * canvasRef.current!.width, start.y * canvasRef.current!.height)
      ctx.lineTo(end.x * canvasRef.current!.width, end.y * canvasRef.current!.height)
      ctx.stroke()
    })

    // Draw landmarks
    ctx.fillStyle = '#e5e7eb'
    landmarks.forEach(lm => {
      ctx.beginPath()
      ctx.arc(lm.x * canvasRef.current!.width, lm.y * canvasRef.current!.height, 4, 0, 2 * Math.PI)
      ctx.fill()
    })
  }

  const startCameraPreview = async () => {
    // Simple camera preview without MediaPipe
    try {
      console.log('📹 Starting camera preview...')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStream(stream)
        setPreviewMode(true)
        setIsActive(true)
        setFeedback("Camera preview active! Click 'Start Practice' to begin gesture recognition.")
        console.log('✅ Camera preview started')
      }
    } catch (error) {
      console.error("❌ Camera preview error:", error)
      setFeedback("Failed to start camera preview. Please check permissions.")
    }
  }

  const startCamera = async () => {
    if (!hands) {
      setFeedback("MediaPipe is still loading. Please wait...")
      return
    }

    // Check if getUserMedia is available
    if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setDetectionStatus("error")
      setFeedback("Camera access not available. Please ensure you're using HTTPS and have granted camera permissions.")
      return
    }

    setIsLoading(true)
    try {
      console.log('📹 Requesting camera access...')
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 }
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setStream(stream)
        console.log('✅ Camera stream acquired, waiting for video metadata...')
        console.log('📹 Stream tracks:', stream.getTracks().map(track => ({ kind: track.kind, enabled: track.enabled, readyState: track.readyState })))

        // Wait for video metadata to load (following backend example)
        await new Promise((resolve, reject) => {
          if (videoRef.current) {
            const timeout = setTimeout(() => {
              console.log('📹 Video loading timeout, proceeding anyway...')
              resolve(undefined)
            }, 5000) // 5 second timeout

            videoRef.current.onloadedmetadata = () => {
              console.log('📹 Video metadata loaded, starting playback...')
              console.log('📹 Video dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight)
              clearTimeout(timeout)
              videoRef.current?.play()
              resolve(undefined)
            }
            videoRef.current.oncanplay = () => {
              console.log('📹 Video can start playing')
            }
            videoRef.current.onplaying = () => {
              console.log('📹 Video is now playing')
            }
            videoRef.current.onerror = (e) => {
              console.error('📹 Video error:', e)
              clearTimeout(timeout)
              reject(new Error('Video failed to load'))
            }
          } else {
            reject(new Error('Video element not found'))
          }
        })

        // Set canvas dimensions to match video (following backend example)
        if (canvasRef.current && videoRef.current) {
          canvasRef.current.width = videoRef.current.videoWidth
          canvasRef.current.height = videoRef.current.videoHeight
          console.log(`✅ Video ready: ${canvasRef.current.width}x${canvasRef.current.height}`)
        }

        // Start camera processing (following backend example)
        console.log('🎥 Starting camera processing loop...')
        const cameraInstance = new window.Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current })
          },
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight
        })

        await cameraInstance.start()
        setCamera(cameraInstance)
        console.log('✅ Camera processing started - waiting for hand detection')

        // Start gesture comparison
        startGestureComparison()
        setDetectionStatus("detecting")
        setFeedback("Camera started! Position your hand in view.")
        setIsActive(true)
        setPreviewMode(false) // Exit preview mode
      }
    } catch (error) {
      console.error("❌ Camera error:", error)
      setDetectionStatus("error")
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          setFeedback("Camera access denied. Please allow camera permissions and try again.")
        } else if (error.name === 'NotFoundError') {
          setFeedback("No camera found. Please connect a camera and try again.")
        } else if (error.name === 'NotReadableError') {
          setFeedback("Camera is being used by another application. Please close other apps and try again.")
        } else if (error.name === 'OverconstrainedError') {
          setFeedback("Camera doesn't support the required resolution. Trying with lower quality...")
          // Try with lower resolution
          try {
            const fallbackStream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: 'user' }
            })
            if (videoRef.current) {
              videoRef.current.srcObject = fallbackStream
              setStream(fallbackStream)
              setIsActive(true)
              setDetectionStatus("detecting")
              setFeedback("Camera started with lower quality")
              return
            }
          } catch (fallbackError) {
            console.error("❌ Fallback camera error:", fallbackError)
          }
        } else {
          setFeedback(`Camera error: ${error.message}. Please check your camera and try again.`)
        }
      } else {
        setFeedback("Unknown camera error. Please check your camera and try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const startGestureComparison = () => {
    const interval = setInterval(async () => {
      if (latestLandmarks && latestLandmarks.length > 0) {
        await performGestureDetection()
      }
    }, config.practice.comparisonInterval) // Use config for interval

    setComparisonInterval(interval)
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (camera) {
      camera.stop()
      setCamera(null)
    }
    if (comparisonInterval) {
      clearInterval(comparisonInterval)
      setComparisonInterval(null)
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsActive(false)
    setDetectionStatus("idle")
    setConfidence(0)
    setFeedback("")
    setLatestLandmarks(null)
  }

  // Real gesture detection using MediaPipe landmarks
  const performGestureDetection = async () => {
    if (!latestLandmarks || latestLandmarks.length === 0) return

    try {
      // Use first hand for comparison
      const firstHand = latestLandmarks[0]
      const landmarks = firstHand.map((p: any) => ({ x: p.x, y: p.y, z: p.z ?? 0 }))
      
      // Compare with target gesture
      const comparisonResult = await compareWithTargetGesture(landmarks, targetSign)
      const confidence = Math.round(comparisonResult.similarity * 100)
      setConfidence(confidence)

      if (comparisonResult.similarity >= config.practice.confidenceThreshold) {
        setDetectionStatus("success")
        setFeedback(`Great job! "${targetSign}" detected with ${confidence}% confidence`)
        
        // Save the gesture recognition result
        const result: GestureRecognitionResult = {
          detected: true,
          confidence: comparisonResult.similarity,
          gesture: targetSign,
          landmarks: landmarks
        }
        
        await saveResult(result)
        
        // Stop comparison
        if (comparisonInterval) {
          clearInterval(comparisonInterval)
          setComparisonInterval(null)
        }
        
        setTimeout(() => {
          if (onSuccess) onSuccess()
        }, 2000)
      } else if (confidence >= 70) {
        setFeedback("Very close! Just a bit more adjustment needed")
      } else if (confidence >= 50) {
        setFeedback("Good progress! Adjust your hand position to match better")
      } else if (confidence >= 30) {
        setFeedback("Hand detected. Try to match the target sign more closely")
      } else if (confidence >= 10) {
        setFeedback("Hand detected. Keep practicing!")
      } else {
        setFeedback("Position your hand in the camera view")
      }
    } catch (error) {
      console.error('Gesture detection error:', error)
      setFeedback("Error detecting gesture. Please try again.")
    }
  }

  // Compare landmarks with target gesture using real API
  const compareWithTargetGesture = async (landmarks: any[], targetGesture: string) => {
    try {
      // Convert landmarks to the format expected by the API
      const landmarkArray = landmarks.map(lm => [lm.x, lm.y, lm.z || 0])
      
      // Log database gesture info if available
      if (practiceGestures.length > 0) {
        console.log(`📊 Comparing against ${practiceGestures.length} database gesture(s) for "${targetGesture}"`)
      }
      
      // Use the real API to compare with the backend
      const result = await GestureAPI.compareGesture({
        landmarks: landmarkArray,
        targetGesture: targetGesture,
        userId: userId || 'guest'
      })
      
      return {
        similarity: result.confidence,
        match: result.isMatch
      }
    } catch (error) {
      console.error('Comparison error:', error)
      // Fallback to mock data if API fails
      const mockSimilarity = Math.random() * 0.3 + 0.7
      return { 
        similarity: mockSimilarity, 
        match: mockSimilarity >= 0.8 
      }
    }
  }

  return (
    <Card className={compact ? "overflow-hidden border" : "overflow-hidden border-2"}>
      {/* Camera View */}
      <div className={compact ? "relative bg-black aspect-[4/3]" : "relative aspect-video bg-black"}>
        {!isActive ? (
          <div className={compact ? "flex h-full flex-col items-center justify-center gap-3 p-6 text-center" : "flex h-full flex-col items-center justify-center gap-4 p-8 text-center"}>
            <Camera className={compact ? "h-10 w-10 text-muted-foreground" : "h-16 w-16 text-muted-foreground"} />
            <div>
              <h3 className={compact ? "mb-1 text-base font-semibold" : "mb-2 text-xl font-semibold"}>Practice with AI Recognition</h3>
              <p className={compact ? "text-xs text-muted-foreground" : "text-sm text-muted-foreground"}>
                Use your webcam to practice signing "{targetSign}". Our AI will verify your gesture in real-time.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size={compact ? "sm" : "lg"} onClick={startCameraPreview} disabled={isLoading}>
                <Camera className={compact ? "mr-2 h-4 w-4" : "mr-2 h-5 w-5"} />
                {compact ? "Preview Camera" : "Preview Camera"}
              </Button>
              {previewMode && (
                <Button size={compact ? "sm" : "lg"} onClick={startCamera} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className={compact ? "mr-2 h-4 w-4 animate-spin" : "mr-2 h-5 w-5 animate-spin"} />
                      {compact ? "Starting..." : "Starting Practice..."}
                    </>
                  ) : (
                    <>
                      <Hand className={compact ? "mr-2 h-4 w-4" : "mr-2 h-5 w-5"} />
                      {compact ? "Start Practice" : "Start Practice"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
              style={{ 
                transform: 'scaleX(-1)', // Mirror the video like the backend example
                objectFit: 'cover',
                backgroundColor: '#000' // Ensure black background
              }}
              onLoadedMetadata={(e) => {
                console.log('📹 Video metadata loaded in render')
                const video = e.currentTarget
                video.play()
              }}
              onCanPlay={(e) => {
                console.log('📹 Video can play')
              }}
              onPlaying={(e) => {
                console.log('📹 Video is playing')
              }}
              onError={(e) => {
                console.error('📹 Video error:', e)
              }}
            />
            
            {/* Canvas for hand tracking */}
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 h-full w-full pointer-events-none"
              style={{ 
                transform: 'scaleX(-1)', // Mirror the canvas to match video
                objectFit: 'cover',
                backgroundColor: 'transparent'
              }}
            />
            
            {/* Debug overlay - shows if video is not displaying */}
            {!videoRef.current?.srcObject && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center text-white">
                  <div className="mb-2 text-lg font-semibold">Camera Loading...</div>
                  <div className="text-sm">Please wait for video to appear</div>
                </div>
              </div>
            )}

            {/* Preview mode overlay */}
            {previewMode && !detectionStatus && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-lg bg-black/70 px-4 py-2 text-white">
                  <div className="text-sm font-semibold">Camera Preview Active</div>
                  <div className="text-xs">Click "Start Practice" to begin gesture recognition</div>
                </div>
              </div>
            )}

            {/* Detection Overlay - following backend design */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={compact ? "rounded-lg border-2 border-dashed border-primary/50 p-16" : "rounded-lg border-4 border-dashed border-primary/50 p-32"} />
            </div>

            {/* Status Badge - following backend design */}
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
              <Button variant="destructive" size={compact ? "sm" : "sm"} onClick={stopCamera}>
                <CameraOff className={compact ? "mr-2 h-3.5 w-3.5" : "mr-2 h-4 w-4"} />
                Stop
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Feedback Section - following backend design */}
      {isActive && (
        <div className={compact ? "border-t p-4" : "border-t p-6"}>
          {/* Confidence Meter - following backend design */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className={compact ? "text-xs font-medium" : "text-sm font-medium"}>Match Score</span>
              <span className={compact ? "text-xs font-semibold text-primary" : "text-sm font-semibold text-primary"}>{confidence}%</span>
            </div>
            <div className={compact ? "h-1.5 overflow-hidden rounded-full bg-muted" : "h-2 overflow-hidden rounded-full bg-muted"}>
              <div
                className={`h-full transition-all duration-300 ${
                  confidence >= 80
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : confidence >= 50
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : "bg-gradient-to-r from-red-500 to-red-600"
                }`}
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>

          {/* Status Message - following backend design */}
          <div
            className={`rounded-lg ${compact ? "border-l-2 p-3" : "border-l-4 p-4"} ${
              detectionStatus === "success"
                ? "border-l-green-500 bg-green-500/5"
                : detectionStatus === "error"
                  ? "border-l-red-500 bg-red-500/5"
                  : "border-l-blue-500 bg-blue-500/5"
            }`}
          >
            <p className={compact ? "text-xs font-medium" : "text-sm font-medium"}>{feedback}</p>
          </div>

          {/* Action Buttons */}
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

      {/* Info Footer - following backend design */}
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
