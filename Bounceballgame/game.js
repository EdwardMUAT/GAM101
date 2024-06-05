const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BALL_SIZE = 20;
const ZONE_WIDTH = 100;
const ZONE_HEIGHT = HEIGHT;

let ballX = WIDTH / 2 - BALL_SIZE / 2;
let ballY = HEIGHT / 2 - BALL_SIZE / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

let scoreA = 0;
let scoreB = 0;

let gameRunning = true;
let playerAWins = false;
let playerBWins = false;

function drawTable() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Draw center line
    ctx.strokeStyle = 'black';
    ctx.setLineDash([5, 15]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();

    // Draw scoring zones
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, ZONE_WIDTH, ZONE_HEIGHT);
    
    ctx.fillStyle = 'blue';
    ctx.fillRect(WIDTH - ZONE_WIDTH, 0, ZONE_WIDTH, ZONE_HEIGHT);
}

function drawBall() {
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawScores() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Player A: ${scoreA}`, 10, 30);

    ctx.fillStyle = 'blue';
    ctx.fillText(`Player B: ${scoreB}`, WIDTH - 120, 30);
}

function drawGameOver() {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    const message = playerAWins ? 'Player A Wins!' : 'Player B Wins!';
    ctx.fillText(message, WIDTH / 2 - ctx.measureText(message).width / 2, HEIGHT / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Press SPACE to Restart', WIDTH / 2 - ctx.measureText('Press SPACE to Restart').width / 2, HEIGHT / 2 + 40);
}

function resetBall() {
    ballX = WIDTH / 2 - BALL_SIZE / 2;
    ballY = HEIGHT / 2 - BALL_SIZE / 2;
    ballSpeedX = -ballSpeedX;
}

function resetGame() {
    scoreA = 0;
    scoreB = 0;
    ballX = WIDTH / 2 - BALL_SIZE / 2;
    ballY = HEIGHT / 2 - BALL_SIZE / 2;
    ballSpeedX = 2;
    ballSpeedY = 2;
    gameRunning = true;
    playerAWins = false;
    playerBWins = false;
    draw();
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= HEIGHT - BALL_SIZE) {
        ballSpeedY = -ballSpeedY;
    }
}

function checkCollisions() {
    if (ballX <= ZONE_WIDTH) {
        scoreB++;
        if (scoreB >= 10) {
            gameRunning = false;
            playerBWins = true;
        } else {
            resetBall();
        }
    } else if (ballX >= WIDTH - ZONE_WIDTH - BALL_SIZE) {
        scoreA++;
        if (scoreA >= 10) {
            gameRunning = false;
            playerAWins = true;
        } else {
            resetBall();
        }
    }
}

function draw() {
    drawTable();
    drawBall();
    drawScores();

    if (!gameRunning) {
        drawGameOver();
    }
}

function gameLoop() {
    if (gameRunning) {
        moveBall();
        checkCollisions();
    }
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning && e.code === 'Space') {
        resetGame();
    }
});

gameLoop();
