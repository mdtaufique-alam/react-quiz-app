import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from './components/Quiz'
import Home from './components/Home'
import Results from './components/Results'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
