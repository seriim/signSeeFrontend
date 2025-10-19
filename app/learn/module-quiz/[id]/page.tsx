"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Trophy, Clock, CheckCircle2, XCircle, ArrowRight, Home } from "lucide-react"
import { getModuleQuiz } from "@/lib/module-quizzes"

export default function ModuleQuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const moduleId = Number.parseInt(id)
  const quizQuestions = getModuleQuiz(moduleId)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [quizComplete, setQuizComplete] = useState(false)

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === question.correctAnswer
    setShowResult(true)
    setAnswers([...answers, isCorrect])

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
    setQuizComplete(false)
  }

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    const passed = percentage >= 70

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
        <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105">
              <Target className="h-6 w-6 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignSee</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 border-primary/40 bg-white/50 p-6 text-center rounded-2xl">
              <div
                className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                  passed ? "bg-accent/20" : "bg-secondary/20"
                }`}
              >
                <Trophy className={`h-8 w-8 ${passed ? "text-accent" : "text-secondary"}`} />
              </div>

              <h1 className="mb-1 text-2xl font-bold">Module Quiz Complete!</h1>
              <p className="mb-4 text-sm text-muted-foreground">
                {passed ? "Congratulations! You passed!" : "Keep practicing to improve your score!"}
              </p>

              <div className="mb-4 grid gap-3 md:grid-cols-3">
                <Card className="border-2 border-primary/40 bg-white/50 p-3 rounded-2xl">
                  <p className="mb-0.5 text-xs text-muted-foreground">Score</p>
                  <p className="text-2xl font-bold text-primary">
                    {score}/{quizQuestions.length}
                  </p>
                </Card>
                <Card className="border-2 border-accent bg-gradient-to-b from-accent/15 to-accent/5 p-3 rounded-2xl">
                  <p className="mb-0.5 text-xs text-muted-foreground">Percentage</p>
                  <p className="text-2xl font-bold text-accent">{percentage}%</p>
                </Card>
                <Card className="border-2 border-primary/40 bg-white/50 p-3 rounded-2xl">
                  <p className="mb-0.5 text-xs text-muted-foreground">XP Earned</p>
                  <p className="text-2xl font-bold text-primary">+{score * 50}</p>
                </Card>
              </div>

              <div className="mb-6 space-y-3">
                <h3 className="font-semibold">Question Results</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {answers.map((correct, index) => (
                    <div
                      key={index}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                        correct
                          ? "border-accent bg-accent/20 text-accent"
                          : "border-secondary bg-secondary/20 text-secondary"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleRestartQuiz} variant="outline" className="flex-1 bg-transparent">
                  Retry Quiz
                </Button>
                <Link href="/learn" className="flex-1">
                  <Button className="w-full">Back to Learning Path</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Quiz Not Found</h2>
          <Link href="/learn">
            <Button>Back to Learning Path</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/3 to-accent/3">
      <header className="border-b-2 border-primary bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105">
            <Target className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignSee</span>
          </Link>
          <Badge variant="outline" className="rounded-full border-primary/30 bg-primary/10">
            <Clock className="mr-1 h-3 w-3" />
            Question {currentQuestion + 1}/{quizQuestions.length}
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">Module Quiz Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>

          <Card className="border-2 border-primary/40 bg-white/50 p-6 rounded-2xl">
            <div className="mb-6">
              <Badge className="mb-4 bg-primary/10 text-primary">Hand Sign Recognition</Badge>
              <h2 className="text-2xl font-bold text-balance">{question.question}</h2>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg border-2">
              <img
                src={question.imageUrl || "/placeholder.svg"}
                alt="Hand sign"
                className="h-64 w-full object-cover"
              />
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`rounded-lg border-2 overflow-hidden transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === question.correctAnswer
                          ? "border-accent bg-accent/20"
                          : "border-secondary bg-secondary/20"
                        : "border-primary bg-primary/10"
                      : showResult && index === question.correctAnswer
                        ? "border-accent bg-accent/20"
                        : "border-border hover:border-primary"
                  } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="space-y-2 p-3">
                    <img
                      src={option.imageUrl || "/placeholder.svg"}
                      alt={option.label}
                      className="h-32 w-full object-cover rounded"
                    />
                    <p className="font-medium text-sm text-center">{option.label}</p>
                    {showResult && index === question.correctAnswer && (
                      <div className="flex justify-center">
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      </div>
                    )}
                    {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                      <div className="flex justify-center">
                        <XCircle className="h-5 w-5 text-secondary" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div
                className={`mb-6 rounded-lg border-2 p-4 ${
                  selectedAnswer === question.correctAnswer
                    ? "border-accent/50 bg-accent/10"
                    : "border-secondary/50 bg-secondary/10"
                }`}
              >
                <p className="mb-1 font-semibold">
                  {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Link href="/learn" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Home className="mr-2 h-4 w-4" />
                  Exit Quiz
                </Button>
              </Link>
              {!showResult ? (
                <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className="flex-1">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="flex-1">
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "View Results"
                  )}
                </Button>
              )}
            </div>
          </Card>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <span>
                Correct: <span className="font-semibold">{score}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-secondary" />
              <span>
                Incorrect: <span className="font-semibold">{answers.filter((a) => !a).length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
