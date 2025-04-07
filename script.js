// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Variables
let player = { x: 400, y: 500, width: 50, height: 50, color: 'white' };
let projectiles = [];
let sans = { x: 350, y: 100, width: 100, height: 100, color: 'blue' };

// Draw Player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw Sans
function drawSans() {
    ctx.fillStyle = sans.color;
    ctx.fillRect(sans.x, sans.y, sans.width, sans.height);
}

// Animate Projectiles
function updateProjectiles() {
    projectiles.forEach((projectile, index) => {
        projectile.y += projectile.speed;
        if (projectile.y > canvas.height) {
            projectiles.splice(index, 1);
        }
    });
}

// Main Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawSans();
    updateProjectiles();
    requestAnimationFrame(gameLoop);
}
gameLoop();