# SignSee - Jamaican Sign Language Learning Platform

**Bridging communication one sign at a time.**

A gamified learning platform for Jamaican Sign Language (JSL) featuring AI-powered gesture recognition, interactive lessons, and real-time practice sessions.

## ✨ Features

### 🎯 Learning Modules
- Structured curriculum with beginner to advanced levels
- Interactive lessons with visual demonstrations
- Module quizzes with immediate feedback
- Progress tracking and XP system

### 🤖 AI-Powered Practice
- Real-time hand gesture recognition using webcam
- MediaPipe integration for accurate hand tracking
- Practice sessions with confidence scoring
- Instant feedback on sign accuracy

### 📚 English to JSL Translator
- Instant translation of words and phrases
- Visual sign demonstrations with images
- Detailed sign descriptions and instructions
- Search history and popular words

### 🧠 Quiz System
- Multiple choice questions with visual options
- Module-specific quizzes
- Score tracking and performance analytics
- Immediate feedback with explanations

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** TailwindCSS v4
- **UI Components:** shadcn/ui (Radix UI)
- **Database:** Supabase (with mock data fallback)
- **AI/ML:** MediaPipe for hand tracking
- **Deployment:** Vercel

## 🚀 Quick Start

1. **Clone and install:**
   ```bash
   git clone <your-repo-url>
   cd signSeeFrontend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env.local with placeholder values (uses mock data)
   echo 'NEXT_PUBLIC_SUPABASE_URL=placeholder
   NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder' > .env.local
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
app/
├── page.tsx                    # Landing page
├── learn/                      # Learning modules
│   ├── page.tsx               # Module selection
│   ├── module/[id]/           # Individual modules
│   ├── lesson/[id]/           # Lesson player
│   └── module-quiz/[id]/      # Module quizzes
├── practice/                   # Practice sessions
├── translator/                 # JSL translator
└── quiz/                      # Quiz system

components/
├── gesture-recognition.tsx    # AI gesture component
├── practice-session.tsx       # Practice interface
├── sign-display.tsx          # Sign visualization
├── quiz-card.tsx             # Quiz components
└── ui/                       # shadcn/ui components
```

## 🎮 Key Pages

- **`/`** - Landing page with feature overview
- **`/learn`** - Module selection with progress tracking
- **`/learn/module/[id]`** - Individual learning modules
- **`/learn/lesson/[id]`** - Interactive lesson player
- **`/learn/module-quiz/[id]`** - Module-specific quizzes
- **`/practice`** - AI-powered practice sessions
- **`/practice/session`** - Real-time gesture recognition
- **`/translator`** - English to JSL translation
- **`/quiz`** - General quiz system

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Setup
The app works with mock data by default. For production:
1. Set up Supabase project
2. Update `.env.local` with real credentials
3. See `ENVIRONMENT_SETUP.md` for details

## 🎨 Design System

- **Colors:** Blue (primary), Coral (accent), Teal (secondary)
- **Typography:** System fonts with clear hierarchy
- **Layout:** Mobile-first responsive design
- **Components:** Consistent shadcn/ui design system

## 📊 Gamification

- **XP System:** Earn points for completing lessons and quizzes
- **Levels:** Progress through learning levels
- **Streaks:** Daily learning streak tracking
- **Achievements:** Unlockable badges and milestones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License

## 🙏 Acknowledgments

- **MediaPipe** - Hand tracking technology
- **shadcn/ui** - Beautiful component library
- **Radix UI** - Accessible component primitives
- **Next.js** - React framework
- **TailwindCSS** - Utility-first CSS framework
- **Supabase** - Backend-as-a-Service
- **Jamaican Deaf Community** - Cultural insights and feedback

---

**SignSee** - Making JSL learning accessible and engaging for everyone.