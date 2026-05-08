// Canvas setup
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 12;
const paddleHeight = 100;
const ballSize = 8;
const gameWidth = canvas.width;
const gameHeight = canvas.height;

// Player paddle (left)
const player = {
    x: 20,
    y: gameHeight / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 6,
    mouseY: 0,
    useKeyboard: false
};

// Computer paddle (right)
const computer = {
    x: gameWidth - 20 - paddleWidth,
    y: gameHeight / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 4
};

// Ball
const ball = {
    x: gameWidth / 2,
    y: gameHeight / 2,
    dx: 5,
    dy: 5,
    radius: ballSize,
    speed: 5
};

// Game state
let gameRunning = false;
let playerScore = 0;
let computerScore = 0;

// Event listeners
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    player.mouseY = e.clientY - rect.top;
});

document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        gameRunning = !gameRunning;
    }
    if (e.key === 'ArrowUp') {
        player.useKeyboard = true;
        player.dy = -player.speed;
    }
    if (e.key === 'ArrowDown') {
        player.useKeyboard = true;
        player.dy = player.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dy = 0;
    }
});

// Update functions
function updatePlayerPaddle() {
    if (!player.useKeyboard) {
        // Use mouse position
        const targetY = player.mouseY - paddleHeight / 2;
        player.y = Math.max(0, Math.min(targetY, gameHeight - paddleHeight));
    } else {
        // Use keyboard
        player.y += player.dy;
        player.y = Math.max(0, Math.min(player.y, gameHeight - paddleHeight));
    }
}

function updateComputerPaddle() {
    const computerCenter = computer.y + paddleHeight / 2;
    const ballCenter = ball.y;

    // Simple AI: track the ball with some offset
    if (computerCenter < ballCenter - 10) {
        computer.y += computer.speed;
    } else if (computerCenter > ballCenter + 10) {
        computer.y -= computer.speed;
    }

    computer.y = Math.max(0, Math.min(computer.y, gameHeight - paddleHeight));
}

function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom wall collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > gameHeight) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(ball.y, gameHeight - ball.radius));
    }

    // Paddle collision - Player
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.radius;

        // Add spin based on where the ball hits the paddle
        const hitPos = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
        ball.dy += hitPos * 3;
    }

    // Paddle collision - Computer
    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.radius;

        // Add spin based on where the ball hits the paddle
        const hitPos = (ball.y - (computer.y + computer.height / 2)) / (computer.height / 2);
        ball.dy += hitPos * 3;
    }

    // Score detection
    if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
        document.getElementById('computerScore').textContent = computerScore;
    }

    if (ball.x + ball.radius > gameWidth) {
        playerScore++;
        resetBall();
        document.getElementById('playerScore').textContent = playerScore;
    }

    // Cap ball speed
    const maxSpeed = 8;
    ball.dy = Math.max(-maxSpeed, Math.min(ball.dy, maxSpeed));
}

function resetBall() {
    ball.x = gameWidth / 2;
    ball.y = gameHeight / 2;
    const angle = (Math.random() - 0.5) * Math.PI / 4;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.dy = ball.speed * Math.sin(angle);
}

// Draw functions
function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.strokeRect(x, y, width, height);
    ctx.shadowBlur = 0;
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawCenterLine() {
    ctx.strokeStyle = '#00ff00';
    ctx.setLineDash([10, 10]);
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(gameWidth / 2, 0);
    ctx.lineTo(gameWidth / 2, gameHeight);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    // Draw center line
    drawCenterLine();

    // Draw paddles
    drawRect(player.x, player.y, player.width, player.height, '#00ff00');
    drawRect(computer.x, computer.y, computer.width, computer.height, '#00ff00');

    // Draw ball
    drawCircle(ball.x, ball.y, ball.radius, '#00ff00');

    // Draw pause message
    if (!gameRunning) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, gameWidth, gameHeight);
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 30px Courier New';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10;
        ctx.fillText('PRESS SPACE TO START', gameWidth / 2, gameHeight / 2);
        ctx.shadowBlur = 0;
    }
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        updatePlayerPaddle();
        updateComputerPaddle();
        updateBall();
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();