# Environment Setup Guide

This guide helps you set up the environment variables needed for the SignSee app to work properly.

## Database Connection Issues

The practice feature errors you're experiencing are likely due to missing or incorrect environment variables for the database connection.

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```bash
# Supabase Configuration (for data storage)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Backend API Configuration (for gesture recognition)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# MediaPipe Configuration
NEXT_PUBLIC_MEDIAPIPE_CDN_URL=https://cdn.jsdelivr.net/npm/@mediapipe
```

## Option 1: Use Mock Data (Recommended for Testing)

If you don't have Supabase set up yet, the app will automatically fall back to mock data. This is perfect for testing the practice feature.

**No setup required** - the app will work with demo data.

## Option 2: Set Up Supabase (For Production)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to Settings > API in your Supabase dashboard
3. Copy your project URL and anon key
4. Add them to your `.env.local` file

### Required Database Tables

If using Supabase, create these tables:

```sql
-- Signs table
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

-- User progress table
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

-- Gesture recognition table
CREATE TABLE gesture_recognition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  gesture TEXT NOT NULL,
  confidence FLOAT NOT NULL,
  landmarks JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Option 3: Use Backend API Only

If you want to use the gesture recognition backend without Supabase:

1. Start the backend: `cd sightsee-mediapipe-backend && npm start`
2. Set only the backend URL in `.env.local`:
   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
3. The app will use mock data for signs and progress, but real gesture recognition

## Testing the Setup

1. Start the frontend: `npm run dev`
2. Navigate to `/practice`
3. Click "Start Practice Session"
4. Allow camera permissions
5. The app should work with either real data or mock data

## Troubleshooting

### Error: "Failed to fetch signs"
- Check if Supabase URL and key are correct
- The app will fall back to mock data automatically

### Error: "Failed to update progress"
- This is non-critical - the practice session will continue
- Check Supabase configuration if you want progress tracking

### Error: "MediaPipe not loading"
- Check internet connection
- The app will show an error message if MediaPipe fails to load

### Error: "Backend connection failed"
- Make sure the backend is running on port 3000
- Check the backend URL in your environment variables

## Current Status

The practice feature is designed to work with or without a database connection. It will:

1. ✅ Use mock data if Supabase is not configured
2. ✅ Use real gesture recognition if backend is running
3. ✅ Fall back gracefully if any service is unavailable
4. ✅ Continue working even if progress tracking fails

This makes it perfect for testing and development!
