// Configuration for the SignSee app
export const config = {
  // Backend API configuration
  backend: {
    url: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
  
  // MediaPipe configuration
  mediapipe: {
    cdnUrl: process.env.NEXT_PUBLIC_MEDIAPIPE_CDN_URL || 'https://cdn.jsdelivr.net/npm/@mediapipe',
    hands: {
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.6,
    }
  },
  
  // Supabase configuration (if using Supabase)
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  
  // Practice session configuration
  practice: {
    maxSignsPerSession: 5,
    xpPerSign: 50,
    confidenceThreshold: 0.8,
    comparisonInterval: 200, // ms
  }
}
