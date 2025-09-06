import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Trophy, Clock, Users, Settings, Target, Timer, BarChart3, Play, Sparkles, ChevronDown } from 'lucide-react'
import DifficultySelector from './DifficultySelector'
import { useScrollAnimation, useStaggeredAnimation } from '../hooks/useScrollAnimation'

const Home = () => {
  const navigate = useNavigate()
  const [showDifficultySelector, setShowDifficultySelector] = useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium')
  const [showScrollPrompt, setShowScrollPrompt] = useState(true)
  
  // Scroll animations
  const [heroRef, isHeroVisible] = useScrollAnimation({ threshold: 0.3 })
  const [featuresRef, visibleFeatures] = useStaggeredAnimation(6, 150)
  const [ctaRef, isCtaVisible] = useScrollAnimation({ threshold: 0.2 })
  
  // Hide scroll prompt after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollPrompt(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const startQuiz = () => {
    navigate('/quiz', { state: { difficulty: selectedDifficulty } })
  }

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty)
  }

  return (
    <div className="min-h-screen tech-bg">
      {/* Tech-Inspired Background */}
      <div className="tech-grid"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-gray-50/80"></div>
      
      <div className="container-minimal relative z-10 py-16">
        {/* Scroll Prompt */}
        {showScrollPrompt && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="flex flex-col items-center" style={{ color: 'var(--muted-text)' }}>
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div 
          ref={heroRef}
          className={`text-center mb-16 ${
            isHeroVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 hover-scale">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-h1 mb-4">Quiz Challenge</h1>
            <p className="text-body max-w-2xl mx-auto" style={{ color: 'var(--secondary-text)' }}>
              Test your knowledge with engaging questions across multiple difficulty levels. 
              Challenge yourself and track your progress.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div 
          ref={featuresRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {[
            { icon: Clock, title: "Quick", desc: "Fast quizzes" },
            { icon: Trophy, title: "Track", desc: "Your progress" },
            { icon: Users, title: "For All", desc: "Everyone" },
            { icon: Target, title: "Smart", desc: "Scoring" },
            { icon: Timer, title: "Timer", desc: "Per question" },
            { icon: BarChart3, title: "Levels", desc: "Difficulty" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`card-minimal text-center hover-lift ${
                index < visibleFeatures ? 'scale-in visible' : 'scale-in'
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 hover-scale">
                <feature.icon className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-h3 text-sm mb-1">{feature.title}</h3>
              <p className="text-caption">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div 
          ref={ctaRef}
          className={`text-center space-y-4 ${
            isCtaVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
          }`}
        >
          <button 
            onClick={startQuiz}
            className="btn-primary text-lg px-8 py-4 hover-scale"
          >
            <Play className="w-5 h-5" />
            Start Quiz
            <Sparkles className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => setShowDifficultySelector(!showDifficultySelector)}
            className="btn-secondary text-lg px-8 py-4 hover-scale"
          >
            <Settings className="w-5 h-5" />
            Choose Difficulty
          </button>
          
          {showDifficultySelector && (
            <div className="card-minimal mt-6 animate-fade-in">
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
              />
            </div>
          )}
        </div>

        {/* How it Works Section */}
        <div className="mt-24">
          <h2 className="text-h2 text-center mb-12">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-h3 mb-2">Choose Difficulty</h3>
              <p className="text-body" style={{ color: 'var(--secondary-text)' }}>Select from Easy, Medium, or Hard difficulty levels</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-h3 mb-2">Answer Questions</h3>
              <p className="text-body" style={{ color: 'var(--secondary-text)' }}>Test your knowledge with carefully crafted questions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-h3 mb-2">View Results</h3>
              <p className="text-body" style={{ color: 'var(--secondary-text)' }}>Get detailed feedback and track your progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home