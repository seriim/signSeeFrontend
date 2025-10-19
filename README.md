# SignSee - Jamaican Sign Language Learning Platform

**Tagline:** Bridging communication one sign at a time.

SignSee is a gamified, AI-powered learning platform designed to make learning Jamaican Sign Language (JSL) fun, accessible, and interactive. The app helps both deaf and hearing users learn, practice, and communicate more effectively through innovative technology and engaging design.

## Problem Statement

Deaf and hard-of-hearing Jamaicans face communication barriers daily, especially because Jamaican Sign Language (JSL) resources are scarce, outdated, or boring. Hearing individuals also lack accessible ways to learn JSL quickly or interactively.

## Solution

SignSee provides a comprehensive learning platform that combines:
- Gamified learning modules with levels, badges, and streaks
- AI-powered gesture recognition for real-time practice feedback
- English to JSL translation with visual demonstrations
- Interactive quizzes and knowledge assessments
- Progress tracking and achievement systems

## Core Features

### 1. Gamified Learning Modules
- Structured curriculum from beginner to advanced levels
- Interactive lessons with step-by-step instructions
- XP points, levels, and progression system
- Daily streak tracking to build learning habits
- Unlockable badges and achievements

### 2. AI-Powered Sign Recognition
- Real-time hand gesture verification using webcam
- MediaPipe integration for accurate hand tracking
- Instant feedback on sign accuracy
- Practice sessions with confidence scoring
- Support for multiple sign variations

### 3. English to JSL Translator
- Instant translation of words and phrases
- Visual demonstrations with images/videos
- Detailed sign descriptions and instructions
- Category-based sign organization
- Search history and favorites

### 4. Quizzes & Knowledge Checks
- Multiple choice questions
- True/false assessments
- Gesture recognition challenges
- Immediate feedback with explanations
- Score tracking and performance analytics

### 5. Progress Tracking Dashboard
- Comprehensive learning statistics
- Weekly activity charts
- Achievement showcase
- Streak monitoring
- Recent activity feed
- Level progression tracking

## Tech Stack

- **Frontend Framework:** React with TypeScript
- **Styling:** TailwindCSS v4
- **UI Components:** shadcn/ui
- **Backend:** Supabase (Database, Auth, Real-time)
- **AI/ML:** MediaPipe for hand tracking, TensorFlow.js for gesture recognition
- **Routing:** Next.js App Router
- **State Management:** React Hooks (useState, useEffect)
- **Deployment:** Vercel

## Project Structure

