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
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let battle = 1;
let p1 = 0;
let p2 = 0;
let gameOver = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  if (battle === 1) {
    ctx.font = "28px Arial";
    ctx.fillText("Battle 1: First to 10 taps wins", 180, 80);
    ctx.fillText("Player 1 (A): " + p1, 200, 200);
    ctx.fillText("Player 2 (L): " + p2, 200, 260);

    if (gameOver) {
      ctx.font = "32px Arial";
      ctx.fillText(
        p1 > p2 ? "Player 1 Wins!" : "Player 2 Wins!",
        220,
        340
      );
      ctx.fillText("Next battle starting...", 230, 380);
    }
  }

  if (battle === 2) {
    ctx.font = "28px Arial";
    ctx.fillText("Battle 2: DO NOT PRESS", 230, 200);
    ctx.font = "20px Arial";
    ctx.fillText("First player to press loses", 240, 240);
  }
}

document.addEventListener("keydown", (e) => {
  if (battle === 1 && !gameOver) {
    if (e.key.toLowerCase() === "a") p1++;
    if (e.key.toLowerCase() === "l") p2++;

    if (p1 >= 10 || p2 >= 10) {
      gameOver = true;
      setTimeout(() => {
        battle = 2;
      }, 1500);
    }
  }

  if (battle === 2) {
    if (e.key.toLowerCase() === "a") alert("Player 2 Wins!");
    if (e.key.toLowerCase() === "l") alert("Player 1 Wins!");
  }
});

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let battle = 1;
let p1 = 0;
let p2 = 0;
let gameOver = false;
let rope = 0; // for tug of war

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  /* -------- BATTLE 1 -------- */
  if (battle === 1) {
    ctx.font = "28px Arial";
    ctx.fillText("Battle 1: First to 10 taps wins", 180, 80);
    ctx.fillText("Player 1 (A): " + p1, 200, 200);
    ctx.fillText("Player 2 (L): " + p2, 200, 260);

    if (gameOver) {
      ctx.font = "32px Arial";
      ctx.fillText(
        p1 > p2 ? "Player 1 Wins!" : "Player 2 Wins!",
        220,
        340
      );
    }
  }

  /* -------- BATTLE 2 -------- */
  if (battle === 2) {
    ctx.font = "28px Arial";
    ctx.fillText("Battle 2: DO NOT PRESS", 230, 200);
    ctx.font = "20px Arial";
    ctx.fillText("First player to press loses", 240, 240);
  }

  /* -------- BATTLE 3 -------- */
  if (battle === 3) {
    ctx.font = "28px Arial";
    ctx.fillText("Battle 3: Tug of War", 260, 80);

    // center line
    ctx.fillRect(395, 150, 10, 200);

    // rope position
    ctx.fillRect(395 + rope, 230, 10, 40);
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  /* Battle 1 input */
  if (battle === 1 && !gameOver) {
    if (key === "a") p1++;
    if (key === "l") p2++;

    if (p1 >= 10 || p2 >= 10) {
      gameOver = true;
      setTimeout(() => {
        battle = 2;
      }, 1500);
    }
  }

  /* Battle 2 input */
  else if (battle === 2) {
    if (key === "a") {
      alert("Player 2 Wins!");
      battle = 3;
    }
    if (key === "l") {
      alert("Player 1 Wins!");
      battle = 3;
    }
  }

  /* Battle 3 input */
  else if (battle === 3) {
    if (key === "a") rope -= 10;
    if (key === "l") rope += 10;

    if (rope <= -150) {
      alert("Player 1 Wins!");
      rope = 0;
    }

    if (rope >= 150) {
      alert("Player 2 Wins!");
      rope = 0;
    }
  }
});

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
