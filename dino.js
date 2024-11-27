let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let scoreElement = document.getElementById("score");
let isJumping = false;
let score = 0;

// Fungsi untuk membuat dinosaurus melompat
function jumpDino() {
  if (isJumping) return;
  isJumping = true;
  let upInterval = setInterval(() => {
    let dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    if (dinoBottom >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (dinoBottom <= 50) {
          clearInterval(downInterval);
          isJumping = false;
        }
        dino.style.bottom = dinoBottom - 5 + "px";
        dinoBottom -= 5;
      }, 20);
    }
    dino.style.bottom = dinoBottom + 5 + "px";
    dinoBottom += 5;
  }, 20);
}

// Fungsi untuk memeriksa tabrakan
function checkCollision() {
  let dinoRect = dino.getBoundingClientRect();
  let cactusRect = cactus.getBoundingClientRect();

  if (
    dinoRect.right > cactusRect.left &&
    dinoRect.left < cactusRect.right &&
    dinoRect.bottom > cactusRect.top
  ) {
    showGameOverMessage();
    resetGame();
  }
}

// Fungsi untuk menampilkan pesan Game Over
function showGameOverMessage() {
  let gameOverMessage = document.createElement("div");
  gameOverMessage.className = "game-over";
  gameOverMessage.innerText = `Gak Tau Main Ya Bang? Your score: ${score}`;
  document.body.appendChild(gameOverMessage);

  // Menghapus pesan setelah 3 detik
  setTimeout(() => {
    document.body.removeChild(gameOverMessage);
  }, 3000);
}

// Fungsi untuk mereset permainan
function resetGame() {
  score = 0;
  scoreElement.innerText = "Score: 0";
  cactus.style.animation = "none";
  setTimeout(() => {
    cactus.style.animation = "";
  }, 10);
}

// Menambahkan skor setiap 100ms
setInterval(() => {
  checkCollision();
  score += 1;
  scoreElement.innerText = "Score: " + score;
}, 100);