import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQuestions } from '../data/api'
import Question from './Question'
import ProgressBar from './ProgressBar'
import ScoreDisplay from './ScoreDisplay'
import Timer from './Timer'
import HighScores from './HighScores'
import { ArrowLeft, RotateCcw, Loader2, Trophy } from 'lucide-react'

const Quiz = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [difficulty, setDifficulty] = useState('medium')
  const [timeLimit, setTimeLimit] = useState(30)
  const [showHighScores, setShowHighScores] = useState(false)
  const [timeUp, setTimeUp] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState(null)
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLimit)

  // Initialize quiz with difficulty settings from home page
  useEffect(() => {
    const difficultyFromState = location.state?.difficulty || 'medium'
    setDifficulty(difficultyFromState)
    
    // Logical time allocation: harder questions need more time to think
    // Easy questions are quick, hard questions need more time to process
    const timeLimits = { easy: 20, medium: 30, hard: 45 }
    const newTimeLimit = timeLimits[difficultyFromState]
    setTimeLimit(newTimeLimit)
    setCurrentTimeLeft(newTimeLimit)
    
    loadQuestions(difficultyFromState)
  }, [])

  const loadQuestions = async (selectedDifficulty = 'medium') => {
    try {
      setLoading(true)
      setError(null)
      setTimeUp(false)
      setCurrentTimeLeft(timeLimit)
      
      // Vary question count to match difficulty - more questions = more challenge
      const questionCounts = { easy: 7, medium: 9, hard: 10 }
      const count = questionCounts[selectedDifficulty]
      
      const fetchedQuestions = await getQuestions(count, selectedDifficulty)
      setQuestions(fetchedQuestions)
      setQuizStarted(true)
      setQuizStartTime(Date.now()) // Track when quiz actually starts
    } catch (err) {
      // Show user-friendly error messages instead of technical ones
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
    setTimeUp(false) // Reset time up state when user selects an answer
  }

  const handleTimeUp = () => {
    setTimeUp(true)
    // Give user a moment to see the time up state before auto-advancing
    // This feels more natural than immediate transition
    setTimeout(() => {
      handleNext()
    }, 2000)
  }

  // Timer countdown effect
  useEffect(() => {
    if (!quizStarted || timeUp) return

    const timer = setInterval(() => {
      setCurrentTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, timeUp])

  // Reset timer when question changes
  useEffect(() => {
    if (quizStarted) {
      setCurrentTimeLeft(timeLimit)
      setTimeUp(false)
    }
  }, [currentQuestionIndex, timeLimit, quizStarted])

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Quiz completed, calculate final score and time spent
      calculateFinalScore()
      const timeSpent = quizStartTime ? (Date.now() - quizStartTime) / 1000 : 0
      navigate('/results', { 
        state: { 
          questions, 
          selectedAnswers, 
          score: calculateScore(),
          difficulty,
          timeSpent
        } 
      })
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentQuestion = questions[currentQuestionIndex]
      const hasAnswered = currentQuestion && selectedAnswers[currentQuestion.id] !== undefined
      
      if (event.key === 'ArrowRight' && hasAnswered) {
        handleNext()
      } else if (event.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentQuestionIndex, questions, selectedAnswers])

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    return correctAnswers
  }

  const calculateFinalScore = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setScore(0)
    setQuizStarted(false)
    setTimeUp(false)
    setCurrentTimeLeft(timeLimit)
    loadQuestions(difficulty)
  }

  const goHome = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card-gradient text-center max-w-md mx-auto">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Questions...</h2>
          <p className="text-gray-600">Please wait while we prepare your quiz</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card-gradient text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Quiz</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button onClick={loadQuestions} className="btn-primary w-full">
              🔄 Try Again
            </button>
            <button onClick={goHome} className="btn-secondary w-full">
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!quizStarted || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card-gradient text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🧠</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ready to Start?</h2>
          <p className="text-gray-600 mb-6">Click the button below to begin your quiz</p>
          <button onClick={loadQuestions} className="btn-primary">
            🚀 Start Quiz
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const hasAnswered = selectedAnswers[currentQuestion.id] !== undefined

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full" role="main" aria-label="Quiz Application">
        {/* Desktop Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 m-4 md:m-6 flex flex-col h-full">
          <div className="flex-1 flex flex-col">
        {/* Skip Link for Screen Readers */}
        <a 
          href="#question-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to question content
        </a>

        {/* Responsive Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <button
            onClick={goHome}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHighScores(true)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="View high scores"
            >
              <Trophy className="w-5 h-5" />
            </button>
            <button
              onClick={restartQuiz}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Restart the quiz"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Responsive Progress Bar */}
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{calculateScore()}/{questions.length} correct</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question - Responsive */}
        <div id="question-content" className="flex-1 flex flex-col px-4 md:px-6" role="region" aria-label="Current question">
          <Question
            question={currentQuestion}
            selectedAnswer={selectedAnswers[currentQuestion.id]}
            onAnswerSelect={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        {/* Responsive Navigation */}
        <nav className="flex items-center justify-between p-4 md:p-6 border-t border-gray-200" role="navigation" aria-label="Quiz navigation">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={currentQuestionIndex === 0 ? "Cannot go to previous question" : "Go to previous question"}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Timer in center */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className={`w-3 h-3 rounded-full ${
              currentTimeLeft <= 10 ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
            }`}></div>
            <span className={currentTimeLeft <= 10 ? 'text-red-600 font-semibold' : ''}>
              {currentTimeLeft}s
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={!hasAnswered}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${!hasAnswered 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
            }`}
            aria-label={!hasAnswered ? "Please select an answer to continue" : isLastQuestion ? "Finish quiz and view results" : "Go to next question"}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </button>
        </nav>
          </div>
        </div>
      </div>

      {/* High Scores Modal */}
      {showHighScores && (
        <HighScores
          currentScore={calculateScore()}
          totalQuestions={questions.length}
          difficulty={difficulty}
          onClose={() => setShowHighScores(false)}
        />
      )}
    </div>
  )
}

export default Quiz
