"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LevelMap } from "@/components/level-map";
import { useLessonsByModule, useUserProgress } from "@/hooks/use-api";
import { ProgressLoadingScreen } from "@/components/ui/loading-screen";
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
  // For now, using a hardcoded user ID. In a real app, this would come from authentication
  const userId = "demo-user-123";
  const { progress, loading: progressLoading } = useUserProgress(userId);
  
  // Fetch lessons for each module
  const { lessons: module1Lessons, loading: module1Loading } = useLessonsByModule(1);
  const { lessons: module2Lessons, loading: module2Loading } = useLessonsByModule(2);
  const { lessons: module3Lessons, loading: module3Loading } = useLessonsByModule(3);
  const { lessons: module4Lessons, loading: module4Loading } = useLessonsByModule(4);
  const { lessons: module5Lessons, loading: module5Loading } = useLessonsByModule(5);
  const { lessons: module6Lessons, loading: module6Loading } = useLessonsByModule(6);

  const isLoading = progressLoading || module1Loading || module2Loading || module3Loading || module4Loading || module5Loading || module6Loading;

  // Show loading state while data is being loaded
  if (isLoading) {
    return <ProgressLoadingScreen />;
  }


  // Generate modules data from API data
  const modules = [
    {
      id: 1,
      name: "JSL Basics",
      description: "Learn the fundamentals of Jamaican Sign Language",
      lessons: module1Lessons.length,
      completedLessons: module1Lessons.filter(lesson => lesson.completed).length,
      points: module1Lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xpReward, 0),
      status: (module1Lessons.length > 0 ? "in-progress" : "in-progress") as "completed" | "in-progress" | "locked",
      difficulty: "Beginner" as const,
      unlocked: true, // Level 1 is always unlocked
      position: { x: 100, y: 200 },
    },
    {
      id: 2,
      name: "Alphabet & Numbers",
      description: "Master the JSL alphabet and number signs",
      lessons: module2Lessons.length,
      completedLessons: module2Lessons.filter(lesson => lesson.completed).length,
      points: module2Lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xpReward, 0),
      status: (module2Lessons.length > 0 ? "in-progress" : "locked") as "completed" | "in-progress" | "locked",
      difficulty: "Beginner" as const,
      unlocked: true, // Level 2 is always unlocked
      position: { x: 300, y: 160 },
    },
    {
      id: 3,
      name: "Common Phrases",
      description: "Essential everyday phrases and greetings",
      lessons: module3Lessons.length,
      completedLessons: module3Lessons.filter(lesson => lesson.completed).length,
      points: module3Lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xpReward, 0),
      status: "locked" as "completed" | "in-progress" | "locked",
      difficulty: "Intermediate" as const,
      unlocked: false, // Level 3 is locked
      position: { x: 500, y: 200 },
    },
    {
      id: 4,
      name: "Emotions & Feelings",
      description: "Express emotions and feelings in JSL",
      lessons: module4Lessons.length,
      completedLessons: module4Lessons.filter(lesson => lesson.completed).length,
      points: module4Lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xpReward, 0),
      status: "locked" as "completed" | "in-progress" | "locked",
      difficulty: "Intermediate" as const,
      unlocked: false, // Level 4 is locked
      position: { x: 700, y: 160 },
    },
    {
      id: 5,
      name: "Commands & Actions",
      description: "Learn directional commands and action signs",
      lessons: module5Lessons.length,
      completedLessons: module5Lessons.filter(lesson => lesson.completed).length,
      points: module5Lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xpReward, 0),
      status: "locked" as "completed" | "in-progress" | "locked",
      difficulty: "Intermediate" as const,
      unlocked: false, // Level 5 is locked
      position: { x: 900, y: 200 },
    },
    {
      id: 6,
      name: "Advanced Conversations",
      description: "Master advanced conversational JSL",
      lessons: module6Lessons.length,
      completedLessons: module6Lessons.filter(lesson => lesson.completed).length,
      points: module6Lessons.filter(lesson => lesson.completed).reduce((sum, lesson) => sum + lesson.xpReward, 0),
      status: "locked" as "completed" | "in-progress" | "locked",
      difficulty: "Advanced" as const,
      unlocked: false, // Level 6 is locked
      position: { x: 1100, y: 160 },
    },
  ];

  const userStats = {
    totalPoints: progress?.xp || 0,
    currentStreak: progress?.streak || 0,
    level: progress?.level || 1,
    nextLevelPoints: progress?.xpToNextLevel || 100,
    badges: progress?.badges?.length || 0,
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
