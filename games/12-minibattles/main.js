const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let battle = 1;
let p1 = 0, p2 = 0;
let gameOver = false;

// Battle variables
let rope = 0;            // Battle 3
let canPress = false;    // Battle 4
let spam1 = 0, spam2 = 0;// Battle 5
let targetVisible = false;// Battle 6
let gravityY1 = 0, gravityY2 = 0; // Battle 7
let bounceY1 = 0, bounceY2 = 0, bounceDir1=1, bounceDir2=1; // Battle 8
let boxPos = 0;          // Battle 9
let freezeDone = false;  // Battle 10
let tapFast1 = 0, tapFast2 = 0; // Battle 11

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";

  switch(battle) {
    case 1:
      ctx.font="28px Arial";
      ctx.fillText("Battle 1: First to 10 taps",180,80);
      ctx.fillText("Player 1 (A): "+p1,200,200);
      ctx.fillText("Player 2 (L): "+p2,200,260);
      if(gameOver){ctx.font="32px Arial";ctx.fillText(p1>p2?"Player 1 Wins!":"Player 2 Wins!",220,340);}
      break;
    case 2:
      ctx.font="28px Arial";
      ctx.fillText("Battle 2: DO NOT PRESS!",230,200);
      ctx.font="20px Arial";
      ctx.fillText("First to press loses",240,240);
      break;
    case 3:
      ctx.font="28px Arial";
      ctx.fillText("Battle 3: Tug of War",260,80);
      ctx.fillRect(395,150,10,200);
      ctx.fillRect(395+rope,230,10,40);
      break;
    case 4:
      ctx.font="32px Arial";
      ctx.fillText(canPress?"GO!":"WAIT...",330,240);
      break;
    case 5:
      ctx.font="28px Arial";
      ctx.fillText("Battle 5: SPAM!",300,80);
      ctx.fillText("Player 1: "+spam1,220,220);
      ctx.fillText("Player 2: "+spam2,220,260);
      break;
    case 6:
      ctx.font="28px Arial";
      ctx.fillText("Battle 6: Aim for the target!",230,80);
      if(targetVisible){ctx.fillStyle="red";ctx.fillRect(390,210,20,20);}
      break;
    case 7:
      ctx.font="28px Arial";
      ctx.fillText("Battle 7: Gravity Escape!",230,80);
      ctx.fillRect(250,gravityY1,30,30);
      ctx.fillRect(520,gravityY2,30,30);
      break;
    case 8:
      ctx.font="28px Arial";
      ctx.fillText("Battle 8: Bounce!",300,80);
      ctx.fillRect(250,bounceY1,30,30);
      ctx.fillRect(520,bounceY2,30,30);
      break;
    case 9:
      ctx.font="28px Arial";
      ctx.fillText("Battle 9: Push the box!",300,80);
      ctx.fillRect(395,200+boxPos,10,40);
      break;
    case 10:
      ctx.font="28px Arial";
      ctx.fillText("Battle 10: Freeze!",300,80);
      ctx.fillText("Press last!",250,220);
      break;
    case 11:
      ctx.font="28px Arial";
      ctx.fillText("Battle 11: Tap Fast!",300,80);
      ctx.fillText("Player 1: "+tapFast1,220,220);
      ctx.fillText("Player 2: "+tapFast2,220,260);
      break;
    case 12:
      ctx.font="28px Arial";
      ctx.fillText("Battle 12: FINAL SHOWDOWN!",250,240);
      break;
  }
}

document.addEventListener("keydown",e=>{
  const key=e.key.toLowerCase();
  switch(battle){
    case 1:
      if(!gameOver){if(key==="a")p1++;if(key==="l")p2++;if(p1>=10||p2>=10){gameOver=true;setTimeout(()=>battle=2,1500);}}
      break;
    case 2:
      if(key==="a"){alert("Player 2 Wins!");battle=3;}
      if(key==="l"){alert("Player 1 Wins!");battle=3;}
      break;
    case 3:
      if(key==="a")rope-=10;if(key==="l")rope+=10;
      if(rope<=-150){alert("Player 1 Wins!");startBattle4();}
      if(rope>=150){alert("Player 2 Wins!");startBattle4();}
      break;
    case 4:
      if(!canPress){alert(key==="a"?"Player 2 Wins!":"Player 1 Wins!");startBattle5();return;}
      alert(key==="a"?"Player 1 Wins!":"Player 2 Wins!");startBattle5();
      break;
    case 5:
      if(key==="a")spam1++;if(key==="l")spam2++;
      if(spam1>=15){alert("Player 1 Wins!");startBattle6();}
      if(spam2>=15){alert("Player 2 Wins!");startBattle6();}
      break;
    case 6:
      if(!targetVisible)return;
      alert(key==="a"?"Player 1 Wins!":"Player 2 Wins!");startBattle7();
      break;
    case 7:
      if(key==="a")gravityY1-=20;if(key==="l")gravityY2-=20;
      if(gravityY1<=0){alert("Player 1 Wins!");startBattle8();}
      if(gravityY2<=0){alert("Player 2 Wins!");startBattle8();}
      break;
    case 8:
      if(key==="a")bounceDir1*=-1;if(key==="l")bounceDir2*=-1;
      break;
    case 9:
      if(key==="a")boxPos-=10;if(key==="l")boxPos+=10;
      if(boxPos<=-50){alert("Player 1 Wins!");startBattle10();}
      if(boxPos>=50){alert("Player 2 Wins!");startBattle10();}
      break;
    case 10:
      if(!freezeDone){freezeDone=true;alert(key==="a"?"Player 1 Wins!":"Player 2 Wins!");startBattle11();}
      break;
    case 11:
      if(key==="a")tapFast1++;if(key==="l")tapFast2++;
      if(tapFast1>=15){alert("Player 1 Wins!");startBattle12();}
      if(tapFast2>=15){alert("Player 2 Wins!");startBattle12();}
      break;
    case 12:
      alert(key==="a"?"Player 1 Wins FINAL!":"Player 2 Wins FINAL!");
      break;
  }
});

// Start next battles
function startBattle4(){battle=4;rope=0;canPress=false;setTimeout(()=>canPress=true,1000+Math.random()*2000);}
function startBattle5(){battle=5;spam1=0;spam2=0;}
function startBattle6(){battle=6;targetVisible=false;setTimeout(()=>targetVisible=true,1000+Math.random()*2000);}
function startBattle7(){battle=7;gravityY1=canvas.height-50;gravityY2=canvas.height-50;}
function startBattle8(){battle=8;bounceY1=200;bounceY2=200;bounceDir1=1;bounceDir2=1;}
function startBattle10(){battle=10;freezeDone=false;}
function startBattle11(){battle=11;tapFast1=0;tapFast2=0;}
function startBattle12(){battle=12;}

function loop(){
  if(battle===8){
    bounceY1+=bounceDir1*5;if(bounceY1<=0||bounceY1>=canvas.height-30)bounceDir1*=-1;
    bounceY2+=bounceDir2*5;if(bounceY2<=0||bounceY2>=canvas.height-30)bounceDir2*=-1;
  }
  draw();
  requestAnimationFrame(loop);
}

loop();

     
