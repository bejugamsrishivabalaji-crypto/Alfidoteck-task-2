// Quiz Application Logic

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);
let userName = '';
let userRoll = '';
let userEmail = '';

// ============================================
// PAGE 1: USER INFORMATION FORM
// ============================================

document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    userName = document.getElementById('fullName').value;
    userRoll = document.getElementById('rollNo').value;
    userEmail = document.getElementById('email').value;
    
    // Validate inputs
    if (!userName || !userRoll) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Display user info on quiz page
    document.getElementById('displayName').textContent = userName;
    document.getElementById('displayRoll').textContent = `Roll No: ${userRoll}`;
    
    // Set total questions
    document.getElementById('totalQuestions').textContent = quizData.length;
    
    // Transition to quiz page
    transitionPage(1);
});

// ============================================
// PAGE 2: QUIZ QUESTIONS
// ============================================

function displayQuestion() {
    const question = quizData[currentQuestion];
    const optionsContainer = document.getElementById('optionsContainer');
    
    // Update question number and text
    document.getElementById('qNumber').textContent = currentQuestion + 1;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Display options
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-label';
        
        // Apply color coding based on answer state
        if (userAnswers[currentQuestion] !== null) {
            if (index === question.correct) {
                optionDiv.classList.add('correct');
            } else if (index === userAnswers[currentQuestion] && userAnswers[currentQuestion] !== question.correct) {
                optionDiv.classList.add('wrong');
            }
        }
        
        optionDiv.innerHTML = `
            <input type="radio" name="answer" value="${index}" ${userAnswers[currentQuestion] === index ? 'checked' : ''} onchange="selectAnswer(${index})">
            <span class="option-checkbox"></span>
            <span class="option-text">${option}</span>
        `;
        
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = currentQuestion === 0;
    document.getElementById('nextBtn').textContent = currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next →';
    
    // Reset reminder
    document.getElementById('reminderSection').style.display = 'none';
    
    // Update button states
    updateButtonStates();
    
    // Update preview
    updatePreview();
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.option-label');
    
    // Remove previous selections
    options.forEach(opt => opt.classList.remove('correct', 'wrong'));
    
    // Add color coding
    if (index === question.correct) {
        options[index].classList.add('correct');
    } else {
        options[index].classList.add('wrong');
    }
    
    updateButtonStates();
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        if (userAnswers[currentQuestion] === null) {
            showReminder();
            return;
        }
        currentQuestion++;
        displayQuestion();
    } else {
        // Finish quiz
        if (userAnswers[currentQuestion] === null) {
            showReminder();
            return;
        }
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
}

