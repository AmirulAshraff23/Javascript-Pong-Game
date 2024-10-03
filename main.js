// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2; // Center the paddle
const paddleSpeed = 7; // Speed of paddle movement

// Ball properties
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

// Player control
let rightPressed = false;
let leftPressed = false;

// Function to reset the ball
function resetBall() {
    ballX = canvas.width / 2; // Reset to the middle
    ballY = canvas.height - 30; // Near the paddle, above the bottom
    ballSpeedX = 2; // Reset speed
    ballSpeedY = -2;
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
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

// Move paddle based on key inputs
function movePaddle() {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += paddleSpeed; // Move paddle right
    }
    if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed; // Move paddle left
    }
}

// Handle keydown event
document.addEventListener("keydown", function(event) {
    if (event.key === "Right" || event.key === "ArrowRight" || event.key === "d") {
        rightPressed = true;
    }
    if (event.key === "Left" || event.key === "ArrowLeft" || event.key === "a") {
        leftPressed = true;
    }
});

// Handle keyup event
document.addEventListener("keyup", function(event) {
    if (event.key === "Right" || event.key === "ArrowRight" || event.key === "d") {
        rightPressed = false;
    }
    if (event.key === "Left" || event.key === "ArrowLeft" || event.key === "a") {
        leftPressed = false;
    }
});

function draw() {
    // Clear the canvas to redraw the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the paddle based on key input
    movePaddle();

    // Draw paddle and ball
    drawPaddle();
    drawBall();

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

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

    // Ball collision detection with the paddle
    if (ballY + ballRadius > canvas.height - paddleHeight - 10 && // Check if ball is at paddle level
        ballX > paddleX && // Check if ball is within paddle width
        ballX < paddleX + paddleWidth) {
        // Calculate where the ball hits the paddle
        let hitPosition = (ballX - paddleX) / paddleWidth; // Normalize hit position (0 to 1)

        // Adjust ballSpeedX based on hit position
        if (hitPosition < 0.5) {
            ballSpeedX = -2; // Hit the left half of the paddle
        } else if (hitPosition > 0.5) {
            ballSpeedX = 2; // Hit the right half of the paddle
        }
        
        ballSpeedY = -ballSpeedY; // Reverse ball direction on y-axis
        ballY = canvas.height - paddleHeight - 10 - ballRadius; // Position the ball above the paddle
    }

    // Keep drawing the scene over and over
    requestAnimationFrame(draw);
}

// Start the draw loop
draw();
