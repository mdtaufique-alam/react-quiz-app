import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Trophy, RotateCcw, Home, CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react'
import { calculateSmartScore, getScoreMessage, getDifficultyColor } from '../utils/scoring'

const Results = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  
  const { questions = [], selectedAnswers = {}, score = 0, difficulty = 'medium', timeSpent = 0 } = location.state || {}
  
  // Calculate smart score with difficulty and time bonuses
  const smartScore = calculateSmartScore(questions, selectedAnswers, difficulty, timeSpent)
  
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Design - Same as Home */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-20 w-40 h-40 bg-purple-100 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-100 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full opacity-30 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
        </div>
        
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl fade-in relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🤔</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h2>
              <p className="text-gray-600 mb-6">It looks like you haven't completed a quiz yet.</p>
              <button onClick={() => navigate('/')} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-lg">
                🏠 Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const totalQuestions = questions.length
  const percentage = smartScore.percentage
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-500 to-green-600'
    if (percentage >= 60) return 'from-yellow-500 to-yellow-600'
    if (percentage >= 40) return 'from-orange-500 to-orange-600'
    return 'from-red-500 to-red-600'
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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Design - Same as Home */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-100 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-purple-100 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-100 rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-purple-400 rounded-full opacity-30 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
      </div>
      
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl fade-in relative z-10">
        {/* Desktop Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 flex flex-col h-full">
          <div className="flex-1 flex flex-col">
        {/* Blue Header - Responsive */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 md:px-8 py-8 rounded-t-2xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goHome}
              className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
              aria-label="Go back to home page"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={restartQuiz}
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
                aria-label="Restart quiz"
              >
                <RotateCcw className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          
          {/* Achievement Display */}
          <div className="text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{scoreInfo.title}</h1>
            <p className="text-blue-100 text-sm">{scoreInfo.message}</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 -mt-4 mx-4 md:mx-6">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-6 h-full">
            {/* Success Rate Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                Last Quiz Success
              </div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                {score}/{totalQuestions}
              </div>
            </div>
            
            {/* Quiz Title */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Quiz Challenge</h2>
              <p className="text-gray-600 text-sm">Test your knowledge with engaging questions</p>
            </div>
            
            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{score}</div>
                <div className="text-xs text-gray-600">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{totalQuestions - score}</div>
                <div className="text-xs text-gray-600">Incorrect</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{smartScore.totalScore}</div>
                <div className="text-xs text-gray-600">Smart Score</div>
              </div>
            </div>

            {/* Question Review Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Review</h3>
              
              {/* Question Grid - Responsive */}
              <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-3 mb-4">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer
                  
                  return (
                    <button
                      key={question.id}
                      onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                      className={`group relative w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isCorrect 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-red-500 hover:bg-red-600'
                      } ${selectedQuestion === index ? 'ring-2 ring-blue-300 scale-110' : 'hover:scale-105'}`}
                    >
                      {/* Status Icon */}
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <XCircle className="w-5 h-5 text-white" />
                      )}
                      
                      {/* Question Number */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                        <span className="text-xs font-bold text-gray-800">{index + 1}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
              
              {/* Performance Summary */}
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{score} Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle className="w-2 h-2 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{totalQuestions - score} Incorrect</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Detail Modal - Minimalist */}
        {selectedQuestion !== null && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedQuestion(null)}
          >
            <div 
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Clean */}
              <div className="p-4 border-b border-primary-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      questions[selectedQuestion] && selectedAnswers[questions[selectedQuestion].id] === questions[selectedQuestion].correctAnswer
                        ? 'bg-success-500' 
                        : 'bg-error-500'
                    }`}>
                      <span className="text-white text-sm font-bold">{selectedQuestion + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary-800">
                      Question {selectedQuestion + 1}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedQuestion(null)}
                    className="btn-ghost p-2"
                  >
                    <span className="text-primary-600 text-lg">✕</span>
                  </button>
                </div>
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
                      {/* Question Info - Clean Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          {question.category}
                        </span>
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full capitalize">
                          {question.difficulty}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${isCorrect ? 'bg-success-500' : 'bg-error-500'}`}></div>
                      </div>
                      
                      {/* Question - Clean */}
                      <div className="card-minimal">
                        <p className="text-primary-800 font-medium leading-relaxed">{question.question}</p>
                      </div>
                      
                      {/* Your Answer - Clean Card */}
                      <div className={`card-minimal ${
                        isCorrect ? 'border-success-200' : 'border-error-200'
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-success-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-error-600" />
                          )}
                          <div className="text-sm font-semibold text-primary-700">Your Answer:</div>
                        </div>
                        <div className={`text-sm font-medium ${isCorrect ? 'text-success-700' : 'text-error-700'}`}>
                          {userAnswerText}
                        </div>
                      </div>
                      
                      {/* Correct Answer (if wrong) - Clean Card */}
                      {!isCorrect && (
                        <div className="card-minimal border-success-200">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-success-600" />
                            <div className="text-sm font-semibold text-primary-700">Correct Answer:</div>
                          </div>
                          <div className="text-sm font-medium text-success-700">{correctAnswerText}</div>
                        </div>
                      )}
                      
                      {/* Educational Insight - Clean Card */}
                      <div className="card-minimal border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-blue-600" />
                          <div className="text-sm font-semibold text-gray-700">Key Insight:</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {(() => {
                            // Generate educational insights based on question content
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

        {/* Action Buttons - Responsive */}
        <div className="p-4 md:p-6 space-y-3">
          <button 
            onClick={restartQuiz} 
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Take Another Quiz
          </button>
          <button 
            onClick={goHome} 
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
