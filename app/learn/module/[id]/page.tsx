"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Star,
  Trophy,
  Target,
  Sparkles,
  Play,
  BookOpen,
} from "lucide-react";
import { getLessonsForModule } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-progress";
import type { Lesson, LessonContent } from "@/lib/types";

// Module metadata
const moduleMetadata = {
  1: {
    title: "JSL Basics",
    description: "Learn the fundamentals of Jamaican Sign Language",
  },
  2: {
    title: "Alphabet & Numbers",
    description: "Master the JSL alphabet and number signs",
  },
  3: {
    title: "Numbers 1-20",
    description: "Learn to sign numbers from 1 to 20",
  },
  4: {
    title: "Common Phrases",
    description: "Everyday phrases for basic communication",
  },
};

export default function ModulePage({ params }: { params: { id: string } }) {
  const moduleId = Number.parseInt(params.id);
  const metadata = moduleMetadata[moduleId as keyof typeof moduleMetadata];
  const { completeLesson, completeModule, progress, isLoaded } = useProgress();

  // Get lessons for this module
  const lessons = getLessonsForModule(moduleId);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Get module progress from global state
  const moduleProgress = progress.modules.find((m) => m.id === moduleId);
  const isModuleCompleted = moduleProgress?.completed || false;

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

  if (!metadata) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Module Not Found</h2>
          <Link href="/learn">
            <Button>Back to Learning Path</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex];
  const lessonContent = currentLesson.content || [];
  const currentStep = lessonContent[currentContentIndex];

  const totalSteps = lessonContent.length;
  const progressPercentage = ((currentContentIndex + 1) / totalSteps) * 100;
  const allLessonsCompleted = completedLessons.length === lessons.length;
  const totalXP = lessons.reduce((sum, lesson) => sum + lesson.xpReward, 0);
  const completedXP = completedLessons.reduce((sum, id) => {
    const lesson = lessons.find((l) => l.id === id);
    return sum + (lesson?.xpReward || 0);
  }, 0);

  const handleNextStep = () => {
    if (currentContentIndex < totalSteps - 1) {
      setCurrentContentIndex(currentContentIndex + 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    } else if (currentLessonIndex < lessons.length - 1) {
      // Move to next lesson
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
        // Mark lesson as completed in global progress
        completeLesson(moduleId, currentLesson.id, currentLesson.xpReward);
      }
      setCurrentLessonIndex(currentLessonIndex + 1);
      setCurrentContentIndex(0);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    } else {
      // All lessons completed, mark current lesson as completed
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
        // Mark lesson as completed in global progress
        completeLesson(moduleId, currentLesson.id, currentLesson.xpReward);
      }
      // Don't automatically show quiz - let user choose when to take it
    }
  };

  const handlePreviousStep = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    } else if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentContentIndex(lessonContent.length - 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
    }
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    setQuizAnswered(true);
  };

  const handleModuleComplete = () => {
    // Mark module as completed in global progress
    completeModule(moduleId);
    // Navigate back to learn page to see updated progress
    window.location.href = "/learn";
  };

  const canProceed = () => {
    if (!currentStep) return false;
    if (currentStep.type === "instruction") return true;
    if (currentStep.type === "quiz") return quizAnswered;
    return false;
  };

  if (showQuiz && allLessonsCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <header className="border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link
              href="/learn"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Learning Path
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-success/30 bg-gradient-to-br from-success/10 to-success/5 p-8 text-center">
              <Trophy className="mx-auto mb-4 h-16 w-16 text-success" />
              <h2 className="mb-2 text-3xl font-bold">Module Complete! </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                You've completed all lessons in {metadata.title}
              </p>

              <div className="mb-8 rounded-lg bg-white/50 p-6">
                <p className="mb-2 text-sm text-muted-foreground">
                  Total XP Earned
                </p>
                <p className="text-4xl font-bold text-primary">{totalXP} XP</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleModuleComplete}
                  size="lg"
                  className="w-full bg-success hover:bg-success/80 text-white"
                >
                  <Trophy className="mr-2 h-5 w-5" />
                  Complete Module & Continue
                </Button>
                <Link href={`/learn/module-quiz/${moduleId}`}>
                  <Button size="lg" variant="outline" className="w-full">
                    <Trophy className="mr-2 h-5 w-5" />
                    Take Module Quiz First
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/learn"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>

            <Badge variant="default" className="text-sm">
              <Star className="mr-1 h-3 w-3" />
              {completedXP} / {totalXP} XP
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{currentLesson.title}</span>
              <span className="text-muted-foreground">
                {currentContentIndex + 1} / {totalSteps}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {allLessonsCompleted && !showQuiz ? (
              <Card className="border-2 p-8 max-w-2xl mx-auto text-center">
                <div className="mb-6">
                  <Trophy className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">
                    Module Complete! 🎉
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Congratulations! You've completed all {lessons.length}{" "}
                    lessons in {metadata.title}
                  </p>
                  <div className="bg-accent/10 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-accent mb-1">
                      Total XP Earned
                    </p>
                    <p className="text-2xl font-bold text-accent">
                      {totalXP} XP
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowQuiz(true)}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/80 text-white"
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Take Module Quiz
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentLessonIndex(0);
                      setCurrentContentIndex(0);
                      setCompletedLessons([]);
                    }}
                    size="lg"
                    className="w-full"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Review Lessons
                  </Button>
                </div>
              </Card>
            ) : (
              currentStep && (
                <Card className="border-2 p-6 max-w-2xl mx-auto">
                  {/* Step Badge */}
                  <div className="mb-2">
                    <Badge
                      variant={
                        currentStep.type === "instruction"
                          ? "default"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {currentStep.type === "instruction" && "Instruction"}
                      {currentStep.type === "quiz" && "Quick Check"}
                    </Badge>
                  </div>

                  {/* Step Title */}
                  <h2 className="mb-4 text-2xl font-bold">
                    {currentStep.title}
                  </h2>

                  {/* Instruction Step */}
                  {currentStep.type === "instruction" && (
                    <div className="space-y-4">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {currentStep.description}
                      </p>

                      {/* Video/Image */}
                      <div className="overflow-hidden rounded-xl bg-muted shadow-sm">
                        <img
                          src={currentStep.videoUrl || "/placeholder.svg"}
                          alt={currentStep.title}
                          className="h-48 w-full object-cover"
                        />
                      </div>

                      {/* Tip */}
                      {currentStep.tip && (
                        <Card className="border-l-4 border-l-accent bg-accent/5 p-4">
                          <div className="flex items-start gap-3">
                            <Sparkles className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                            <div>
                              <p className="text-sm font-semibold text-accent">
                                Pro Tip
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {currentStep.tip}
                              </p>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  )}

                  {/* Quiz Step */}
                  {currentStep.type === "quiz" && (
                    <div className="space-y-4">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {currentStep.description}
                      </p>

                      <div className="space-y-3">
                        {currentStep.options?.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            disabled={quizAnswered}
                            className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                              selectedAnswer === index
                                ? quizAnswered &&
                                  index === currentStep.correctAnswer
                                  ? "border-success bg-success/10"
                                  : quizAnswered
                                  ? "border-destructive bg-destructive/10"
                                  : "border-primary bg-primary/10"
                                : "border-border hover:border-primary"
                            } ${
                              quizAnswered
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">
                                {option}
                              </span>
                              {quizAnswered &&
                                index === currentStep.correctAnswer && (
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {quizAnswered && (
                        <Card
                          className={`border-l-4 p-4 ${
                            selectedAnswer === currentStep.correctAnswer
                              ? "border-l-success bg-success/5"
                              : "border-l-destructive bg-destructive/5"
                          }`}
                        >
                          <p className="text-sm font-semibold">
                            {selectedAnswer === currentStep.correctAnswer
                              ? "Correct!"
                              : "Not quite right"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedAnswer === currentStep.correctAnswer
                              ? "Great job!"
                              : "The correct answer is: " +
                                currentStep.options?.[
                                  currentStep.correctAnswer || 0
                                ]}
                          </p>
                        </Card>
                      )}
                    </div>
                  )}
                </Card>
              )
            )}

            {/* Navigation - Only show when not all lessons completed */}
            {!allLessonsCompleted && (
              <div className="mt-6 flex items-center justify-between gap-4 max-w-2xl mx-auto">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={
                    currentLessonIndex === 0 && currentContentIndex === 0
                  }
                  size="lg"
                  className="px-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  onClick={handleNextStep}
                  disabled={!canProceed()}
                  size="lg"
                  className="px-6"
                >
                  {currentLessonIndex === lessons.length - 1 &&
                  currentContentIndex === totalSteps - 1
                    ? "Complete Module"
                    : "Next"}
                </Button>
              </div>
            )}
          </div>

          {/* Lesson Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-2 p-4 sticky top-24 max-w-sm mx-auto lg:mx-0">
              <h3 className="mb-3 font-semibold text-sm">Lesson Progress</h3>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setCurrentLessonIndex(index);
                      setCurrentContentIndex(0);
                      setSelectedAnswer(null);
                      setQuizAnswered(false);
                    }}
                    className={`w-full rounded-lg border-2 p-3 text-left text-xs transition-all ${
                      index === currentLessonIndex
                        ? "border-primary bg-primary/10"
                        : completedLessons.includes(lesson.id)
                        ? "border-success/30 bg-success/5 hover:border-success/50"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {completedLessons.includes(lesson.id) ? (
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                      ) : (
                        <div
                          className={`h-4 w-4 rounded-full flex-shrink-0 ${
                            index === currentLessonIndex
                              ? "bg-primary"
                              : "bg-muted"
                          }`}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {lesson.duration} min
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Module Completion Section */}
              {allLessonsCompleted && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="mb-3">
                      <Trophy className="h-8 w-8 text-accent mx-auto mb-2" />
                      <h4 className="font-semibold text-sm text-accent">
                        Module Complete!
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        All {lessons.length} lessons completed
                      </p>
                    </div>
                    <Link href={`/learn/module-quiz/${moduleId}`}>
                      <Button
                        size="sm"
                        className="w-full bg-accent hover:bg-accent/80 text-white"
                      >
                        <Trophy className="mr-2 h-3 w-3" />
                        Take Module Quiz
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
