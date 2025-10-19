export interface ModuleQuizQuestion {
  id: number
  question: string
  imageUrl: string
  options: Array<{
    imageUrl: string
    label: string
  }>
  correctAnswer: number
  explanation: string
}

const moduleQuizzes: Record<number, ModuleQuizQuestion[]> = {
  1: [
    {
      id: 1,
      question: "Which sign means 'Hello'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "Goodbye" },
      ],
      correctAnswer: 0,
      explanation: "Correct! This is the JSL sign for 'Hello' - raise your hand to your forehead and move it forward.",
    },
    {
      id: 2,
      question: "Which sign means 'Thank You'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "Goodbye" },
      ],
      correctAnswer: 1,
      explanation: "Correct! Touch your chin with fingertips and move your hand forward to sign 'Thank You'.",
    },
    {
      id: 3,
      question: "Which sign means 'Please'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "Goodbye" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
      ],
      correctAnswer: 2,
      explanation: "Correct! Make a circular motion on your chest with your open hand to sign 'Please'.",
    },
    {
      id: 4,
      question: "Which sign means 'Goodbye'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "Goodbye" },
      ],
      correctAnswer: 3,
      explanation: "Correct! Hold your hand up with palm facing out and close your fingers down in a waving motion.",
    },
    {
      id: 5,
      question: "Which sign means 'Excuse Me'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Excuse Me" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 0,
      explanation: "Correct! Gently tap your chest with your fingertips to sign 'Excuse Me'.",
    },
  ],
  2: [
    {
      id: 1,
      question: "Which hand shape represents the letter 'A'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Closed fist" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Open hand" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Curved hand" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Spread fingers" },
      ],
      correctAnswer: 0,
      explanation: "Correct! The letter 'A' is signed with a closed fist.",
    },
    {
      id: 2,
      question: "Which hand shape represents the letter 'B'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Closed fist" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Open hand" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Curved hand" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Spread fingers" },
      ],
      correctAnswer: 1,
      explanation: "Correct! The letter 'B' is signed with an open hand.",
    },
    {
      id: 3,
      question: "How do you sign the number '1'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "One finger up" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Two fingers up" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Three fingers up" },
        { imageUrl: "/jsl-please-sign.jpg", label: "All fingers up" },
      ],
      correctAnswer: 0,
      explanation: "Correct! The number '1' is signed with one finger pointing up.",
    },
    {
      id: 4,
      question: "How do you sign the number '5'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Closed fist" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "All fingers spread" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Three fingers up" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Two fingers up" },
      ],
      correctAnswer: 1,
      explanation: "Correct! The number '5' is signed with all fingers spread open.",
    },
    {
      id: 5,
      question: "Which hand shape represents the letter 'C'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Closed fist" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Open hand" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Curved hand" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Spread fingers" },
      ],
      correctAnswer: 2,
      explanation: "Correct! The letter 'C' is signed with a curved hand shape.",
    },
  ],
  3: [
    {
      id: 1,
      question: "Which sign means 'How are you?'",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "How are you?" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 0,
      explanation: "Correct! 'How are you?' requires proper hand movements and facial expressions.",
    },
    {
      id: 2,
      question: "Which sign means 'What is your name?'",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "How are you?" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "What is your name?" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 1,
      explanation: "Correct! When asking for a name, use proper hand shape and make eye contact.",
    },
    {
      id: 3,
      question: "Which sign means 'Nice to meet you'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "How are you?" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Nice to meet you" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 2,
      explanation: "Correct! 'Nice to meet you' combines greeting and appreciation gestures.",
    },
    {
      id: 4,
      question: "Which sign means 'Where are you from?'",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "How are you?" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Where are you from?" },
      ],
      correctAnswer: 3,
      explanation: "Correct! This phrase uses specific hand positions and movements.",
    },
    {
      id: 5,
      question: "Which sign means 'I love JSL'?",
      imageUrl: "/person-signing-goodbye-in-sign-language.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "How are you?" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "I love JSL" },
      ],
      correctAnswer: 3,
      explanation: "Correct! This expresses enthusiasm and affection for the language.",
    },
  ],
  4: [
    {
      id: 1,
      question: "Which sign means 'I like it'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I like it" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 0,
      explanation: "Correct! 'I like it' is expressed with a thumbs up gesture.",
    },
    {
      id: 2,
      question: "Which sign means 'I don't like it'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I like it" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I don't like it" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 1,
      explanation: "Correct! 'I don't like it' is expressed with a thumbs down gesture.",
    },
    {
      id: 3,
      question: "Which sign means 'I'm happy'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I'm sad" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I'm happy" },
        { imageUrl: "/jsl-please-sign.jpg", label: "I'm tired" },
      ],
      correctAnswer: 2,
      explanation: "Correct! 'I'm happy' is shown with a smile and upward hand movements.",
    },
    {
      id: 4,
      question: "Which sign means 'I'm sad'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I'm sad" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm happy" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-please-sign.jpg", label: "I'm tired" },
      ],
      correctAnswer: 0,
      explanation: "Correct! 'I'm sad' is shown with a frown and downward hand movements.",
    },
    {
      id: 5,
      question: "Which sign means 'I'm tired'?",
      imageUrl: "/person-signing-goodbye-in-sign-language.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm happy" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I'm sad" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "I'm tired" },
      ],
      correctAnswer: 3,
      explanation: "Correct! 'I'm tired' is shown with hands moving downward near the face.",
    },
  ],
  5: [
    {
      id: 1,
      question: "Which sign means 'Help'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Help" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Hello" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Thank You" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Please" },
      ],
      correctAnswer: 0,
      explanation: "Correct! 'Help' is signed by placing one hand under the other and lifting upward.",
    },
    {
      id: 2,
      question: "Which sign means 'Stop'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Go" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Stop" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Wait" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Move" },
      ],
      correctAnswer: 1,
      explanation: "Correct! 'Stop' is signed with an open hand held up in front of you.",
    },
    {
      id: 3,
      question: "Which sign means 'Go'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Stop" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Wait" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Go" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Come" },
      ],
      correctAnswer: 2,
      explanation: "Correct! 'Go' is signed by moving your hand forward with fingers pointing ahead.",
    },
    {
      id: 4,
      question: "Which sign means 'Wait'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Go" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Stop" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Come" },
        { imageUrl: "/jsl-please-sign.jpg", label: "Wait" },
      ],
      correctAnswer: 3,
      explanation: "Correct! 'Wait' is signed with both hands held up with palms facing forward.",
    },
    {
      id: 5,
      question: "Which sign means 'Come'?",
      imageUrl: "/person-signing-goodbye-in-sign-language.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "Go" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "Stop" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "Wait" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "Come" },
      ],
      correctAnswer: 3,
      explanation: "Correct! 'Come' is signed by curling your fingers inward in a beckoning motion.",
    },
  ],
  6: [
    {
      id: 1,
      question: "Which sign means 'I understand'?",
      imageUrl: "/abstract-hand-gesture-pattern.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I understand" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I agree" },
        { imageUrl: "/jsl-please-sign.jpg", label: "I disagree" },
      ],
      correctAnswer: 0,
      explanation: "Correct! 'I understand' is signed by tapping your forehead with your index finger.",
    },
    {
      id: 2,
      question: "Which sign means 'I'm confused'?",
      imageUrl: "/jsl-hello-sign.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I understand" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I agree" },
        { imageUrl: "/jsl-please-sign.jpg", label: "I disagree" },
      ],
      correctAnswer: 1,
      explanation: "Correct! 'I'm confused' is signed by moving your hand in a circular motion near your head.",
    },
    {
      id: 3,
      question: "Which sign means 'I agree'?",
      imageUrl: "/jsl-thank-you-sign.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I understand" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I agree" },
        { imageUrl: "/jsl-please-sign.jpg", label: "I disagree" },
      ],
      correctAnswer: 2,
      explanation: "Correct! 'I agree' is signed with a nodding motion and thumbs up.",
    },
    {
      id: 4,
      question: "Which sign means 'I disagree'?",
      imageUrl: "/jsl-please-sign.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I understand" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I agree" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-please-sign.jpg", label: "I disagree" },
      ],
      correctAnswer: 3,
      explanation: "Correct! 'I disagree' is signed with a head shake and thumbs down.",
    },
    {
      id: 5,
      question: "Which sign means 'I'm sorry'?",
      imageUrl: "/person-signing-goodbye-in-sign-language.jpg",
      options: [
        { imageUrl: "/abstract-hand-gesture-pattern.jpg", label: "I'm happy" },
        { imageUrl: "/jsl-hello-sign.jpg", label: "I'm confused" },
        { imageUrl: "/jsl-thank-you-sign.jpg", label: "I'm excited" },
        { imageUrl: "/person-signing-goodbye-in-sign-language.jpg", label: "I'm sorry" },
      ],
      correctAnswer: 3,
      explanation: "Correct! 'I'm sorry' is signed by placing your hand over your heart and moving it in a circular motion.",
    },
  ],
}

export const getModuleQuiz = (moduleId: number): ModuleQuizQuestion[] => {
  return moduleQuizzes[moduleId] || []
}
