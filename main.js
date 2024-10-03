// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2; // Center the paddle
let paddleY = canvas.height - paddleHeight - 10; // Paddle position

// Ball properties
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Function to generate a random angle for the ball's direction
function getRandomSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to reset the ball with random speed
function resetBall() {
    ballX = paddleX + paddleWidth / 2; // Reset ball above the paddle
    ballY = paddleY - ballRadius;

    // Set random horizontal and vertical speeds
    ballSpeedX = getRandomSpeed(-3, 3); // Random speed between -3 and 3
    ballSpeedY = getRandomSpeed(-3, -2); // Ensure ball goes upwards (negative y)
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // Clear the canvas to redraw the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddle and ball
    drawPaddle();
    drawBall();

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY; // Now moving the ball on y-axis too

    // Ball collision detection with walls
    // Bounce off the left and right walls
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX; // Reverse ball direction on x-axis
    }

    // Ball collision detection with top wall
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY; // Reverse ball direction on y-axis
    }

    // Ball collision detection with bottom (death zone)
    if (ballY + ballRadius > canvas.height) {
        console.log("Ball hit the death zone! Resetting ball...");
        resetBall(); // Reset the ball instead of stopping the game
    }

    // Keep drawing the scene over and over
    requestAnimationFrame(draw);
}

// Start the draw loop
draw();
