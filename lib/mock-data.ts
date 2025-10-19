import type { Lesson, Sign, UserProgress, Badge } from "./types"

// DEPRECATED: This file contains mock data that has been replaced by Supabase API calls
// Keep this file for reference, but the app now uses real data from the backend

export const mockSigns: Sign[] = [
  {
    id: "1",
    word: "Hello",
    category: "greetings",
    videoUrl: "/jsl-hello-sign.jpg",
    thumbnailUrl: "/jsl-hello-sign.jpg",
    description: "A friendly greeting gesture",
    difficulty: "beginner",
  },
  {
    id: "2",
    word: "Thank You",
    category: "greetings",
    videoUrl: "/jsl-thank-you-sign.jpg",
    thumbnailUrl: "/jsl-thank-you-sign.jpg",
    description: "Express gratitude",
    difficulty: "beginner",
  },
  {
    id: "3",
    word: "Please",
    category: "greetings",
    videoUrl: "/jsl-please-sign.jpg",
    thumbnailUrl: "/jsl-please-sign.jpg",
    description: "Polite request gesture",
    difficulty: "beginner",
  },
]

// Module 1: JSL Basics
const module1Lessons: Lesson[] = [
  {
    id: "1-1",
    name: "Basic Greetings",
    description: "Learn essential greeting signs to start conversations",
    moduleId: 1,
    order: 1,
    category: "basics",
    difficulty: "beginner",
    duration: 15,
    signs: mockSigns,
    completed: false,
    locked: false,
    xpReward: 100,
    content: [
      {
        id: "1-1-1",
        type: "instruction",
        title: "Hello",
        description: "To sign 'Hello' in JSL, raise your hand to your forehead with fingers together, then move it forward in a small wave motion.",
        videoUrl: "/jsl-hello-sign.jpg",
        tip: "Keep your movements smooth and natural. Smile while signing!",
      },
      {
        id: "1-1-2",
        type: "instruction",
        title: "Thank You",
        description: "Sign 'Thank You' by bringing your open hand from your chin downward and outward in a smooth motion.",
        videoUrl: "/jsl-thank-you-sign.jpg",
        tip: "This gesture shows gratitude and appreciation",
      },
      {
        id: "1-1-3",
        type: "quiz",
        title: "Quick Check",
        description: "Which sign did we learn for expressing gratitude?",
        options: ["Hello", "Thank You", "Please", "Goodbye"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "1-2",
    name: "Polite Expressions",
    description: "Learn polite signs for respectful communication",
    moduleId: 1,
    order: 2,
    category: "basics",
    difficulty: "beginner",
    duration: 12,
    signs: [
      {
        id: "please",
        word: "Please",
        category: "greetings",
        videoUrl: "/jsl-please-sign.jpg",
        thumbnailUrl: "/jsl-please-sign.jpg",
        description: "Polite request gesture",
        difficulty: "beginner",
      },
      {
        id: "excuse-me",
        word: "Excuse Me",
        category: "greetings",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        thumbnailUrl: "/abstract-hand-gesture-pattern.jpg",
        description: "Polite attention-getting gesture",
        difficulty: "beginner",
      }
    ],
    completed: false,
    locked: false,
    xpReward: 80,
    content: [
      {
        id: "1-2-1",
        type: "instruction",
        title: "Please",
        description: "To sign 'Please', make a circular motion on your chest with your open hand, moving from left to right.",
        videoUrl: "/jsl-please-sign.jpg",
        tip: "This polite gesture is essential for respectful communication",
      },
      {
        id: "1-2-2",
        type: "instruction",
        title: "Excuse Me",
        description: "Sign 'Excuse Me' by gently tapping your chest with your fingertips.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Use this when you need to get someone's attention politely",
      },
      {
        id: "1-2-3",
        type: "quiz",
        title: "Polite Quiz",
        description: "What gesture do you use to sign 'Please'?",
        options: ["Wave hand", "Circular motion on chest", "Tap chest", "Point forward"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "1-3",
    name: "Goodbye & Farewell",
    description: "Learn how to say goodbye in JSL",
    moduleId: 1,
    order: 3,
    category: "basics",
    difficulty: "beginner",
    duration: 10,
    signs: [
      {
        id: "goodbye",
        word: "Goodbye",
        category: "greetings",
        videoUrl: "/person-signing-goodbye-in-sign-language.jpg",
        thumbnailUrl: "/person-signing-goodbye-in-sign-language.jpg",
        description: "A farewell gesture",
        difficulty: "beginner",
      }
    ],
    completed: false,
    locked: false,
    xpReward: 70,
    content: [
      {
        id: "1-3-1",
        type: "instruction",
        title: "Goodbye",
        description: "To sign 'Goodbye', hold your hand up with palm facing out, then close your fingers down toward your palm in a waving motion.",
        videoUrl: "/person-signing-goodbye-in-sign-language.jpg",
        tip: "This is similar to a regular wave goodbye, but more deliberate",
      },
      {
        id: "1-3-2",
        type: "quiz",
        title: "Farewell Quiz",
        description: "How do you sign 'Goodbye' in JSL?",
        options: ["Wave hand forward", "Close fingers to palm", "Both hands up", "Point away"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "1-4",
    name: "Introduction to JSL",
    description: "Get started with the basics of Jamaican Sign Language",
    moduleId: 1,
    order: 4,
    category: "basics",
    difficulty: "beginner",
    duration: 8,
    signs: [
      {
        id: "welcome",
        word: "Welcome",
        category: "greetings",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        thumbnailUrl: "/abstract-hand-gesture-pattern.jpg",
        description: "A welcoming gesture",
        difficulty: "beginner",
      }
    ],
    completed: false,
    locked: false,
    xpReward: 50,
    content: [
      {
        id: "1-4-1",
        type: "instruction",
        title: "Welcome to JSL",
        description: "Jamaican Sign Language (JSL) is the primary sign language used in Jamaica. It's a beautiful and expressive way to communicate.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Take your time to learn each sign properly",
      },
      {
        id: "1-4-2",
        type: "instruction",
        title: "Welcome Sign",
        description: "To sign 'Welcome', open your arms wide in a welcoming gesture, palms facing up.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "This gesture shows hospitality and friendliness",
      },
    ],
  },
]

// Module 2: Alphabet & Numbers
const module2Lessons: Lesson[] = [
  {
    id: "2-1",
    name: "JSL Alphabet A-F",
    description: "Learn the first six letters of the JSL alphabet",
    moduleId: 2,
    order: 1,
    category: "alphabet",
    difficulty: "beginner",
    duration: 20,
    signs: [],
    completed: false,
    locked: false,
    xpReward: 120,
    content: [
      {
        id: "2-1-1",
        type: "instruction",
        title: "Letters A-F",
        description: "Learn the first six letters of the JSL alphabet using hand shapes and positions.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Pay attention to hand shape and position for each letter",
      },
      {
        id: "2-1-2",
        type: "quiz",
        title: "Alphabet Quiz A-F",
        description: "Which hand shape represents the letter 'E'?",
        options: ["Flat hand", "Closed fist", "Open hand with fingers spread", "Curved hand"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2-2",
    name: "JSL Alphabet G-L",
    description: "Continue with letters G through L",
   
    moduleId: 2,
    order: 2, category: "alphabet",
    difficulty: "beginner",
    duration: 18,
    signs: [],
    completed: false,
    locked: false,
    xpReward: 110,
    content: [
      {
        id: "2-2-1",
        type: "instruction",
        title: "Letters G-L",
        description: "Continue with letters G through L, building on the hand shapes you've learned.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Notice how some letters are similar but with slight variations",
      },
      {
        id: "2-2-2",
        type: "quiz",
        title: "Alphabet Quiz G-L",
        description: "What is the main difference between letters G and H?",
        options: ["Hand position", "Finger count", "Movement", "Size"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: "2-3",
    name: "Numbers 1-10",
    description: "Learn to sign numbers from 1 to 10",
   
    moduleId: 2,
    order: 3, category: "numbers",
    difficulty: "beginner",
    duration: 15,
    signs: [],
    completed: false,
    locked: false,
    xpReward: 100,
    content: [
      {
        id: "2-3-1",
        type: "instruction",
        title: "Numbers 1-10",
        description: "Learn to sign numbers from 1 to 10 using finger counting.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Numbers 1-5 use one hand, while 6-10 use both hands",
      },
      {
        id: "2-3-2",
        type: "quiz",
        title: "Numbers Quiz 1-10",
        description: "How do you sign the number 7?",
        options: ["One hand with 7 fingers", "Both hands specific way", "Closed fist", "Open hand"],
        correctAnswer: 1,
      },
    ],
  },
]

// Module 3: Common Phrases
const module3Lessons: Lesson[] = [
  {
    id: "3-1",
    name: "How are you?",
    description: "Learn to ask 'How are you?' in JSL",
   
    moduleId: 3,
    order: 1, category: "phrases",
    difficulty: "intermediate",
    duration: 12,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 90,
    content: [
      {
        id: "3-1-1",
        type: "instruction",
        title: "How are you?",
        description: "Learn to ask 'How are you?' in JSL with proper hand movements and facial expressions.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Facial expressions are crucial in sign language",
      },
      {
        id: "3-1-2",
        type: "quiz",
        title: "How are you Quiz",
        description: "What is most important when signing 'How are you?'?",
        options: ["Hand speed", "Facial expressions", "Arm position", "All of the above"],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: "3-2",
    name: "What is your name?",
    description: "Learn to ask for someone's name",
   
    moduleId: 3,
    order: 2, category: "phrases",
    difficulty: "intermediate",
    duration: 10,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 80,
    content: [
      {
        id: "3-2-1",
        type: "instruction",
        title: "What is your name?",
        description: "Learn to ask for someone's name in JSL.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "This is a fundamental question in conversation",
      },
      {
        id: "3-2-2",
        type: "quiz",
        title: "Name Quiz",
        description: "When asking for a name, what should you do?",
        options: ["Point at person", "Use proper hand shape", "Make eye contact", "All of the above"],
        correctAnswer: 3,
      },
    ],
  },
]

// Module 4: Emotions & Feelings
const module4Lessons: Lesson[] = [
  {
    id: "4-1",
    name: "Happy & Sad",
    description: "Learn to express emotions",
   
    moduleId: 4,
    order: 1, category: "emotions",
    difficulty: "intermediate",
    duration: 14,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 100,
    content: [
      {
        id: "4-1-1",
        type: "instruction",
        title: "I'm Happy",
        description: "Express happiness with upward hand movements and a smile.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Facial expressions matter - smile while signing!",
      },
      {
        id: "4-1-2",
        type: "instruction",
        title: "I'm Sad",
        description: "Express sadness with downward hand movements and a frown.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Your face tells the story in sign language",
      },
      {
        id: "4-1-3",
        type: "quiz",
        title: "Emotions Quiz",
        description: "How do you show happiness in JSL?",
        options: ["Downward hands", "Upward hands with smile", "Closed fists", "Crossed arms"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "4-2",
    name: "Tired & Excited",
    description: "Learn more emotion signs",
   
    moduleId: 4,
    order: 2, category: "emotions",
    difficulty: "intermediate",
    duration: 12,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 90,
    content: [
      {
        id: "4-2-1",
        type: "instruction",
        title: "I'm Tired",
        description: "Show tiredness by moving hands downward near your face.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Combine with a tired facial expression",
      },
      {
        id: "4-2-2",
        type: "instruction",
        title: "I'm Excited",
        description: "Show excitement with quick, energetic hand movements.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Energy and enthusiasm show in your movements",
      },
      {
        id: "4-2-3",
        type: "quiz",
        title: "More Emotions Quiz",
        description: "How do you show excitement in JSL?",
        options: ["Slow movements", "Quick, energetic movements", "Still hands", "Crossed arms"],
        correctAnswer: 1,
      },
    ],
  },
]

// Module 5: Commands & Actions
const module5Lessons: Lesson[] = [
  {
    id: "5-1",
    name: "Stop, Go, Wait",
    description: "Learn directional commands",
   
    moduleId: 5,
    order: 1, category: "commands",
    difficulty: "intermediate",
    duration: 15,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 110,
    content: [
      {
        id: "5-1-1",
        type: "instruction",
        title: "Stop",
        description: "Hold an open hand up in front of you to sign 'Stop'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "This is a clear, definitive gesture",
      },
      {
        id: "5-1-2",
        type: "instruction",
        title: "Go",
        description: "Move your hand forward with fingers pointing ahead to sign 'Go'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "The direction of movement is important",
      },
      {
        id: "5-1-3",
        type: "quiz",
        title: "Commands Quiz",
        description: "How do you sign 'Stop'?",
        options: ["Point forward", "Hold open hand up", "Wave hand", "Closed fist"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "5-2",
    name: "Help & Come",
    description: "Learn helpful action signs",
   
    moduleId: 5,
    order: 2, category: "commands",
    difficulty: "intermediate",
    duration: 13,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 100,
    content: [
      {
        id: "5-2-1",
        type: "instruction",
        title: "Help",
        description: "Place one hand under the other and lift upward to sign 'Help'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "This gesture shows lifting someone up",
      },
      {
        id: "5-2-2",
        type: "instruction",
        title: "Come",
        description: "Curl your fingers inward in a beckoning motion to sign 'Come'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "This is similar to a regular beckoning gesture",
      },
      {
        id: "5-2-3",
        type: "quiz",
        title: "Action Quiz",
        description: "How do you sign 'Come'?",
        options: ["Point away", "Curl fingers inward", "Wave hand", "Open hand up"],
        correctAnswer: 1,
      },
    ],
  },
]

// Module 6: Advanced Conversations
const module6Lessons: Lesson[] = [
  {
    id: "6-1",
    name: "Agreement & Understanding",
    description: "Learn to express agreement and comprehension",
   
    moduleId: 6,
    order: 1, category: "advanced",
    difficulty: "advanced",
    duration: 16,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 120,
    content: [
      {
        id: "6-1-1",
        type: "instruction",
        title: "I Understand",
        description: "Tap your forehead with your index finger to sign 'I understand'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "This shows knowledge in your head",
      },
      {
        id: "6-1-2",
        type: "instruction",
        title: "I Agree",
        description: "Use a nodding motion with thumbs up to sign 'I agree'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Combine head movement with hand gesture",
      },
      {
        id: "6-1-3",
        type: "quiz",
        title: "Understanding Quiz",
        description: "How do you sign 'I understand'?",
        options: ["Point to ear", "Tap forehead", "Point to heart", "Wave hand"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "6-2",
    name: "Disagreement & Confusion",
    description: "Learn to express disagreement and confusion",
   
    moduleId: 6,
    order: 2, category: "advanced",
    difficulty: "advanced",
    duration: 14,
    signs: [],
    completed: false,
    locked: true,
    xpReward: 110,
    content: [
      {
        id: "6-2-1",
        type: "instruction",
        title: "I Disagree",
        description: "Use a head shake with thumbs down to sign 'I disagree'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Facial expressions show your disagreement",
      },
      {
        id: "6-2-2",
        type: "instruction",
        title: "I'm Confused",
        description: "Move your hand in a circular motion near your head to sign 'I'm confused'.",
        videoUrl: "/abstract-hand-gesture-pattern.jpg",
        tip: "Show confusion with a puzzled facial expression",
      },
      {
        id: "6-2-3",
        type: "quiz",
        title: "Disagreement Quiz",
        description: "How do you sign 'I disagree'?",
        options: ["Thumbs up", "Thumbs down with head shake", "Tap forehead", "Wave hand"],
        correctAnswer: 1,
      },
    ],
  },
]

export const mockLessons: Lesson[] = [
  ...module1Lessons,
  ...module2Lessons,
  ...module3Lessons,
  ...module4Lessons,
  ...module5Lessons,
  ...module6Lessons,
]

// Helper function to get lessons for a specific module
export const getLessonsForModule = (moduleId: number): Lesson[] => {
  switch (moduleId) {
    case 1:
      return module1Lessons
    case 2:
      return module2Lessons
    case 3:
      return module3Lessons
    case 4:
      return module4Lessons
    case 5:
      return module5Lessons
    case 6:
      return module6Lessons
    default:
      return []
  }
}

export const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    unlockedAt: "",
    rarity: "common",
  },
  {
    id: "2",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    unlockedAt: "",
    rarity: "rare",
  },
  {
    id: "3",
    name: "Perfect Score",
    description: "Get 100% on a quiz",
    icon: "⭐",
    unlockedAt: "",
    rarity: "epic",
  },
  {
    id: "4",
    name: "Sign Master",
    description: "Learn 100 signs",
    icon: "👑",
    unlockedAt: "",
    rarity: "legendary",
  },
]

export const mockUserProgress: UserProgress = {
  userId: "1",
  level: 3,
  xp: 450,
  xpToNextLevel: 550,
  streak: 5,
  lastActiveDate: new Date().toISOString(),
  completedLessons: [],
  badges: [],
  stats: {
    totalSignsLearned: 12,
    totalPracticeTime: 120,
    quizzesPassed: 2,
    perfectScores: 1,
  },
}
