import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Sparkles,
  BookOpen,
  Brain,
  Video,
  Trophy,
  Zap,
  Users,
  ArrowRight,
  Hand,
  Target,
  Flame,
} from "lucide-react";

export default function HomePage() {
  const links = [
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/translator", label: "Translator", icon: Video },
    { href: "/practice", label: "Practice", icon: Hand },
    { href: "/dashboard", label: "Dashboard", icon: Trophy },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        {/*<div className="absolute inset-0 bg-[url('/abstract-hand-gesture-pattern.jpg')] opacity-5 bg-cover bg-center" />*/}

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            {/*<Badge
              className="mb-6 bg-primary text-primary-foreground"
              variant="default"
            >
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Learning
            </Badge>*/}

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance md:text-7xl">
              Learn{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Jamaican Sign Language
              </span>
            </h1>

            <p className="mb-8 text-xl text-muted-foreground text-pretty md:text-2xl">
              Bridging communication one sign at a time. Master JSL through
              gamified lessons, AI gesture recognition, and interactive
              challenges.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link href="/learn">Start Learning Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg bg-transparent"
                asChild
              >
                <Link href="/translator">Try Translator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-balance">
            Everything You Need to Master ASL
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Powerful features designed to make learning sign language fun and
            effective
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative overflow-hidden border-2 p-6  ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Gamified Learning</h3>
            <p className="text-muted-foreground">
              Progress through levels, earn badges, and maintain streaks.
              Learning JSL has never been this engaging.
            </p>
          </Card>

          <Card className="group relative overflow-hidden border-2 p-6  ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Recognition</h3>
            <p className="text-muted-foreground">
              Practice with your webcam. Our AI verifies your hand gestures in
              real-time using MediaPipe technology.
            </p>
          </Card>

          <Card className="group relative overflow-hidden border-2 p-6  ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Sign Translator</h3>
            <p className="text-muted-foreground">
              Type any word or phrase to instantly see its JSL animation.
              Perfect for quick lookups and practice.
            </p>
          </Card>

          <Card className="group relative overflow-hidden border-2 p-6  ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Quizzes & Tests</h3>
            <p className="text-muted-foreground">
              Test your knowledge with interactive quizzes. Track your progress
              and identify areas for improvement.
            </p>
          </Card>

          <Card className="group relative overflow-hidden border-2 p-6  ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Flame className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Streak System</h3>
            <p className="text-muted-foreground">
              Build daily learning habits. Maintain your streak and unlock
              special rewards and achievements.
            </p>
          </Card>

          <Card className="group relative overflow-hidden border-2 p-6 transition-all ">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Hand className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              Structured Curriculum
            </h3>
            <p className="text-muted-foreground">
              Learn at your own pace with our carefully designed curriculum from
              basics to advanced conversations.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-12 text-center ">
          <div className="relative z-10">
            <h2 className="mb-4 text-4xl font-bold text-balance">
              Ready to Bridge the Communication Gap?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground text-pretty">
              Join thousands of learners making JSL accessible to everyone in
              Jamaica
            </p>
            <Button size="lg" className="text-lg" asChild>
              <Link href="/learn">Start Your Journey Today</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 ">
            <div className="flex items-center gap-2">
              <img className="w-[100px]" src="/logo.png" alt="logo" />
              <span className="text-xl font-bold">SignSee</span>
            </div>
            <div className="flex gap-5 justify-center">
              <ul className="flex text-center gap-5">
                {links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center justify-center gap-5"
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="hidden lg:block">
              Bridging communication one sign at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
