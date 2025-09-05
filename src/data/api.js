// API integration for Open Trivia DB
// This is a great free API for trivia questions - no API key needed!
const API_BASE_URL = 'https://opentdb.com/api.php'

// Fetch questions from Open Trivia DB API
export const fetchQuestionsFromAPI = async (amount = 10, difficulty = 'medium', category = null) => {
  try {
    let url = `${API_BASE_URL}?amount=${amount}&type=multiple&encode=url3986`
    
    if (difficulty && difficulty !== 'any') {
      url += `&difficulty=${difficulty}`
    }
    
    if (category && category !== 'any') {
      url += `&category=${category}`
    }
    
    // Add random seed to get different questions each time
    url += `&timestamp=${Date.now()}`

    // Add timeout to prevent hanging requests - 10 seconds should be plenty
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.')
      } else if (response.status >= 500) {
        throw new Error('Server error. Please try again later.')
      } else {
        throw new Error(`Network error: ${response.status}`)
      }
    }
    
    const data = await response.json()
    
    if (data.response_code !== 0) {
      const errorMessages = {
        1: 'No results found for the specified parameters',
        2: 'Invalid parameter provided',
        3: 'Token not found',
        4: 'Token empty'
      }
      throw new Error(errorMessages[data.response_code] || 'API returned an error')
    }
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No questions available from the API')
    }
    
    // Transform API data to our internal format
    // The API returns correct answer separately, so we need to shuffle and track position
    return data.results.map((question, index) => ({
      id: index + 1,
      question: decodeHtmlEntities(question.question),
      options: [
        ...question.incorrect_answers.map(decodeHtmlEntities),
        decodeHtmlEntities(question.correct_answer)
      ].sort(() => Math.random() - 0.5), // Shuffle to make it more interesting
      correctAnswer: question.incorrect_answers.length, // Track where correct answer ended up
      difficulty: question.difficulty,
      category: question.category
    }))
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection.')
    }
    console.error('Error fetching questions from API:', error)
    throw error
  }
}

// Decode HTML entities in question text
const decodeHtmlEntities = (text) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

// Import local questions directly
import localQuestions from './questions.json'

// Fallback to local questions if API fails
export const getLocalQuestions = async () => {
  try {
    console.log('Loading local questions...')
    return localQuestions
  } catch (error) {
    console.error('Error loading local questions:', error)
    throw error
  }
}

// Main function to get questions (API first, then local fallback)
export const getQuestions = async (amount = 10, difficulty = 'medium', category = null) => {
  try {
    console.log('Attempting to fetch questions from API...')
    const questions = await fetchQuestionsFromAPI(amount, difficulty, category)
    console.log('Successfully fetched questions from API')
    return questions
  } catch (error) {
    console.log('API failed, falling back to local questions:', error.message)
    try {
      const allQuestions = await getLocalQuestions()
      console.log('Successfully loaded local questions')
      
      // Filter questions by difficulty if specified
      let filteredQuestions = allQuestions
      if (difficulty && difficulty !== 'any') {
        filteredQuestions = allQuestions.filter(q => q.difficulty === difficulty)
      }
      
      // If we don't have enough questions of the specified difficulty, use all questions
      if (filteredQuestions.length < amount) {
        console.log(`Not enough ${difficulty} questions, using all available questions`)
        filteredQuestions = allQuestions
      }
      
      // Shuffle and limit to requested amount
      const shuffled = filteredQuestions.sort(() => Math.random() - 0.5)
      return shuffled.slice(0, amount)
    } catch (localError) {
      console.error('Both API and local questions failed:', localError)
      throw new Error('Unable to load questions. Please check your internet connection and try again.')
    }
  }
}
