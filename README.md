# 🎯 Premium Quiz Application

A beautiful, modern quiz application with stunning 3D animations, glassmorphism UI, and an intuitive user experience.

## 📁 Project Files

- **index.html** - Main HTML structure with 3 pages
- **styles.css** - Complete styling with animations and 3D effects
- **script.js** - Quiz logic and functionality
- **quiz-data.js** - 15 quiz questions with explanations

## ✨ Features

### Page 1: User Information
- Clean form to enter Name and Roll Number
- Optional email field
- Eye-catching gradient background with floating particles
- Start Quiz or Exit options

### Page 2: Quiz Interface
- 15 multiple-choice questions
- Color-coded answers:
  - 🟢 **Green** - Correct answers
  - 🔴 **Red** - Wrong answers
  - 🟡 **Yellow** - Skipped questions
- Navigation: Previous/Next/Skip buttons
- Question Preview panel to track progress
- Progress bar showing quiz completion
- Reminder alerts for unanswered questions
- Keyboard navigation (Arrow Left/Right)

### Page 3: Results & Review
- Score percentage with animated circle
- Statistics breakdown:
  - Total answered questions
  - Correct answers
  - Wrong answers
  - Skipped questions
- Detailed review of all questions
- Explanations for each answer
- Retake Quiz or Go Home options

## 🎨 Design Features

### Modern UI Components
- **Glassmorphism Design**: Semi-transparent frosted glass effect with blur
- **Animated Gradient Background**: Smooth color transitions (blue → purple → pink)
- **Floating Particles**: Dynamic background elements for depth
- **Smooth Animations**: Fade-in, scale-up, and transitions

### Button Effects
- Gradient colors (Primary: Blue → Purple)
- Hover glow effects with shadow enhancement
- Smooth lift animation on hover
- Active state feedback
- Bounce animation on click

### Typography
- Modern fonts: Poppins and Inter
- Readable hierarchy
- Gradient text for headings
- Smooth transitions

## 🚀 How to Use

1. **Open the Application**: Open `index.html` in any modern web browser
2. **Enter Your Details**: Fill in Name and Roll Number on the first page
3. **Take the Quiz**: 
   - Click on an answer option to select it
   - Use Previous/Next/Skip buttons to navigate
   - View the preview panel to track your progress
4. **Review Results**: 
   - See your score and statistics
   - Review each question with explanations
   - Retake the quiz if desired

## 💡 Quiz Questions

The quiz contains 15 diverse questions covering:
- Geography (capitals, landmarks)
- Astronomy (planets, space)
- Chemistry (elements, formulas)
- History (historical events)
- Biology (animals, organisms)
- General Knowledge

Each question includes:
- Multiple choice options
- Instant feedback (correct/wrong/skipped)
- Detailed explanation of the correct answer

## ⌨️ Keyboard Shortcuts

- **Arrow Left** - Previous Question
- **Arrow Right** - Next Question
- **Click on Preview Item** - Jump to that question

## 📱 Responsive Design

- Fully responsive on all devices
- Optimized for desktop, tablet, and mobile
- Smooth touch interactions
- Adaptive layouts

## 🎭 Color Scheme

```
Primary: #6366f1 (Indigo)
Secondary: #8b5cf6 (Purple)
Success: #10b981 (Green)
Warning: #f59e0b (Amber)
Danger: #ef4444 (Red)
Background: Dark gradient (Navy → Purple → Pink)
```

## 💾 Browser Compatibility

Works perfectly in:
- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## 📊 Customization Guide

### Add More Questions
Edit `quiz-data.js` and add new question objects:
```javascript
{
    question: "Your question here?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0, // Index of correct option
    explanation: "Explanation of why this is correct"
}
```

### Change Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... etc */
}
```

### Adjust Animation Speed
Modify animation durations in `styles.css`:
```css
animation: gradientShift 15s ease infinite; /* Change 15s */
```

## 🎯 Key Highlights

✅ 15 Complete Questions
✅ 3D Animations & Transitions
✅ Glassmorphism UI Design
✅ Color-Coded Answer Feedback
✅ Detailed Result Analysis
✅ Progress Tracking
✅ Beautiful Gradient Background
✅ Responsive Design
✅ Smooth Interactions
✅ Mobile Optimized

---

**Enjoy your Premium Quiz Application! 🚀**
