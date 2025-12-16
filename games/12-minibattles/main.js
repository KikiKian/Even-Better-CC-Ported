const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let battle = 1;
let p1 = 0;
let p2 = 0;
let gameOver = false;

let rope = 0;            // battle 3
let canPress = false;   // battle 4
let spam1 = 0;          // battle 5
let spam2 = 0;

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
    ctx.fillRect(395, 150, 10, 200);
    ctx.fillRect(395 + rope, 230, 10, 40);
  }

  /* -------- BATTLE 4 -------- */
  if (battle === 4) {
    ctx.font = "32px Arial";
    ctx.fillText(canPress ? "GO!" : "WAIT...", 330, 240);
  }

  /* -------- BATTLE 5 -------- */
  if (battle === 5) {
    ctx.font = "28px Arial";
    ctx.fillText("Battle 5: SPAM!", 300, 80);
    ctx.fillText("Player 1: " + spam1, 220, 220);
    ctx.fillText("Player 2: " + spam2, 220, 260);
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  /* Battle 1 */
  if (battle === 1 && !gameOver) {
    if (key === "a") p1++;
    if (key === "l") p2++;
    if (p1 >= 10 || p2 >= 10) {
      gameOver = true;
      setTimeout(() => battle = 2, 1500);
    }
  }

  /* Battle 2 */
  else if (battle === 2) {
    if (key === "a") { alert("Player 2 Wins!"); battle = 3; }
    if (key === "l") { alert("Player 1 Wins!"); battle = 3; }
  }

  /* Battle 3 */
  else if (battle === 3) {
    if (key === "a") rope -= 10;
    if (key === "l") rope += 10;
    if (rope <= -150) { alert("Player 1 Wins!"); startBattle4(); }
    if (rope >= 150) { alert("Player 2 Wins!"); startBattle4(); }
  }

  /* Battle 4 */
  else if (battle === 4) {
    if (!canPress) {
      alert(key === "a" ? "Player 2 Wins!" : "Player 1 Wins!");
      startBattle5();
      return;
    }
    alert(key === "a" ? "Player 1 Wins!" : "Player 2 Wins!");
    startBattle5();
  }

  /* Battle 5 */
  else if (battle === 5) {
    if (key === "a") spam1++;
    if (key === "l") spam2++;

    if (spam1 >= 15) alert("Player 1 Wins!");
    if (spam2 >= 15) alert("Player 2 Wins!");
  }
});

function startBattle4() {
  battle = 4;
  rope = 0;
  canPress = false;

  setTimeout(() => {
    canPress = true;
  }, 1000 + Math.random() * 2000);
}

function startBattle5() {
  battle = 5;
  spam1 = 0;
  spam2 = 0;
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
