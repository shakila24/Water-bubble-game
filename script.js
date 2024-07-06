let score = 0;
let bubblesReachedTop = 0;
let gameActive = true; // Flag to track game state

const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');

// Function to create a new bubble
function createBubble() {
    if (!gameActive) return; // Stop creating bubbles if the game is inactive

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * (gameContainer.offsetWidth - bubble.offsetWidth)}px`; // Random horizontal position
    bubble.addEventListener('click', () => {
        handleBubbleClick(bubble);
    });
    gameContainer.appendChild(bubble);
    moveBubble(bubble);
}

// Function to handle bubble click
function handleBubbleClick(bubble) {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    gameContainer.removeChild(bubble);
}

// Function to move the bubble
function moveBubble(bubble) {
    let bubbleBottom = 0;
    const bubbleSpeed = 1; // Adjusted to control the bubble's upward speed

    const bubbleMoveInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(bubbleMoveInterval);
            return;
        }

        if (bubbleBottom >= gameContainer.offsetHeight) {
            clearInterval(bubbleMoveInterval);
            gameContainer.removeChild(bubble);
            bubblesReachedTop++;
            if (bubblesReachedTop <= 3) {
                score -= 5;
                scoreDisplay.textContent = `Score: ${score}`;
            }
            checkGameOver();
        } else {
            bubbleBottom += bubbleSpeed;
            bubble.style.bottom = `${bubbleBottom}px`;
        }
    }, 30); // Adjusted to control the bubble's upward speed
}

// Function to check if the game is over
function checkGameOver() {
    if (bubblesReachedTop > 3 || score <= 0) {
        score = Math.max(0, score); // Ensure score is not negative
        endGame();
    } else {
        createBubble();
    }
}

// Function to end the game
function endGame() {
    gameActive = false; // Set gameActive to false to stop creating new bubbles
    gameOverDisplay.classList.remove('hidden');
    finalScoreDisplay.textContent = `Final Score: ${score}`;
    gameOverDisplay.classList.add('animate-score-zero'); // Apply animation class
}

// Start the game by continuously creating new bubbles
function startGame() {
    createBubble(); // Start with the first bubble immediately
    setInterval(createBubble, 800); // Create new bubbles every 800ms
}

startGame();
