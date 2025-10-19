import { AlertCircle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ErrorScreenProps {
  title?: string
  message?: string
  onRetry?: () => void
  onGoHome?: () => void
  className?: string
  showRetry?: boolean
  showHome?: boolean
}

export function ErrorScreen({ 
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
  onGoHome,
  className,
  showRetry = true,
  showHome = true
}: ErrorScreenProps) {
  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3 flex items-center justify-center p-4",
      className
    )}>
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{message}</p>
        </div>
        
        <div className="flex flex-col gap-3">
          {showRetry && onRetry && (
            <Button onClick={onRetry} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {showHome && onGoHome && (
            <Button variant="outline" onClick={onGoHome} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

// Specialized error screens for different contexts
export function NetworkErrorScreen({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorScreen
      title="Connection Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  )
}

export function CameraErrorScreen({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorScreen
      title="Camera Access Denied"
      message="Please allow camera access to use the practice feature. Make sure you're using HTTPS and have granted camera permissions."
      onRetry={onRetry}
    />
  )
}

export function MediaPipeErrorScreen({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorScreen
      title="Gesture Recognition Unavailable"
      message="Failed to load gesture recognition. Please refresh the page or try again later."
      onRetry={onRetry}
    />
  )
}
