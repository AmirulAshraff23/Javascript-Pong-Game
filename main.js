// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
let paddleWidth = 100;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2; // Center the paddle
let paddleY = canvas.height - paddleHeight - 10; // Paddle position from the bottom

// Ball properties
let ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

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

    // Move the ball
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
        // Log game over
        console.log("Ball hit the death zone! Game over.");

        // Reset the ball to be on top of the paddle
        ballX = paddleX + paddleWidth / 2; // Center on the paddle
        ballY = paddleY - ballRadius;      // Just above the paddle

        // Optionally reset ball speed to 0
        ballSpeedX = 0;
        ballSpeedY = 0;

        return; // Stop the draw loop (optional)
    }

    // This keeps drawing the scene over and over
    requestAnimationFrame(draw);
}

// Start the draw loop
draw();
