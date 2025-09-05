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

    console.log('Fetching from URL:', url)

    // Add timeout to prevent hanging requests - 8 seconds should be plenty
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

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
    console.log('API Response:', data)
    
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
    return data.results.map((question, index) => {
      // Shuffle options and track correct answer position
      const allOptions = [
        ...question.incorrect_answers.map(decodeHtmlEntities),
        decodeHtmlEntities(question.correct_answer)
      ]
      const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)
      const correctAnswerIndex = shuffledOptions.findIndex(option => 
        option === decodeHtmlEntities(question.correct_answer)
      )
      
      return {
        id: `api_${Date.now()}_${index}`,
        question: decodeHtmlEntities(question.question),
        options: shuffledOptions,
        correctAnswer: correctAnswerIndex,
        difficulty: question.difficulty,
        category: question.category
      }
    })
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

// Local questions data - embedded directly to avoid import issues
const localQuestions = [
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris", "Madrid"],
    "correctAnswer": 2,
    "difficulty": "easy",
    "category": "Geography"
  },
  {
    "id": 2,
    "question": "Which planet is known as the Red Planet?",
    "options": ["Venus", "Mars", "Jupiter", "Saturn"],
    "correctAnswer": 1,
    "difficulty": "easy",
    "category": "Science"
  },
  {
    "id": 3,
    "question": "Who painted the Mona Lisa?",
    "options": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    "correctAnswer": 2,
    "difficulty": "medium",
    "category": "Art"
  },
  {
    "id": 4,
    "question": "What is the largest mammal in the world?",
    "options": ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    "correctAnswer": 1,
    "difficulty": "easy",
    "category": "Science"
  },
  {
    "id": 5,
    "question": "In which year did World War II end?",
    "options": ["1944", "1945", "1946", "1947"],
    "correctAnswer": 1,
    "difficulty": "medium",
    "category": "History"
  },
  {
    "id": 6,
    "question": "What is the chemical symbol for gold?",
    "options": ["Go", "Gd", "Au", "Ag"],
    "correctAnswer": 2,
    "difficulty": "medium",
    "category": "Science"
  },
  {
    "id": 7,
    "question": "Which programming language was created by Brendan Eich?",
    "options": ["Python", "Java", "JavaScript", "C++"],
    "correctAnswer": 2,
    "difficulty": "hard",
    "category": "Technology"
  },
  {
    "id": 8,
    "question": "What is the smallest country in the world?",
    "options": ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
    "correctAnswer": 1,
    "difficulty": "medium",
    "category": "Geography"
  },
  {
    "id": 9,
    "question": "Who wrote the novel '1984'?",
    "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    "correctAnswer": 0,
    "difficulty": "medium",
    "category": "Literature"
  },
  {
    "id": 10,
    "question": "What is the speed of light in a vacuum?",
    "options": ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
    "correctAnswer": 0,
    "difficulty": "hard",
    "category": "Science"
  },
  {
    "id": 11,
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "correctAnswer": 1,
    "difficulty": "easy",
    "category": "Mathematics"
  },
  {
    "id": 12,
    "question": "Which country has the most natural lakes?",
    "options": ["Russia", "Canada", "United States", "Finland"],
    "correctAnswer": 1,
    "difficulty": "medium",
    "category": "Geography"
  },
  {
    "id": 13,
    "question": "What is the hardest natural substance on Earth?",
    "options": ["Gold", "Diamond", "Iron", "Platinum"],
    "correctAnswer": 1,
    "difficulty": "easy",
    "category": "Science"
  },
  {
    "id": 14,
    "question": "Who composed 'The Four Seasons'?",
    "options": ["Bach", "Mozart", "Vivaldi", "Beethoven"],
    "correctAnswer": 2,
    "difficulty": "medium",
    "category": "Music"
  },
  {
    "id": 15,
    "question": "What is the largest organ in the human body?",
    "options": ["Liver", "Brain", "Skin", "Heart"],
    "correctAnswer": 2,
    "difficulty": "easy",
    "category": "Science"
  },
  {
    "id": 16,
    "question": "In which ocean is the Bermuda Triangle located?",
    "options": ["Pacific", "Atlantic", "Indian", "Arctic"],
    "correctAnswer": 1,
    "difficulty": "easy",
    "category": "Geography"
  },
  {
    "id": 17,
    "question": "What is the currency of Japan?",
    "options": ["Won", "Yuan", "Yen", "Dong"],
    "correctAnswer": 2,
    "difficulty": "easy",
    "category": "Geography"
  },
  {
    "id": 18,
    "question": "Which element has the chemical symbol 'O'?",
    "options": ["Osmium", "Oxygen", "Gold", "Silver"],
    "correctAnswer": 1,
    "difficulty": "easy",
    "category": "Science"
  },
  {
    "id": 19,
    "question": "What is the smallest prime number?",
    "options": ["0", "1", "2", "3"],
    "correctAnswer": 2,
    "difficulty": "medium",
    "category": "Mathematics"
  },
  {
    "id": 20,
    "question": "Who directed the movie 'Pulp Fiction'?",
    "options": ["Martin Scorsese", "Quentin Tarantino", "Steven Spielberg", "Christopher Nolan"],
    "correctAnswer": 1,
    "difficulty": "medium",
    "category": "Entertainment"
  }
]

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
    console.log('Attempting to fetch questions from Open Trivia DB API...')
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
