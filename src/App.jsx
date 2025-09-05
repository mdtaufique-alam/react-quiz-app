import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from './components/Quiz'
import Home from './components/Home'
import Results from './components/Results'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
