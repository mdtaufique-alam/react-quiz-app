// Smart scoring system that considers difficulty and time
// This makes the quiz more interesting than just counting correct answers

export const calculateSmartScore = (questions, selectedAnswers, difficulty, timeSpent) => {
  let baseScore = 0
  let bonusPoints = 0
  
  questions.forEach(question => {
    const userAnswer = selectedAnswers[question.id]
    const isCorrect = userAnswer === question.correctAnswer
    
    if (isCorrect) {
      // Base points for correct answer
      baseScore += 1
      
      // Bonus points based on difficulty
      const difficultyMultipliers = {
        easy: 1,
        medium: 1.2,
        hard: 1.5
      }
      
      bonusPoints += difficultyMultipliers[difficulty] || 1
    }
  })
  
  // Time bonus - faster answers get more points
  const averageTimePerQuestion = timeSpent / questions.length
  const timeBonus = Math.max(0, (30 - averageTimePerQuestion) * 0.1)
  
  return {
    baseScore,
    bonusPoints: Math.round(bonusPoints),
    timeBonus: Math.round(timeBonus),
    totalScore: Math.round(baseScore + bonusPoints + timeBonus),
    percentage: Math.round(((baseScore + bonusPoints + timeBonus) / questions.length) * 100)
  }
}

export const getScoreMessage = (percentage, difficulty) => {
  const messages = {
    easy: {
      90: "Outstanding! You're a trivia master! 🌟",
      80: "Excellent work! You really know your stuff! 🎉",
      70: "Great job! You're getting the hang of it! 👏",
      60: "Good effort! Keep practicing! 👍",
      50: "Not bad! You're on the right track! 😊"
    },
    medium: {
      90: "Incredible! You're a true expert! 🏆",
      80: "Fantastic! You really know your stuff! 🎉",
      70: "Well done! You're quite knowledgeable! 👏",
      60: "Good work! You're getting there! 👍",
      50: "Not bad! Keep challenging yourself! 😊"
    },
    hard: {
      90: "Legendary! You're absolutely brilliant! 🧠",
      80: "Amazing! You're a true genius! 🎉",
      70: "Impressive! You really know your stuff! 👏",
      60: "Good job! Hard questions are tough! 👍",
      50: "Respectable! Hard mode is challenging! 😊"
    }
  }
  
  const difficultyMessages = messages[difficulty] || messages.medium
  
  if (percentage >= 90) return difficultyMessages[90]
  if (percentage >= 80) return difficultyMessages[80]
  if (percentage >= 70) return difficultyMessages[70]
  if (percentage >= 60) return difficultyMessages[60]
  if (percentage >= 50) return difficultyMessages[50]
  
  return "Keep trying! Every expert was once a beginner! 💪"
}

export const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: 'from-green-500 to-green-600',
    medium: 'from-yellow-500 to-yellow-600',
    hard: 'from-red-500 to-red-600'
  }
  return colors[difficulty] || colors.medium
}