\`\`\`
signsee-app/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── learn/                   # Learning modules
│   │   ├── page.tsx            # Module selection
│   │   ├── module/[id]/        # Individual module view
│   │   └── lesson/[id]/        # Lesson player
│   ├── practice/               # Practice sessions
│   ├── translator/             # English to JSL translator
│   ├── quiz/                   # Quiz system
│   └── dashboard/              # Progress tracking
├── components/
│   ├── navigation.tsx          # Main navigation
│   ├── gesture-recognition.tsx # AI gesture component
│   ├── practice-session.tsx    # Practice interface
│   ├── sign-display.tsx        # Sign visualization
│   └── quiz-card.tsx           # Quiz preview card
├── lib/
│   ├── types.ts                # TypeScript definitions
│   ├── supabase.ts             # Supabase client configuration
│   ├── api.ts                  # API service functions
│   └── mock-data.ts            # Sample data (deprecated)
├── hooks/
│   └── use-api.ts              # Custom API hooks
└── public/                     # Static assets
\`\`\`

## Key Pages

### Landing Page (`/`)
- Hero section with value proposition
- Feature highlights
- Call-to-action buttons
- Social proof metrics

### Learning Hub (`/learn`)
- Module cards with progress indicators
- Difficulty levels (Beginner, Intermediate, Advanced)
- Lesson count and XP rewards
- Continue learning suggestions

### Lesson Player (`/learn/lesson/[id]`)

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd signsee-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Set up Supabase backend**:
   - Follow the instructions in `BACKEND_INTEGRATION.md`
   - Create the database schema
   - Configure Row Level Security policies

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Deploy to Vercel**:
   - Follow the instructions in `VERCEL_DEPLOYMENT.md`
   - Connect your GitHub repository to Vercel
   - Set up environment variables in Vercel dashboard

## Backend Integration

This app uses Supabase as the backend service, providing:
- **Database**: PostgreSQL with real-time subscriptions
- **Authentication**: User management and session handling
- **Storage**: File uploads for sign language videos
- **Real-time**: Live updates for collaborative features

See `BACKEND_INTEGRATION.md` for detailed setup instructions.

## Deployment

The app is optimized for deployment on Vercel:
- **Static Generation**: Optimized for performance
- **Edge Functions**: Serverless API routes
- **CDN**: Global content delivery
- **Analytics**: Built-in performance monitoring

See `VERCEL_DEPLOYMENT.md` for deployment instructions.

### Lesson Player (`/learn/lesson/[id]`)
- Multi-step lesson interface (Instruction, Practice, Quiz)
- Video/image demonstrations
- Interactive practice with AI feedback
- Progress tracking within lessons

### Translator (`/translator`)
- Search input for words/phrases
- Real-time translation results
- Visual sign demonstrations
- Sign descriptions and categories
- Recent searches and popular words

### Practice Mode (`/practice`)
- Webcam-based gesture recognition
- Real-time feedback with confidence scores
- Practice session tracking
- XP rewards for successful attempts

### Quiz System (`/quiz`)
- Multiple question types
- Progress bar and timer
- Immediate feedback with explanations
- Results screen with detailed analytics
- Retry and continue learning options

### Dashboard (`/dashboard`)
- User statistics (Level, XP, Streak)
- Learning progress charts
- Achievement showcase
- Weekly activity visualization
- Recent activity feed
- Quick action buttons

## Design System

### Color Palette
- **Primary (Blue):** Trust, communication, learning
- **Accent (Coral):** Encouragement, warmth, engagement
- **Secondary (Teal):** Growth, gamification, achievement
- **Neutrals:** White, grays for backgrounds and text

### Typography
- **Headings:** Bold, clear hierarchy
- **Body Text:** Readable with proper line-height (1.5-1.6)
- **Font Stack:** System fonts for optimal performance

### Layout Principles
- Mobile-first responsive design
- Flexbox for most layouts
- CSS Grid for complex 2D layouts
- Consistent spacing using Tailwind scale
- Accessible color contrast ratios

## Gamification Elements

### XP System
- Earn XP for completing lessons (50 XP)
- Quiz completion rewards (10 XP per correct answer)
- Practice session bonuses (30 XP per session)
- Achievement unlocks (50-250 XP)

### Levels
- Level up every 1500 XP
- Unlock new content at higher levels
- Visual level badges and indicators

### Streaks
- Daily learning streak tracking
- Streak milestones with special rewards
- Visual flame indicator for active streaks

### Achievements
- First Steps: Complete first lesson
- Week Warrior: 7-day streak
- Quiz Master: 100% quiz score
- Sign Collector: Learn 50 signs
- Module Champion: Complete all module lessons

## Future Enhancements

### Phase 2
- User authentication and profiles
- Social features (leaderboards, friend challenges)
- Offline mode support
- Mobile app (React Native)
- Video recording for practice review

### Phase 3
- Live tutoring sessions
- Community forums
- User-generated content
- Advanced AI with personalized learning paths
- Speech-to-sign translation

### Phase 4
- Integration with educational institutions
- Certification programs
- Expanded sign language support (ASL, BSL, etc.)
- AR/VR practice environments

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

We welcome contributions to make SignSee even better! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact & Support

For questions, feedback, or support, please reach out through:
- GitHub Issues
- Email: support@signsee.app

## Acknowledgments

- Jamaican Deaf community for cultural insights
- MediaPipe team for hand tracking technology
- shadcn/ui for beautiful component library
- All contributors and beta testers

---

**SignSee** - Bridging communication one sign at a time.
