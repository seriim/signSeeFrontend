"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Hand, BookOpen, Video, Trophy, User } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/translator", label: "Translator", icon: Video },
    { href: "/practice", label: "Practice", icon: Hand },
    { href: "/dashboard", label: "Dashboard", icon: Trophy },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Hand className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SignSee</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href

            return (
              <Button 
                key={link.href} 
                variant={isActive ? "default" : "ghost"} 
                asChild
                className={isActive ? "rounded-full bg-primary/90 hover:bg-primary" : "rounded-full hover:bg-primary/10"}
              >
                <Link href={link.href} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            )
          })}
        </div>

        <Button variant="outline" size="icon" className="rounded-full border-primary/30 hover:bg-primary/10">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}
