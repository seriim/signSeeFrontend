"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft, Search, BookOpen } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-2 border-primary/20 bg-white/80 backdrop-blur-sm p-8 text-center rounded-3xl shadow-xl">
          {/* 404 Icon */}
          <div className="mb-6">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
              <Search className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Helpful Message */}
          <div className="mb-8 p-4 bg-accent/10 rounded-xl border border-accent/20">
            <p className="text-sm text-muted-foreground">
              Don't worry! Let's get you back on track with your Jamaican Sign Language learning journey.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/40 hover:bg-primary/10">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Continue Learning
                </Button>
              </Link>
            </div>
            
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-xs">
                  Dashboard
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="ghost" size="sm" className="text-xs">
                  Learn
                </Button>
              </Link>
              <Link href="/quiz">
                <Button variant="ghost" size="sm" className="text-xs">
                  Quiz
                </Button>
              </Link>
              <Link href="/translator">
                <Button variant="ghost" size="sm" className="text-xs">
                  Translator
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
