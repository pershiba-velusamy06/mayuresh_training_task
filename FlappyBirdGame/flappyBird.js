// Select the canvas element from the HTML
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); // Get the 2D drawing context from the canvas

// Bird object with properties for position, size, color, and physics
const bird = {
  x: 50, // Initial x-coordinate of the bird
  y: 300, // Initial y-coordinate of the bird
  width: 20, // Width of the bird
  height: 20, // Height of the bird
  color: 'yellow', // Color of the bird
  velocity: 0, // Bird's current velocity (speed with direction)
  gravity: 0.3,  // Gravity affects the bird's falling speed
  lift: -8,  // Lift is applied when the bird jumps, overcoming gravity
};

// Score initialization
let score = 5;  // Start with a higher score, it will increase as the bird passes pipes

// Game state: Determines whether the game is active or over
let gameOver = false; // A flag that tracks if the game is over

// Game Over Modal Elements
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

// Function to draw the bird on the canvas
function drawBird() {
  ctx.fillStyle = bird.color; // Set the fill color to the bird's color
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height); // Draw a rectangle for the bird
}

// Function to update the bird's position based on physics
function updateBird() {
  bird.velocity += bird.gravity; // Apply gravity to the bird's velocity (falling speed)
  bird.y += bird.velocity; // Update the bird's y-position based on velocity

  // Collision detection to keep the bird inside the canvas
  if (bird.y + bird.height > canvas.height) { // If the bird hits the ground
    bird.y = canvas.height - bird.height; // Place the bird on the ground
    bird.velocity = 0; // Stop the bird's downward movement
  }
  if (bird.y < 0) { // If the bird goes above the screen
    bird.y = 0; // Place the bird at the top
    bird.velocity = 0; // Stop upward movement
  }
}

// Event listener for the spacebar to make the bird jump
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !gameOver) { // If the spacebar is pressed and the game is not over
    bird.velocity = bird.lift;  // Apply lift to make the bird jump
  }
});

// Pipes properties
const pipes = []; // Array to store the pipes
const pipeWidth = 50; // Width of each pipe
const pipeGap = 200;  // Height of the gap between the top and bottom pipe
const pipeSpeed = 1;  // Speed at which pipes move towards the bird
let frameCount = 0; // To track how many frames have passed (used for pipe creation)

// Function to create a new pipe
function createPipe() {
  const pipeHeight = Math.random() * (canvas.height - pipeGap - 50) + 20; // Random height for the top pipe
  pipes.push({
    x: canvas.width, // The pipe starts from the right end of the canvas
    topHeight: pipeHeight, // The height of the top pipe
    bottomHeight: canvas.height - pipeHeight - pipeGap, // The remaining space at the bottom of the canvas
    passed: false, // Boolean to track if the pipe has been passed by the bird
  });
}

// Function to draw the pipes on the canvas
function drawPipes() {
  ctx.fillStyle = 'green'; // Set pipe color to green
  pipes.forEach((pipe) => { // Loop through all pipes
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight); // Draw the top pipe
    ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight); // Draw the bottom pipe
  });
}

// Function to update the pipes' position (move them leftwards)
function updatePipes() {
  pipes.forEach((pipe) => {
    pipe.x -= pipeSpeed; // Move each pipe towards the left
  });

  // If the pipe is completely off the screen, remove it from the pipes array
  if (pipes.length > 0 && pipes[0].x + pipeWidth < 0) {
    pipes.shift(); // Remove the first pipe
  }

  // Increase the frame count
  frameCount++;
  if (frameCount % 230 === 0) { // Every 230 frames, create a new pipe
    createPipe();
  }
}

// Function to check if the bird collides with any pipe
function checkCollision() {
  for (const pipe of pipes) {
    if (
      bird.x < pipe.x + pipeWidth && // If the bird's x-coordinate is within the pipe's width
      bird.x + bird.width > pipe.x && // If the bird's right side is within the pipe's width
      (bird.y < pipe.topHeight || bird.y + bird.height > canvas.height - pipe.bottomHeight) // If the bird touches the top or bottom pipe
    ) {
      gameOver = true; // Set the game over flag to true
      finalScoreElement.textContent = score;  // Display the final score in the modal
      gameOverModal.style.display = 'block';  // Show the game over modal
      return true; // Collision detected, return true
    }
  }
  return false; // No collision
}

// Function to update the score
function updateScore() {
  pipes.forEach((pipe) => {
    if (pipe.x + pipeWidth < bird.x && !pipe.passed) { // If the bird passes the pipe
      score++; // Increase the score
      pipe.passed = true; // Mark the pipe as passed
    }
  });
}

// Function to draw the score on the canvas
function drawScore() {
  ctx.font = '20px Arial'; // Set the font for the score text
  ctx.fillStyle = 'black'; // Set the text color to black
  ctx.fillText(`Score: ${score}`, 10, 20); // Draw the score text at position (10, 20)
}

// Function to restart the game
function restartGame() {
  gameOver = false; // Reset the game over flag
  score = 5;  // Reset the score to 5
  pipes.length = 0; // Clear all pipes
  bird.y = 300; // Reset the bird's position to the center
  bird.velocity = 0; // Reset the bird's velocity
  createPipe(); // Create the initial pipe
  gameOverModal.style.display = 'none';  // Hide the game over modal
  gameLoop(); // Start the game loop
}

// Event listener to restart the game when Enter key is pressed
window.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' && gameOver) { // If Enter is pressed and the game is over
    restartGame(); // Restart the game
  }
});

// Main game loop function
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before redrawing

  if (gameOver) {
    // Game over logic handled by the modal
  } else {
    drawBird(); // Draw the bird
    updateBird(); // Update the bird's position

    updatePipes(); // Move pipes
    drawPipes(); // Draw pipes

    updateScore(); // Update the score
    drawScore(); // Display the score

    checkCollision(); // Check for collisions with pipes
  }

  if (!gameOver) {
    requestAnimationFrame(gameLoop); // Continue the game loop if the game is not over
  }
}

// Create the initial pipe and start the game
createPipe();
gameLoop();
