# 🧠 React Quiz App

A modern, responsive React quiz application with smart scoring, difficulty levels, and educational insights. Built with Vite, Tailwind CSS, and React Router.

## ✨ Features

###  Core Functionality
- **Smart Scoring System**: Difficulty and time-based bonus scoring
- **Multiple Difficulty Levels**: Easy (20s), Medium (30s), Hard (45s) with logical timing
- **Educational Insights**: Category-based learning explanations for each question
- **Real-time Progress**: Live score tracking and question navigation
- **Comprehensive Results**: Detailed breakdown with interactive question review

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first with desktop enhancements
- **Blue & White Theme**: Professional, clean aesthetic
- **Smooth Animations**: Fade-in, slide-up, and hover effects
- **Accessibility**: Full keyboard navigation and ARIA support
- **No-Scroll Mobile**: Perfect mobile experience without scrolling

###  Technical Features
- **Open Trivia DB API**: Fresh questions with proper randomization
- **Local JSON Fallback**: Backup questions when API is unavailable
- **React Router**: Multi-page navigation with clean URLs
- **State Management**: Efficient React hooks for all state
- **Error Handling**: Graceful fallback and user-friendly messages

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/react-quiz-app.git
   cd react-quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## ️ Project Structure

```
src/
├── components/              # React components
│   ├── Home.jsx            # Landing page with difficulty selection
│   ├── Quiz.jsx            # Main quiz logic and navigation
│   ├── Question.jsx        # Question display component
│   ├── Results.jsx         # Results page with educational insights
│   ├── DifficultySelector.jsx # Difficulty selection component
│   └── HighScores.jsx      # High scores modal
├── data/                   # Data management
│   ├── questions.json      # Local questions backup
│   ├── api.js             # API integration with randomization
│   └── scoring.js         # Smart scoring system
├── utils/                  # Utility functions
│   └── scoring.js         # Score calculation logic
├── App.jsx                # Main app component with routing
├── main.jsx               # App entry point
└── index.css              # Global styles and Tailwind
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6 (blue-600)
- **Background**: #f9fafb (gray-50)
- **Cards**: White with gray borders
- **Success**: Green for correct answers
- **Error**: Red for incorrect answers

### Typography
- **Primary Font**: Inter (system font)
- **Weights**: 400, 500, 600, 700

### Components
- **Cards**: Rounded corners (rounded-xl), subtle shadows
- **Buttons**: Blue primary, gray secondary with hover effects
- **Icons**: Lucide React icons for consistency

## 🧠 Smart Scoring System

The app features a unique scoring system that goes beyond simple correct/incorrect:

- **Base Score**: 10 points per correct answer
- **Difficulty Multiplier**: 
  - Easy: 1x points
  - Medium: 1.5x points  
  - Hard: 2x points
- **Time Bonus**: Faster answers get extra points
- **Smart Multiplier**: Overall performance boost

## 📱 Responsive Design

### Mobile (320px - 767px)
- No-scroll experience
- Compact layouts
- Touch-optimized buttons
- Single column layout

### Desktop (1024px+)
- Bordered container design
- Enhanced spacing
- Additional feature information
- Multi-column layouts

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab Navigation**: Full keyboard support
- **Arrow Keys**: Navigate between questions
- **Enter/Space**: Select answer options
- **Skip Links**: Quick navigation for screen readers

### Screen Reader Support
- **ARIA Labels**: Comprehensive labeling
- **Live Regions**: Dynamic content updates
- **Semantic HTML**: Proper heading structure
- **Focus Management**: Clear focus indicators

## 🚀 Deployment

### Netlify
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Configure redirects for SPA routing

### Vercel
1. Connect GitHub repository
2. Auto-deploy on push
3. No additional configuration needed

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 📄 Configuration

### API Settings
The app uses Open Trivia DB API with enhanced randomization:
- Multiple randomization parameters
- Cache-busting headers
- Proper error handling
- Local fallback questions

### Customization
- **Questions**: Modify `src/data/questions.json`
- **Styling**: Update `tailwind.config.js`
- **Scoring**: Adjust `src/utils/scoring.js`

## 🧪 Testing

### Manual Testing
- [ ] Quiz flow from start to finish
- [ ] Different difficulty levels
- [ ] Score calculation accuracy
- [ ] Educational insights display
- [ ] Responsive design
- [ ] Keyboard navigation
- [ ] Error handling

## 🔮 Future Enhancements

### Planned Features
- [ ] Question categories
- [ ] Sound effects
- [ ] Dark mode
- [ ] Multi-language support
- [ ] User accounts
- [ ] Question creation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

##  Acknowledgments

- [Open Trivia DB](https://opentdb.com/) for the question API
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the build tool

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
