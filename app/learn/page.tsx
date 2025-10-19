"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LevelMap } from "@/components/level-map";
import { getLessonsForModule } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-progress";
import {
  BookOpen,
  Lock,
  CheckCircle2,
  Star,
  Trophy,
  Flame,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LearnPage() {
  const { progress, isLoaded, getModuleStatus } = useProgress();

  // Show loading state while progress is being loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  // Generate modules data from progress
  const modules = [
    {
      id: 1,
      title: "JSL Basics",
      description: "Learn the fundamentals of Jamaican Sign Language",
      lessons: getLessonsForModule(1).length,
      completedLessons: progress.modules[0]?.completedLessons || 0,
      points: progress.modules[0]?.points || 0,
      status: getModuleStatus(1),
      difficulty: "Beginner" as const,
      unlocked: progress.modules[0]?.unlocked || false,
      position: { x: 100, y: 200 },
    },
    {
      id: 2,
      title: "Alphabet & Numbers",
      description: "Master the JSL alphabet and number signs",
      lessons: getLessonsForModule(2).length,
      completedLessons: progress.modules[1]?.completedLessons || 0,
      points: progress.modules[1]?.points || 0,
      status: getModuleStatus(2),
      difficulty: "Beginner" as const,
      unlocked: progress.modules[1]?.unlocked || false,
      position: { x: 300, y: 160 },
    },
    {
      id: 3,
      title: "Common Phrases",
      description: "Essential everyday phrases and greetings",
      lessons: getLessonsForModule(3).length,
      completedLessons: progress.modules[2]?.completedLessons || 0,
      points: progress.modules[2]?.points || 0,
      status: getModuleStatus(3),
      difficulty: "Intermediate" as const,
      unlocked: progress.modules[2]?.unlocked || false,
      position: { x: 500, y: 200 },
    },
    {
      id: 4,
      title: "Emotions & Feelings",
      description: "Express emotions and feelings in JSL",
      lessons: getLessonsForModule(4).length,
      completedLessons: progress.modules[3]?.completedLessons || 0,
      points: progress.modules[3]?.points || 0,
      status: getModuleStatus(4),
      difficulty: "Intermediate" as const,
      unlocked: progress.modules[3]?.unlocked || false,
      position: { x: 700, y: 160 },
    },
    {
      id: 5,
      title: "Commands & Actions",
      description: "Learn directional commands and action signs",
      lessons: getLessonsForModule(5).length,
      completedLessons: progress.modules[4]?.completedLessons || 0,
      points: progress.modules[4]?.points || 0,
      status: getModuleStatus(5),
      difficulty: "Intermediate" as const,
      unlocked: progress.modules[4]?.unlocked || false,
      position: { x: 900, y: 200 },
    },
    {
      id: 6,
      title: "Advanced Conversations",
      description: "Master advanced conversational JSL",
      lessons: getLessonsForModule(6).length,
      completedLessons: progress.modules[5]?.completedLessons || 0,
      points: progress.modules[5]?.points || 0,
      status: getModuleStatus(6),
      difficulty: "Advanced" as const,
      unlocked: progress.modules[5]?.unlocked || false,
      position: { x: 1100, y: 160 },
    },
  ];

  const userStats = {
    totalPoints: progress.totalXP,
    currentStreak: progress.currentStreak,
    level: progress.level,
    nextLevelPoints: 100,
    badges: progress.badges,
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
      {/* Header */}
      <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105"
          >
            <img className="size-[60px]" src="/logo.png" alt="logo" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SignSee
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/translator">
              <Button
                variant="ghost"
                className="rounded-full hover:bg-primary/10"
              >
                Translator
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/10">Practice</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Dashboard */}
        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Total Points
                </p>
                <p className="text-2xl font-bold text-primary">
                  {userStats.totalPoints}
                </p>
              </div>
              <Star className="h-7 w-7 text-primary" />
            </div>
          </Card>

          <Card className="border-2 border-accent bg-gradient-to-b from-accent/15 to-accent/5 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-accent">
                  {userStats.currentStreak} days
                </p>
              </div>
              <Flame className="h-7 w-7 text-accent" />
            </div>
          </Card>

          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Level
                </p>
                <p className="text-2xl font-bold text-primary">
                  {userStats.level}
                </p>
              </div>
              <Trophy className="h-7 w-7 text-primary" />
            </div>
          </Card>

          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Badges Earned
                </p>
                <p className="text-2xl font-bold text-primary">
                  {userStats.badges}
                </p>
              </div>
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-6 p-4 border-2 border-primary/40 bg-white/50 rounded-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Level {userStats.level} Progress
            </h3>
            <span className="text-sm text-muted-foreground">
              {userStats.totalPoints} / {userStats.nextLevelPoints} XP
            </span>
          </div>
          <Progress
            value={(userStats.totalPoints / userStats.nextLevelPoints) * 100}
            className="h-3 rounded-full"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            {userStats.nextLevelPoints - userStats.totalPoints} XP until Level{" "}
            {userStats.level + 1}
          </p>
        </Card>

        {/* Level Map */}
        <LevelMap modules={modules} userStats={userStats} />
      </div>
    </div>
  );
}
