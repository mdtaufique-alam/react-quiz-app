import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Trophy, RotateCcw, Home, CheckCircle, XCircle, Award, ArrowLeft, Star, Clock, Target } from 'lucide-react'
import { calculateSmartScore, getScoreMessage, getDifficultyColor } from '../utils/scoring'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  
  // Scroll animations
  const [headerRef, isHeaderVisible] = useScrollAnimation({ threshold: 0.3 })
  const [scoreRef, isScoreVisible] = useScrollAnimation({ threshold: 0.2 })
  const [progressRef, isProgressVisible] = useScrollAnimation({ threshold: 0.2 })
  const [reviewRef, isReviewVisible] = useScrollAnimation({ threshold: 0.2 })
  const [buttonsRef, isButtonsVisible] = useScrollAnimation({ threshold: 0.2 })
  
  const { questions = [], selectedAnswers = {}, score = 0, difficulty = 'medium', timeSpent = 0 } = location.state || {}
  
  // Calculate smart score with difficulty and time bonuses
  const smartScore = calculateSmartScore(questions, selectedAnswers, difficulty, timeSpent)
  
  if (!questions.length) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="tech-grid"></div>
        <div className="card-minimal text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-4xl">🤔</div>
          </div>
          <h2 className="text-h2 mb-4">No Results Found</h2>
          <p className="text-body text-gray-600 mb-6">It looks like you haven't completed a quiz yet.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const totalQuestions = questions.length
  const percentage = smartScore.percentage
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    if (percentage >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const scoreMessage = getScoreMessage(percentage, difficulty)
  const scoreInfo = {
    title: scoreMessage.split('!')[0] + '!',
    emoji: scoreMessage.match(/[🌟🎉👏👍😊💪🏆🧠]/)?.[0] || '🎯',
    message: scoreMessage
  }

  const restartQuiz = () => {
    navigate('/quiz')
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen tech-bg">
      <div className="tech-grid"></div>
      <div className="container-minimal py-8">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`card-primary text-center mb-8 ${
            isHeaderVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goHome}
              className="btn-ghost text-white hover:bg-white/20"
              aria-label="Go back to home page"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={restartQuiz}
              className="btn-ghost text-white hover:bg-white/20"
              aria-label="Restart quiz"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-h1 text-white mb-2">{scoreInfo.title}</h1>
            <p className="text-body text-gray-200">{scoreInfo.message}</p>
          </div>
        </div>

        {/* Score Overview */}
        <div 
          ref={scoreRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ${
            isScoreVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <div className="card-minimal text-center hover-lift">
            <div className={`text-4xl font-bold mb-2 text-green-600`}>{score}</div>
            <div className="text-caption mb-2">Correct Answers</div>
            <div className="badge-minimal badge-light">
              <CheckCircle className="w-3 h-3 mr-1" />
              {Math.round((score / totalQuestions) * 100)}%
            </div>
          </div>
          
          <div className="card-minimal text-center hover-lift">
            <div className="text-4xl font-bold mb-2 text-red-600">{totalQuestions - score}</div>
            <div className="text-caption mb-2">Incorrect Answers</div>
            <div className="badge-minimal badge-light">
              <XCircle className="w-3 h-3 mr-1" />
              {Math.round(((totalQuestions - score) / totalQuestions) * 100)}%
            </div>
          </div>
          
          <div className="card-minimal text-center hover-lift">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor()}`}>{smartScore.totalScore}</div>
            <div className="text-caption mb-2">Smart Score</div>
            <div className="badge-minimal badge-light">
              <Star className="w-3 h-3 mr-1" />
              {percentage}%
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
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-h3">Overall Performance</h3>
              <div className="badge-minimal badge-light">
                {score}/{totalQuestions} questions
              </div>
            </div>
            <div className="progress-minimal">
              <div 
                className="progress-fill" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-caption">
              <span>0%</span>
              <span className="font-semibold">{percentage}% Complete</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div 
          ref={reviewRef}
          className={`card-minimal mb-8 ${
            isReviewVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <h3 className="text-h3 mb-6">Question Review</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-6">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id]
              const isCorrect = userAnswer === question.correctAnswer
              
              return (
                <button
                  key={question.id}
                  onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-200 hover-scale ${
                    isCorrect 
                      ? 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' 
                      : 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200'
                  } ${selectedQuestion === index ? 'ring-2 ring-blue-300 scale-110' : 'hover:scale-105'}`}
                >
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 mx-auto" />
                  ) : (
                    <XCircle className="w-5 h-5 mx-auto" />
                  )}
                </button>
              )
            })}
          </div>
          
          <div className="flex items-center justify-center gap-6 text-caption">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-2 h-2 text-white" />
              </div>
              <span className="font-medium">{score} Correct</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-2 h-2 text-white" />
              </div>
              <span className="font-medium">{totalQuestions - score} Incorrect</span>
            </div>
          </div>
        </div>

        {/* Question Detail Modal */}
        {selectedQuestion !== null && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedQuestion(null)}
          >
            <div 
              className="card-minimal w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    questions[selectedQuestion] && selectedAnswers[questions[selectedQuestion].id] === questions[selectedQuestion].correctAnswer
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    <span className="text-sm font-bold">{selectedQuestion + 1}</span>
                  </div>
                  <h3 className="text-h3">
                    Question {selectedQuestion + 1}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="btn-ghost p-2"
                >
                  <span className="text-lg">✕</span>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                {(() => {
                  const question = questions[selectedQuestion]
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  const userAnswerText = userAnswer !== undefined ? question.options[userAnswer] : 'Not answered'
                  const correctAnswerText = question.options[question.correctAnswer]
                  
                  return (
                    <div className="space-y-4">
                      {/* Question Info */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="badge-minimal badge-light">
                          {question.category}
                        </span>
                        <span className="badge-minimal badge-light capitalize">
                          {question.difficulty}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      </div>
                      
                      {/* Question */}
                      <div className="card-minimal">
                        <p className="text-body font-medium leading-relaxed">{question.question}</p>
                      </div>
                      
                      {/* Your Answer */}
                      <div className={`card-minimal ${
                        isCorrect ? 'border-green-200' : 'border-red-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <div className="text-caption font-semibold">Your Answer:</div>
                        </div>
                        <div className={`text-caption font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {userAnswerText}
                        </div>
                      </div>
                      
                      {/* Correct Answer (if wrong) */}
                      {!isCorrect && (
                        <div className="card-minimal border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <div className="text-caption font-semibold">Correct Answer:</div>
                          </div>
                          <div className="text-caption font-medium text-green-700">{correctAnswerText}</div>
                        </div>
                      )}
                      
                      {/* Educational Insight */}
                      <div className="card-minimal border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <div className="text-caption font-semibold">Key Insight:</div>
                        </div>
                        <div className="text-caption text-gray-600">
                          {(() => {
                            const questionText = question.question.toLowerCase()
                            const category = question.category.toLowerCase()
                            
                            if (category.includes('science') || category.includes('biology')) {
                              return isCorrect 
                                ? "Excellent! This scientific concept is fundamental to understanding how living organisms function."
                                : "This is a key scientific principle. Understanding this helps explain many biological processes."
                            } else if (category.includes('history')) {
                              return isCorrect
                                ? "Well done! This historical event shaped the course of human civilization."
                                : "This historical period was crucial for understanding modern society and culture."
                            } else if (category.includes('geography')) {
                              return isCorrect
                                ? "Great! Geographic knowledge helps us understand our world and its diverse cultures."
                                : "Geography connects us to different places, climates, and ways of life around the globe."
                            } else if (category.includes('mathematics') || category.includes('math')) {
                              return isCorrect
                                ? "Perfect! Mathematical concepts like this form the foundation of logical thinking."
                                : "Math helps develop critical thinking skills and problem-solving abilities."
                            } else if (category.includes('art') || category.includes('literature')) {
                              return isCorrect
                                ? "Wonderful! This artistic work represents important cultural and creative expression."
                                : "Art and literature reflect human creativity and help us understand different perspectives."
                            } else if (category.includes('sports')) {
                              return isCorrect
                                ? "Nice! Sports knowledge shows understanding of physical activity and competition."
                                : "Sports teach us about teamwork, discipline, and the importance of physical fitness."
                            } else if (category.includes('technology') || category.includes('computer')) {
                              return isCorrect
                                ? "Excellent! Technology knowledge is essential in our digital world."
                                : "Understanding technology helps us navigate and contribute to our modern society."
                            } else {
                              return isCorrect
                                ? "Great job! This knowledge helps broaden your understanding of the world."
                                : "Every question is a learning opportunity to expand your knowledge and perspective."
                            }
                          })()}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div 
          ref={buttonsRef}
          className={`space-y-3 ${
            isButtonsVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <button 
            onClick={restartQuiz} 
            className="btn-primary w-full text-lg py-4 hover-scale"
          >
            <RotateCcw className="w-5 h-5" />
            Take Another Quiz
          </button>
          <button 
            onClick={goHome} 
            className="btn-secondary w-full text-lg py-4 hover-scale"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results