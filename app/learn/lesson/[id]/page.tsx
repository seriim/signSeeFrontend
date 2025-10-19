"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GestureRecognition } from "@/components/gesture-recognition";
import { ArrowLeft, CheckCircle2, Star, Trophy, Sparkles } from "lucide-react";

// Mock lesson content
const lessonContent = {
  title: "Basic Greetings",
  moduleTitle: "JSL Basics",
  description: "Learn how to greet people in Jamaican Sign Language",
  points: 50,
  steps: [
    {
      id: 1,
      type: "instruction",
      title: "Hello",
      content:
        "To sign 'Hello' in JSL, raise your hand to your forehead with fingers together, then move it forward in a small wave motion.",
      videoUrl: "/person-signing-hello-in-sign-language.jpg",
      tip: "Keep your movements smooth and natural. Smile while signing!",
    },
    {
      id: 2,
      type: "practice",
      title: "Practice: Hello",
      content:
        "Now it's your turn! Use your webcam to practice signing 'Hello'.",
      instruction: "Position your hand at your forehead and wave forward",
    },
    {
      id: 3,
      type: "instruction",
      title: "Good Morning",
      content:
        "Sign 'Good Morning' by first signing 'GOOD' (thumb up, move forward), then 'MORNING' (arm bent at elbow, raise up like the sun rising).",
      videoUrl: "/person-signing-good-morning-in-sign-language.jpg",
      tip: "Think of the sun rising when you sign 'morning'",
    },
    {
      id: 4,
      type: "practice",
      title: "Practice: Good Morning",
      content: "Practice signing 'Good Morning' with your webcam.",
      instruction: "Sign GOOD then MORNING in sequence",
    },
    {
      id: 5,
      type: "instruction",
      title: "Goodbye",
      content:
        "To sign 'Goodbye', hold your hand up with palm facing out, then close your fingers down toward your palm in a waving motion.",
      videoUrl: "/person-signing-goodbye-in-sign-language.jpg",
      tip: "This is similar to a regular wave goodbye, but more deliberate",
    },
    {
      id: 6,
      type: "quiz",
      title: "Quick Check",
      content: "Which sign did we learn for greeting someone in the morning?",
      options: ["Hello", "Good Morning", "Goodbye", "Good Night"],
      correctAnswer: 1,
    },
  ],
};

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const step = lessonContent.steps[currentStep];
  const progress = ((currentStep + 1) / lessonContent.steps.length) * 100;

  const handleNext = () => {
    if (currentStep < lessonContent.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setPracticeCompleted(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setPracticeCompleted(false);
    }
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (step.type === "quiz" && index === step.correctAnswer) {
      setEarnedPoints(earnedPoints + 10);
    }
  };

  const handlePracticeSuccess = () => {
    setPracticeCompleted(true);
    setEarnedPoints(earnedPoints + 25);
  };

  const handleComplete = () => {
    alert(
      `Lesson completed! You earned ${lessonContent.points + earnedPoints} XP!`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/learn/module/1"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              {lessonContent.moduleTitle}
            </Link>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" />
              <span className="font-bold">SignSee</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">{lessonContent.title}</span>
              <span className="text-muted-foreground">
                {currentStep + 1} / {lessonContent.steps.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Lesson Content */}
          <Card className="mb-6 border-2 p-8">
            {/* Step Type Badge */}
            <div className="mb-4">
              <Badge
                variant={
                  step.type === "instruction"
                    ? "default"
                    : step.type === "practice"
                    ? "secondary"
                    : "outline"
                }
              >
                {step.type === "instruction" && "Instruction"}
                {step.type === "quiz" && "Quiz"}
              </Badge>
            </div>

            {/* Step Title */}
            <h2 className="mb-4 text-3xl font-bold">{step.title}</h2>

            {/* Instruction Step */}
            {step.type === "instruction" && (
              <>
                <p className="mb-6 text-lg text-muted-foreground">
                  {step.content}
                </p>

                {/* Video/Image Placeholder */}
                <div className="mb-6 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={step.videoUrl || "/placeholder.svg"}
                    alt={step.title}
                    className="h-auto w-full"
                  />
                </div>

                {/* Tip */}
                {step.tip && (
                  <Card className="border-l-4 border-l-accent bg-accent/5 p-4">
                    <div className="flex items-start gap-3">
                      <div>
                        <p className="font-semibold text-accent">Pro Tip</p>
                        <p className="text-sm text-muted-foreground">
                          {step.tip}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* Practice Step */}
            {step.type === "practice" && (
              <>
                <p className="mb-6 text-lg text-muted-foreground">
                  {step.content}
                </p>

                <GestureRecognition
                  targetSign={step.title.replace("Practice: ", "")}
                  onSuccess={handlePracticeSuccess}
                  onSkip={() => setPracticeCompleted(true)}
                />

                {practiceCompleted && (
                  <Card className="mt-6 border-l-4 border-l-success bg-success/5 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-semibold text-success">
                          Practice Complete!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You earned 25 bonus XP
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}

            {/* Quiz Step */}
            {step.type === "quiz" && (
              <>
                <p className="mb-6 text-lg text-muted-foreground">
                  {step.content}
                </p>

                <div className="space-y-3">
                  {step.options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={showFeedback}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        selectedAnswer === index
                          ? showFeedback && index === step.correctAnswer
                            ? "border-success bg-success/10"
                            : showFeedback
                            ? "border-destructive bg-destructive/10"
                            : "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      } ${
                        showFeedback ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showFeedback && index === step.correctAnswer && (
                          <CheckCircle2 className="h-5 w-5 text-success" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <Card
                    className={`mt-6 border-l-4 p-4 ${
                      selectedAnswer === step.correctAnswer
                        ? "border-l-success bg-success/5"
                        : "border-l-destructive bg-destructive/5"
                    }`}
                  >
                    <p className="font-semibold">
                      {selectedAnswer === step.correctAnswer
                        ? "Correct!"
                        : "Not quite right"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedAnswer === step.correctAnswer
                        ? "Great job! You earned 10 bonus XP."
                        : "The correct answer is: " +
                          step.options?.[step.correctAnswer || 0]}
                    </p>
                  </Card>
                )}
              </>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-primary" />
              <span className="font-semibold text-primary">
                {lessonContent.points + earnedPoints} XP
              </span>
            </div>

            {currentStep === lessonContent.steps.length - 1 ? (
              <Button size="lg" onClick={handleComplete}>
                <Trophy className="mr-2 h-5 w-5" />
                Complete Lesson
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleNext}
                disabled={
                  step.type === "practice" &&
                  !practiceCompleted &&
                  currentStep !== 0
                }
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
