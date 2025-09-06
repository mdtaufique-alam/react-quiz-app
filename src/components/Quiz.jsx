import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getQuestions } from '../data/api'
import Question from './Question'
import { ArrowLeft, RotateCcw, Loader2, Trophy, Clock, Target, Play, Brain } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

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
  const [questionTransition, setQuestionTransition] = useState(false)
  
  // Scroll animations
  const [progressRef, isProgressVisible] = useScrollAnimation({ threshold: 0.1 })
  const [questionRef, isQuestionVisible] = useScrollAnimation({ threshold: 0.2 })

  // Initialize quiz with difficulty settings from home page
  useEffect(() => {
    const difficultyFromState = location.state?.difficulty || 'medium'
    setDifficulty(difficultyFromState)

    // Set time limit based on difficulty
    const timeLimits = {
      easy: 45,
      medium: 30,
      hard: 20
    }
    setTimeLimit(timeLimits[difficultyFromState])
    setCurrentTimeLeft(timeLimits[difficultyFromState])

    loadQuestions(difficultyFromState)
  }, [location.state])

  // Load questions on component mount if not already loaded
  useEffect(() => {
    if (questions.length === 0 && !loading && !error) {
      loadQuestions(difficulty)
    }
  }, [])

  const loadQuestions = async (difficulty) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Loading questions for difficulty:', difficulty)
      const questionsData = await getQuestions(10, difficulty, null)
      console.log('Loaded questions:', questionsData)
      setQuestions(questionsData)
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      console.error('Error loading questions:', err)
    } finally {
      setLoading(false)
    }
  }

  const startQuiz = () => {
    setQuizStarted(true)
    setQuizStartTime(Date.now())
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const calculateScore = () => {
    return questions.reduce((total, question) => {
      const userAnswer = selectedAnswers[question.id]
      return total + (userAnswer === question.correctAnswer ? 1 : 0)
    }, 0)
  }

  const calculateFinalScore = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
  }

  const handleNext = () => {
    setQuestionTransition(true)
    
    setTimeout(() => {
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
      setQuestionTransition(false)
    }, 300)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentQuestion = questions[currentQuestionIndex]
      if (!currentQuestion) return

      if (event.key >= '1' && event.key <= '4') {
        const optionIndex = parseInt(event.key) - 1
        if (optionIndex < currentQuestion.options.length) {
          handleAnswerSelect(currentQuestion.id, optionIndex)
        }
      } else if (event.key === 'Enter' && selectedAnswers[currentQuestion.id] !== undefined) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentQuestionIndex, questions, selectedAnswers])

  // Timer effect
  useEffect(() => {
    if (!quizStarted || timeUp) return

    const timer = setInterval(() => {
      setCurrentTimeLeft(prev => {
        if (prev <= 1) {
          setTimeUp(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, timeUp])

  // Reset timer when question changes
  useEffect(() => {
    if (quizStarted && !timeUp) {
      setCurrentTimeLeft(timeLimit)
      setTimeUp(false)
    }
  }, [currentQuestionIndex, timeLimit, quizStarted])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  console.log('Quiz state:', { loading, error, questions: questions.length, quizStarted, currentQuestionIndex })

  // Fallback for debugging
  if (!loading && !error && questions.length === 0) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="tech-grid"></div>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-2xl">❓</div>
          </div>
          <h2 className="text-h2 mb-4">No Questions Loaded</h2>
          <p className="text-body text-gray-600 mb-6">Something went wrong loading the questions.</p>
          <button 
            onClick={() => loadQuestions(difficulty)}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="tech-grid"></div>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-body text-gray-600">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="tech-grid"></div>
        <div className="card-minimal text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 text-red-600">⚠️</div>
          </div>
          <h2 className="text-h2 mb-4">Error</h2>
          <p className="text-body text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => loadQuestions(difficulty)}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="tech-grid"></div>
        <div className="container-minimal text-center">
          <div className="card-primary max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-gray-900" />
            </div>
            <h1 className="text-h1 mb-4 text-white">Ready to Start?</h1>
            <p className="text-body text-gray-200 mb-8">
              You'll have {timeLimit} seconds per question. Good luck!
            </p>
            <div className="space-y-4">
              <button 
                onClick={startQuiz}
                className="btn-secondary text-lg px-8 py-4"
              >
                <Play className="w-5 h-5" />
                Start Quiz
              </button>
              <button 
                onClick={() => navigate('/')}
                className="btn-ghost text-lg px-8 py-4 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen tech-bg">
      <div className="tech-grid"></div>
      <div className="container-minimal py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="btn-ghost"
            aria-label="Go back to home page"
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-caption">
              <Clock className="w-4 h-4" />
              <span>{currentTimeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 text-caption">
              <Target className="w-4 h-4" />
              <span>{currentQuestionIndex + 1} / {questions.length}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          ref={progressRef}
          className={`card-minimal mb-8 ${
            isProgressVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-caption">Progress</span>
              <span className="text-caption font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="progress-minimal">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div 
          ref={questionRef}
          className={`${
            questionTransition ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'
          } transition-all duration-300`}
        >
          <Question
            question={currentQuestion}
            selectedAnswer={selectedAnswers[currentQuestion.id]}
            onAnswerSelect={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>

        {/* Navigation */}
        <div className="card-minimal mt-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="btn-ghost"
              aria-label="Exit quiz"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit Quiz
            </button>
            
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion.id] === undefined}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz