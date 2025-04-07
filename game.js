const player = document.getElementById("player");
const sans = document.getElementById("sans");
const startButton = document.getElementById("start-btn");
const playerHealthBar = document.getElementById("player-health");
const sansHealthBar = document.getElementById("sans-health");

let playerHealth = 100;
let sansHealth = 100;
let gameInterval;
let attackInterval;
let bullets = [];
let gameStarted = false;

// Start the game
startButton.addEventListener("click", startGame);

function startGame() {
  playerHealth = 100;
  sansHealth = 100;
  playerHealthBar.style.width = `${playerHealth}%`;
  sansHealthBar.style.width = `${sansHealth}%`;
  gameStarted = true;
  startButton.disabled = true;
  bullets = [];
  movePlayerToCenter();
  gameInterval = setInterval(gameLoop, 50);
  attackInterval = setInterval(generateAttack, 2000); // Spawn attacks every 2 seconds
}

function gameLoop() {
  moveBullets();
  checkCollisions();
  if (sansHealth <= 0) {
    alert("You defeated Sans!");
    endGame();
  }
  if (playerHealth <= 0) {
    alert("You were defeated by Sans...");
    endGame();
  }
}

function movePlayerToCenter() {
  player.style.left = "50%";
}

function movePlayer(e) {
  if (!gameStarted) return;
  const playerPos = player.getBoundingClientRect();
  const container = document.querySelector(".game-container").getBoundingClientRect();

  if (e.key === "ArrowLeft" && playerPos.left > container.left) {
    player.style.left = `${playerPos.left - 5}px`;
  } else if (e.key === "ArrowRight" && playerPos.right < container.right) {
    player.style.left = `${playerPos.left + 5}px`;
  }
}

document.addEventListener("keydown", movePlayer);

// Sans attacks (blue and orange)
function generateAttack() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = `${Math.random() * (600 - 10)}px`;
  bullet.style.top = "0px";
  bullet.style.backgroundColor = Math.random() > 0.5 ? "blue" : "orange"; // Randomize attack color
  document.querySelector(".game-container").appendChild(bullet);
  bullets.push(bullet);
}

function moveBullets() {
  bullets.forEach((bullet, index) => {
    const top = parseInt(bullet.style.top, 10);
    bullet.style.top = `${top + 5}px`; // Bullet speed

    // Check if bullet reaches the player or goes off-screen
    if (top > 350) {
      if (checkCollisionWithPlayer(bullet)) {
        handlePlayerHit(bullet);
      }
      bullet.remove();
      bullets.splice(index, 1);
    }
  });
}

function checkCollisionWithPlayer(bullet) {
  const bulletPos = bullet.getBoundingClientRect();
  const playerPos = player.getBoundingClientRect();

  return (
    bulletPos.left < playerPos.right &&
    bulletPos.right > playerPos.left &&
    bulletPos.top < playerPos.bottom &&
    bulletPos.bottom > playerPos.top
  );
}

function handlePlayerHit(bullet) {
  if (bullet.style.backgroundColor === "blue") {
    playerHealth -= 10; // Blue attack deals damage
    playerHealthBar.style.width = `${playerHealth}%`;
  } else {
    playerHealth -= 5; // Orange attack deals less damage
    playerHealthBar.style.width = `${playerHealth}%`;
  }
}

function checkCollisions() {
  const sansPos = sans.getBoundingClientRect();
  const playerPos = player.getBoundingClientRect();

  // Check for collision with Sans (if the player is close)
  if (
    playerPos.left < sansPos.right &&
    playerPos.right > sansPos.left &&
    playerPos.top < sansPos.bottom &&
    playerPos.bottom > sansPos.top
  ) {
    sansHealth -= 5;
    sansHealthBar.style.width = `${sansHealth}%`;
  }
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(attackInterval);
  gameStarted = false;
  startButton.disabled = false;
}