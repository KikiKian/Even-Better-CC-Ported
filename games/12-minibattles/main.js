const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let p1 = 0;
let p2 = 0;
let gameOver = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "28px Arial";
  ctx.fillText("Battle 1: First to 10 taps wins", 180, 80);

  ctx.fillText("Player 1 (A): " + p1, 200, 200);
  ctx.fillText("Player 2 (L): " + p2, 200, 260);

  if (gameOver) {
    ctx.font = "36px Arial";
    ctx.fillText(
      p1 > p2 ? "Player 1 Wins!" : "Player 2 Wins!",
      220,
      350
    );
  }
}

document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  if (e.key.toLowerCase() === "a") p1++;
  if (e.key.toLowerCase() === "l") p2++;

  if (p1 >= 10 || p2 >= 10) {
    gameOver = true;
  }
});

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
