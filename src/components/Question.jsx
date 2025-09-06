import React, { useState, useEffect } from 'react'
import { CheckCircle, Circle, HelpCircle } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Question = ({ question, selectedAnswer, onAnswerSelect, questionNumber, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Scroll animations
  const [questionCardRef, isQuestionCardVisible] = useScrollAnimation({ threshold: 0.1 })
  const [optionsRef, isOptionsVisible] = useScrollAnimation({ threshold: 0.2 })

  if (!question) return null

  const handleOptionClick = (optionIndex) => {
    setIsAnimating(true)
    setSelectedOption(optionIndex)
    
    setTimeout(() => {
      onAnswerSelect(question.id, optionIndex)
      setIsAnimating(false)
    }, 150)
  }

  const handleKeyDown = (event, optionIndex) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOptionClick(optionIndex)
    }
  }

  return (
    <div className="flex-1 flex flex-col space-y-6">
      {/* Question Header */}
      <div 
        ref={questionCardRef}
        className={`card-minimal ${
          isQuestionCardVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
        }`}
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-2 mb-4">
            <span className="badge-minimal badge-light">
              {question.category}
            </span>
            <span className="badge-minimal badge-light capitalize">
              {question.difficulty}
            </span>
          </div>
          <h2 className="text-h2 leading-relaxed">
            {question.question}
          </h2>
        </div>
      </div>

      {/* Answer Options */}
      <div 
        ref={optionsRef}
        className={`space-y-3 flex-1 ${
          isOptionsVisible ? 'fade-in-on-scroll visible' : 'fade-in-on-scroll'
        }`}
      >
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCurrentlySelected = selectedOption === index
          
          return (
            <button
              key={index}
              className={`option-button ${
                isSelected ? 'selected' : ''
              } ${
                isCurrentlySelected && isAnimating ? 'scale-95' : 'scale-100'
              }`}
              onClick={() => handleOptionClick(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                    {isSelected && <CheckCircle className="w-4 h-4 text-gray-700" />}
                  </div>
                  <span className="text-left">{option}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Question Counter */}
      <div className="card-minimal text-center">
        <div className="flex items-center justify-center gap-2 text-caption">
          <HelpCircle className="w-4 h-4" />
          <span>Question {questionNumber} of {totalQuestions}</span>
        </div>
      </div>
    </div>
  )
}

export default Question