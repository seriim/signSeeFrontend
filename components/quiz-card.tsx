"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Trophy, ArrowRight } from "lucide-react";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  xpReward: number;
  completed?: boolean;
  score?: number;
}

export function QuizCard({
  id,
  title,
  description,
  questions,
  duration,
  difficulty,
  xpReward,
  completed = false,
  score,
}: QuizCardProps) {
  const difficultyColors = {
    beginner: "bg-accent/20 text-accent",
    intermediate: "bg-primary/20 text-primary",
    advanced: "bg-secondary/20 text-secondary",
  };

  return (
    <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-lg">
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <Badge className={difficultyColors[difficulty]}>{difficulty}</Badge>
        </div>

        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        <div className="mb-4 flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>{questions} questions</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span>+{xpReward} XP</span>
          </div>
        </div>

        {completed && score !== undefined && (
          <div className="mb-4 rounded-lg border bg-accent/10 p-3">
            <p className="text-sm">
              <span className="font-semibold">Best Score:</span> {score}%
            </p>
          </div>
        )}

        <Link href={`/quiz/${id}`}>
          <Button className="w-full group-hover:bg-primary/90">
            {completed ? "Retake Quiz" : "Start Quiz"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