function skipQuestion() {
    if (userAnswers[currentQuestion] === null) {
        userAnswers[currentQuestion] = -1; // -1 means skipped
    } else {
        userAnswers[currentQuestion] = -1;
    }
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showReminder() {
    const reminderSection = document.getElementById('reminderSection');
    reminderSection.style.display = 'block';
    
    // Auto-hide after 3 seconds if no action taken
    setTimeout(() => {
        reminderSection.style.display = 'none';
    }, 4000);
}

function togglePreview() {
    const previewPanel = document.getElementById('previewPanel');
    const toggleText = document.getElementById('previewToggleText');
    
    if (previewPanel.style.display === 'none') {
        previewPanel.style.display = 'block';
        toggleText.textContent = '📋 Hide Preview';
    } else {
        previewPanel.style.display = 'none';
        toggleText.textContent = '📋 Show Preview';
    }
}

function updatePreview() {
    const previewContent = document.getElementById('previewContent');
    previewContent.innerHTML = '';
    
    quizData.forEach((_, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        // Add status class
        if (userAnswers[index] === null) {
            previewItem.textContent = `Q${index + 1} - Not Answered`;
        } else if (userAnswers[index] === -1) {
            previewItem.classList.add('skipped');
            previewItem.textContent = `Q${index + 1} - Skipped`;
        } else if (userAnswers[index] === quizData[index].correct) {
            previewItem.classList.add('answered');
            previewItem.textContent = `Q${index + 1} - Correct ✓`;
        } else {
            previewItem.classList.add('wrong');
            previewItem.textContent = `Q${index + 1} - Wrong ✗`;
        }
        
        previewItem.onclick = () => {
            currentQuestion = index;
            displayQuestion();
        };
        
        previewContent.appendChild(previewItem);
    });
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    
    // Enable/disable next button based on current answer
    if (userAnswers[currentQuestion] === null) {
        nextBtn.style.opacity = '0.6';
    } else {
        nextBtn.style.opacity = '1';
    }
}

// ============================================
// PAGE 3: RESULTS
// ============================================

function showResults() {
    // Calculate statistics
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;
    let answeredCount = 0;
    
    userAnswers.forEach((answer, index) => {
        if (answer === -1) {
            skippedCount++;
        } else if (answer === null) {
            // Not answered
        } else {
            answeredCount++;
            if (answer === quizData[index].correct) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        }
    });
    
    // Calculate percentage
    const totalAnswered = answeredCount + incorrectCount + skippedCount;
    const percentage = totalAnswered > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    
    // Update stats
    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('totalAnswered').textContent = totalAnswered;
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('incorrectCount').textContent = incorrectCount;
    document.getElementById('skippedCount').textContent = skippedCount;
    
    // Update score circle
    updateScoreCircle(percentage);
    
    // Generate detailed review
    generateDetailedReview();
    
    // Transition to results page
    transitionPage(2);
}

function updateScoreCircle(percentage) {
    const circumference = 2 * Math.PI * 45; // r=45
    const offset = circumference - (percentage / 100) * circumference;
    
    const svg = document.getElementById('scoreCircle');
    svg.style.strokeDasharray = circumference;
    svg.style.strokeDashoffset = offset;
}

function generateDetailedReview() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Determine status
        let status = 'skipped';
        if (userAnswer === -1) {
            status = 'skipped';
            reviewItem.classList.add('skipped');
        } else if (userAnswer === null) {
            status = 'skipped';
            reviewItem.classList.add('skipped');
        } else if (userAnswer === question.correct) {
            status = 'correct';
            reviewItem.classList.add('correct');
        } else {
            status = 'wrong';
            reviewItem.classList.add('wrong');
        }
        
        let statusIcon = '⊘';
        if (status === 'correct') statusIcon = '✓';
        if (status === 'wrong') statusIcon = '✗';
        
        reviewItem.innerHTML = `
            <div class="review-question">
                ${statusIcon} Question ${index + 1}: ${question.question}
            </div>
            <div class="review-options">
                ${question.options.map((option, i) => `
                    <div class="review-option ${i === question.correct ? 'correct-answer' : ''} ${i === userAnswer && userAnswer !== -1 && userAnswer !== null ? 'user-answer' : ''}">
                        ${i === question.correct ? '✓ ' : ''}${i === userAnswer && userAnswer !== -1 && userAnswer !== null ? '📍 Your Answer: ' : ''}${option}
                    </div>
                `).join('')}
            </div>
            <div class="review-explanation">
                <div class="explanation-title">📖 Explanation:</div>
                ${question.explanation}
            </div>
        `;
        
        reviewContent.appendChild(reviewItem);
    });
}

// ============================================
// PAGE TRANSITIONS
// ============================================

function transitionPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const pages = document.querySelectorAll('.page');
    pages[pageNumber].classList.add('active');
    
    // Initialize quiz on page 2
    if (pageNumber === 1) {
        displayQuestion();
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function restartQuiz() {
    // Reset variables
    currentQuestion = 0;
    userAnswers = new Array(quizData.length).fill(null);
    
    // Go back to page 1
    transitionPage(0);
    
    // Clear form
    document.getElementById('userForm').reset();
}

function goHome() {
    restartQuiz();
}

function exitApp() {
    if (confirm('Are you sure you want to exit?')) {
        alert('Thank you for taking the quiz!');
        window.location.href = 'about:blank';
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

window.addEventListener('load', function() {
    // Add gradient defs for SVG
    const svg = document.querySelector('.score-svg');
    if (svg && !document.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
            </linearGradient>
        `;
        svg.appendChild(defs);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        previousQuestion();
    } else if (event.key === 'ArrowRight') {
        nextQuestion();
    }
});
