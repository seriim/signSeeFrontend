"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Trophy, Clock, CheckCircle2, XCircle, ArrowRight, Home } from "lucide-react"

interface QuizQuestion {
  id: number
  type: "multiple-choice" | "gesture-recognition" | "true-false"
  question: string
  options?: string[]
  correctAnswer: string | number
  imageUrl?: string
  explanation: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What does this JSL sign mean?",
    options: ["Hello", "Goodbye", "Thank You", "Please"],
    correctAnswer: 0,
    imageUrl: "/person-signing-hello-in-sign-language.jpg",
    explanation: "This is the JSL sign for 'Hello' - raise your hand to your forehead and move it forward.",
  },
  {
    id: 2,
    type: "true-false",
    question: "JSL (Jamaican Sign Language) is the same as ASL (American Sign Language)",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False! JSL has its own unique grammar, vocabulary, and cultural context distinct from ASL.",
  },
  {
    id: 3,
    type: "multiple-choice",
    question: "Which sign is used to express gratitude?",
    options: ["Sorry", "Thank You", "Please", "Help"],
    correctAnswer: 1,
    imageUrl: "/person-signing-thank-you-in-sign-language.jpg",
    explanation: "Touch your chin with fingertips and move your hand forward to sign 'Thank You'.",
  },
  {
    id: 4,
    type: "gesture-recognition",
    question: "Perform the JSL sign for 'Hello'",
    correctAnswer: "hello",
    explanation: "Great job! You correctly performed the sign for 'Hello'.",
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "What category does the sign 'Please' belong to?",
    options: ["Greetings", "Polite Expressions", "Basic Responses", "Emotions"],
    correctAnswer: 1,
    explanation: "'Please' is a polite expression used to make requests courteously.",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)

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
    setTimeElapsed(0)
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

              <h1 className="mb-1 text-2xl font-bold">Quiz Complete!</h1>
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
                  <p className="text-2xl font-bold text-primary">+{score * 10}</p>
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
                  <Button className="w-full">Continue Learning</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
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
        <div className="mx-auto max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium">Quiz Progress</span>
              <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>

          {/* Question Card */}
          <Card className="border-2 border-primary/40 bg-white/50 p-4 rounded-2xl">
            <div className="mb-6">
              <Badge className="mb-4 bg-primary/10 text-primary">
                {question.type === "multiple-choice"
                  ? "Multiple Choice"
                  : question.type === "true-false"
                    ? "True/False"
                    : "Gesture Recognition"}
              </Badge>
              <h2 className="text-2xl font-bold text-balance">{question.question}</h2>
            </div>

            {/* Question Image */}
            {question.imageUrl && (
              <div className="mb-6 overflow-hidden rounded-lg border-2">
                <img
                  src={question.imageUrl || "/placeholder.svg"}
                  alt="JSL Sign"
                  className="h-64 w-full object-cover"
                />
              </div>
            )}

            {/* Answer Options */}
            {question.type !== "gesture-recognition" && question.options && (
              <div className="mb-6 space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
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
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      )}
                      {showResult && selectedAnswer === index && index !== question.correctAnswer && (
                        <XCircle className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Gesture Recognition */}
            {question.type === "gesture-recognition" && (
              <div className="mb-6">
                <Card className="border-2 border-dashed p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mb-4 text-muted-foreground">
                    Use your webcam to perform the sign. The AI will verify your gesture.
                  </p>
                  <Button variant="outline" className="bg-transparent">
                    Start Camera
                  </Button>
                </Card>
              </div>
            )}

            {/* Explanation */}
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

            {/* Action Buttons */}
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

          {/* Score Display */}
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
