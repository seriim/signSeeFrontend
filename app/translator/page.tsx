"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SignDisplay } from "@/components/sign-display"
import { Target, Search, Sparkles, BookOpen, History, Star } from "lucide-react"

// Mock JSL dictionary
const jslDictionary: Record<string, { description: string; category: string; imageUrl: string }> = {
  hello: {
    description: "Raise your hand to your forehead with fingers together, then move it forward in a wave motion",
    category: "Greetings",
    imageUrl: "/person-signing-hello-in-sign-language.jpg",
  },
  goodbye: {
    description: "Hold your hand up with palm facing out, then close your fingers down toward your palm",
    category: "Greetings",
    imageUrl: "/person-signing-goodbye-in-sign-language.jpg",
  },
  "thank you": {
    description: "Touch your chin with your fingertips and move your hand forward",
    category: "Polite Expressions",
    imageUrl: "/person-signing-thank-you-in-sign-language.jpg",
  },
  please: {
    description: "Circle your hand on your chest in a clockwise motion",
    category: "Polite Expressions",
    imageUrl: "/person-signing-please-in-sign-language.jpg",
  },
  yes: {
    description: "Make a fist and nod it up and down like a head nodding",
    category: "Basic Responses",
    imageUrl: "/person-signing-yes-in-sign-language.jpg",
  },
  no: {
    description: "Extend your index and middle fingers, then close them to your thumb twice",
    category: "Basic Responses",
    imageUrl: "/person-signing-no-in-sign-language.jpg",
  },
  help: {
    description: "Place your fist on your open palm and lift both hands up",
    category: "Common Words",
    imageUrl: "/person-signing-help-in-sign-language.jpg",
  },
  sorry: {
    description: "Make a fist and circle it on your chest",
    category: "Polite Expressions",
    imageUrl: "/person-signing-sorry-in-sign-language.jpg",
  },
  love: {
    description: "Cross your arms over your chest with fists closed",
    category: "Emotions",
    imageUrl: "/person-signing-love-in-sign-language.jpg",
  },
  family: {
    description: "Make F handshape with both hands and circle them around each other",
    category: "Relationships",
    imageUrl: "/person-signing-family-in-sign-language.jpg",
  },
}

const popularWords = ["hello", "thank you", "please", "yes", "no", "help", "sorry", "love"]

const recentSearches = ["hello", "thank you", "goodbye"]

export default function TranslatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [translationResults, setTranslationResults] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim()
    setSearchQuery(query)

    if (normalizedQuery === "") {
      setTranslationResults([])
      setSelectedWord(null)
      return
    }

    // Split query into words
    const words = normalizedQuery.split(/\s+/)
    const results: string[] = []

    // Find matching signs for each word
    words.forEach((word) => {
      if (jslDictionary[word]) {
        results.push(word)
      }
    })

    setTranslationResults(results)
    if (results.length > 0) {
      setSelectedWord(results[0])
    } else {
      setSelectedWord(null)
    }
  }

  const handleQuickSearch = (word: string) => {
    setSearchQuery(word)
    handleSearch(word)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-6 w-6 text-primary" />
            SignSee
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/learn">
              <Button variant="ghost">Learn</Button>
            </Link>
            <Link href="/practice">
              <Button variant="ghost">Practice</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            <Sparkles className="mr-1 h-3 w-3" />
            Instant Translation
          </Badge>
          <h1 className="mb-4 text-4xl font-bold text-balance md:text-5xl">English to JSL Translator</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Type any word or phrase to see its Jamaican Sign Language translation
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column - Search & Results */}
            <div className="lg:col-span-2">
              {/* Search Input */}
              <Card className="mb-6 border-2 p-6">
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium">Enter text to translate</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Type a word or phrase..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 text-lg"
                    />
                  </div>
                </div>

                {/* Popular Words */}
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">Popular words:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularWords.map((word) => (
                      <Button
                        key={word}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickSearch(word)}
                        className="capitalize"
                      >
                        {word}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Translation Results */}
              {translationResults.length > 0 ? (
                <Card className="border-2 p-6">
                  <h3 className="mb-4 text-xl font-semibold">Translation Results</h3>
                  <div className="space-y-3">
                    {translationResults.map((word, index) => {
                      const sign = jslDictionary[word]
                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedWord(word)}
                          className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                            selectedWord === word
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="mb-1 text-lg font-semibold capitalize">{word}</p>
                              <p className="text-sm text-muted-foreground">{sign.description}</p>
                            </div>
                            <Badge variant="secondary">{sign.category}</Badge>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </Card>
              ) : searchQuery && translationResults.length === 0 ? (
                <Card className="border-2 border-dashed p-12 text-center">
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">No translation found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find a JSL sign for "{searchQuery}". Try searching for individual words or check our
                    learning modules.
                  </p>
                  <Link href="/learn">
                    <Button className="mt-4 bg-transparent" variant="outline">
                      Browse Learning Modules
                    </Button>
                  </Link>
                </Card>
              ) : (
                <Card className="border-2 border-dashed p-12 text-center">
                  <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">Start translating</h3>
                  <p className="text-muted-foreground">
                    Enter a word or phrase above to see its JSL translation with visual demonstrations
                  </p>
                </Card>
              )}
            </div>

            {/* Right Column - Sign Display & Info */}
            <div className="space-y-6">
              {/* Sign Display */}
              {selectedWord && jslDictionary[selectedWord] && (
                <SignDisplay word={selectedWord} signData={jslDictionary[selectedWord]} />
              )}

              {/* Recent Searches */}
              <Card className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <History className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(word)}
                      className="flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all hover:border-primary hover:bg-primary/5"
                    >
                      <span className="capitalize">{word}</span>
                      <Search className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Dictionary Stats */}
              <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Dictionary Stats</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Signs</span>
                    <span className="font-semibold">{Object.keys(jslDictionary).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categories</span>
                    <span className="font-semibold">
                      {new Set(Object.values(jslDictionary).map((s) => s.category)).size}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Your Searches</span>
                    <span className="font-semibold">{recentSearches.length}</span>
                  </div>
                </div>
              </Card>

              {/* Help Card */}
              <Card className="border-l-4 border-l-primary bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="mb-1 font-semibold text-primary">Pro Tip</p>
                    <p className="text-sm text-muted-foreground">
                      For best results, search for individual words. Complex phrases may need to be broken down into
                      separate signs.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
