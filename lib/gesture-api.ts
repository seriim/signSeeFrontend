// API service to connect to your gesture recognition backend
import { config } from './config'

const BACKEND_URL = config.backend.url

export interface GestureComparisonRequest {
  landmarks: number[][]
  targetGesture: string
  userId: string
}

export interface GestureComparisonResponse {
  success: boolean
  confidence: number
  isMatch: boolean
  message: string
  gesture?: string
}

export class GestureAPI {
  // Compare user's landmarks with stored gestures (following backend API)
  static async compareGesture(request: GestureComparisonRequest): Promise<GestureComparisonResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentLandmarks: request.landmarks,
          gestureName: request.targetGesture
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return {
        success: true,
        confidence: result.similarity || 0,
        isMatch: result.similarity >= 0.8,
        message: result.match || 'poor',
        gesture: result.gestureName
      }
    } catch (error) {
      console.error('Error comparing gesture:', error)
      return {
        success: false,
        confidence: 0,
        isMatch: false,
        message: 'Failed to connect to gesture recognition service'
      }
    }
  }

  // Compare gesture sequence (following backend API)
  static async compareSequence(data: {
    currentSequence: any[]
    gestureName: string
  }): Promise<{ similarity: number; match: string }> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/compare`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentSequence: data.currentSequence,
          gestureName: data.gestureName
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return {
        similarity: result.similarity || 0,
        match: result.match || 'poor'
      }
    } catch (error) {
      console.error('Sequence comparison error:', error)
      return { similarity: 0, match: 'poor' }
    }
  }

  // Validate hand constraints (following backend API)
  static async validateConstraints(data: {
    landmarks: number[][]
    constraints: any
  }): Promise<{ valid: boolean; violations: string[] }> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/validate-constraints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return {
        valid: result.valid || false,
        violations: result.violations || []
      }
    } catch (error) {
      console.error('Constraint validation error:', error)
      return { valid: true, violations: [] }
    }
  }

  // Analyze hand state (following backend API)
  static async analyzeHand(data: {
    landmarks: number[][]
  }): Promise<{
    palmFacing: any
    handOrientation: any
    handPosition: any
    fingerStates: any
  }> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze-hand`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Hand analysis error:', error)
      return {
        palmFacing: {},
        handOrientation: {},
        handPosition: {},
        fingerStates: {}
      }
    }
  }

  // Get available gestures for a specific sign
  static async getGesturesForSign(sign: string): Promise<any[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/gestures?sign=${encodeURIComponent(sign)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Error fetching gestures:', error)
      return []
    }
  }

  // Save gesture recognition result
  static async saveGestureResult(userId: string, gesture: string, confidence: number, landmarks: number[][]) {
    try {
      const response = await fetch(`${BACKEND_URL}/api/save-gesture-result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          gesture,
          confidence,
          landmarks
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving gesture result:', error)
    }
  }

  // Fetch practice gestures for a specific sign
  static async getPracticeGestures(sign: string): Promise<any[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/practice-gestures/${encodeURIComponent(sign)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.gestures || []
    } catch (error) {
      console.error('Error fetching practice gestures:', error)
      return []
    }
  }

  // Fetch all available signs for practice
  static async getPracticeSigns(): Promise<string[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/practice-signs`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      return result.signs || []
    } catch (error) {
      console.error('Error fetching practice signs:', error)
      return []
    }
  }
}
