import { Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingScreenProps {
  message?: string
  className?: string
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

export function LoadingScreen({ 
  message = "Loading...", 
  className,
  size = "md",
  showIcon = true 
}: LoadingScreenProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3 flex items-center justify-center",
      className
    )}>
      <div className="text-center space-y-4">
        {showIcon && (
          <div className="flex justify-center">
            <div className="relative">
              <div className={cn(
                "animate-spin rounded-full border-2 border-primary/20",
                sizeClasses[size]
              )}>
                <div className={cn(
                  "absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin",
                  sizeClasses[size]
                )} />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-primary animate-pulse" />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <p className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
            {message}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Specialized loading screens for different contexts
export function ProgressLoadingScreen() {
  return (
    <LoadingScreen 
      message="Loading your progress..." 
      size="lg"
    />
  )
}

export function PracticeLoadingScreen() {
  return (
    <LoadingScreen 
      message="Loading practice signs..." 
      size="lg"
    />
  )
}

export function GestureLoadingScreen() {
  return (
    <LoadingScreen 
      message="Initializing gesture recognition..." 
      size="md"
    />
  )
}

export function CameraLoadingScreen() {
  return (
    <LoadingScreen 
      message="Starting camera..." 
      size="md"
    />
  )
}
