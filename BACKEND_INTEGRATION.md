# Backend Integration Guide

This guide explains how to connect your Next.js frontend to your Supabase backend (sightsee-mediapipe-backend).

## Prerequisites

1. **Supabase Project**: You need a Supabase project with the following tables:
   - `lessons` - stores lesson data
   - `signs` - stores sign language data
   - `user_progress` - tracks user progress and XP
   - `gesture_recognition` - stores AI gesture recognition results

2. **Environment Variables**: Create a `.env.local` file in your project root with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## Database Schema

### Lessons Table
```sql
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  duration INTEGER NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  locked BOOLEAN DEFAULT FALSE,
  xp_reward INTEGER NOT NULL,
  module_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Signs Table
```sql
CREATE TABLE signs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL,
  category TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### User Progress Table
```sql
CREATE TABLE user_progress (
  user_id TEXT PRIMARY KEY,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  xp_to_next_level INTEGER DEFAULT 100,
  streak INTEGER DEFAULT 0,
  last_active_date DATE,
  completed_lessons TEXT[] DEFAULT '{}',
  badges JSONB DEFAULT '[]',
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Gesture Recognition Table
```sql
CREATE TABLE gesture_recognition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  gesture TEXT NOT NULL,
  confidence DECIMAL NOT NULL,
  landmarks JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Lesson Signs Junction Table
```sql
CREATE TABLE lesson_signs (
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  sign_id UUID REFERENCES signs(id) ON DELETE CASCADE,
  PRIMARY KEY (lesson_id, sign_id)
);
```

## API Integration

The frontend now uses the following API hooks:

- `useLessons()` - Fetch all lessons
- `useLessonsByModule(moduleId)` - Fetch lessons by module
- `useLesson(id)` - Fetch single lesson
- `useSigns()` - Fetch all signs
- `useSignsByCategory(category)` - Fetch signs by category
- `useUserProgress(userId)` - Manage user progress
- `useGestureRecognition(userId)` - Handle gesture recognition results

## Usage Examples

### In a Lesson Page
```tsx
import { useLesson } from '@/hooks/use-api'

export default function LessonPage({ params }: { params: { id: string } }) {
  const { lesson, loading, error } = useLesson(params.id)
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!lesson) return <div>Lesson not found</div>
  
  return (
    <div>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      {/* Rest of your lesson UI */}
    </div>
  )
}
```

### In a Practice Session
```tsx
import { useSigns, useUserProgress } from '@/hooks/use-api'
import { PracticeSession } from '@/components/practice-session'

export default function PracticePage() {
  const { signs, loading } = useSigns()
  const { progress } = useUserProgress('user-id')
  
  if (loading) return <div>Loading...</div>
  
  return (
    <PracticeSession 
      signs={signs} 
      userId="user-id"
      onComplete={() => console.log('Practice complete!')}
    />
  )
}
```

## Next Steps

1. **Set up your Supabase project** with the provided schema
2. **Add your environment variables** to `.env.local`
3. **Update your pages** to use the new API hooks instead of mock data
4. **Test the integration** by running your app and checking if data loads from Supabase
5. **Implement real MediaPipe integration** in the gesture recognition component

## Troubleshooting

- **Environment variables not loading**: Make sure `.env.local` is in your project root and restart your dev server
- **Database connection errors**: Check your Supabase URL and anon key
- **Type errors**: Make sure your database schema matches the types in `lib/supabase.ts`
- **Permission errors**: Check your Supabase RLS policies allow the operations you're trying to perform
