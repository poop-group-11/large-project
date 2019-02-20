var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

var smallFishWidth = 75;
var smallFishHeight = 25;

var hookWidth = 25;
var hookHeight = 75;

//holdover variables
var fish1X = 0;
var fish1Y = (ctx.canvas.height)/2;
var fish1dX = 2;
var fish1dY = 2;

//more holdover variables
var hookX = (ctx.canvas.width)/2 - (hookWidth/2);
var hookY = 0;
var hookdX = 0;
var hookdY = 0;
var hooked = 0;

var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = true;
  } else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = true;
  } else if(e.key == "Down" || e.key == "ArrowDown"){
    downPressed = true;
  } else if(e.key == "Up" || e.key == "ArrowUp"){
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = false;
  } else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = false;
  } else if(e.key == "Down" || e.key == "ArrowDown"){
    downPressed = false;
  } else if(e.key == "Up" || e.key == "ArrowUp"){
    upPressed = false;
  }
}

function movement() {
  //X-Axis movement.
  if(hookX + hookdX < 0){
    hookX = 0;
    hookdX = 0;
  } else if(hookX + hookdX + hookWidth > ctx.canvas.width){
    hookX = ctx.canvas.width - hookWidth;
    hookdX = 0;
  } else {
    if(rightPressed && leftPressed){
      hookdX = 0;
    } else if (leftPressed){
      hookdX = -5;
    } else if (rightPressed){
      hookdX = 5;
    } else {
      hookdX = 0;
    }
  }
  //Y-Axis movement.
  if(hookY + hookdY < 0){
    hookY = 0;
    hookdY = 0;
  } else if(hookY + hookdY + hookHeight > ctx.canvas.height){
    hookY = ctx.canvas.height - hookHeight;
    hookdY = 0;
  } else {
    if(upPressed & downPressed){
      hookdY = 0;
    } else if (upPressed){
      hookdY = -5;
    } else if (downPressed){
      hookdY = 5;
    } else {
      hookdY = 0;
    }
  }
  if(hooked){
    //Hooked movement
    var xMove = hookdX + fish1dX;
    var yMove = hookdY + fish1dY;

    if(hookY + hookHeight + yMove > ctx.canvas.height || fish1Y + smallFishHeight + yMove > ctx.canvas.height){
      yMove = 0;
    }
    if(hookX + hookWidth + xMove > ctx.canvas.width || fish1X + smallFishWidth + xMove > ctx.canvas.width ||
       hookX + xMove < 0 || fish1X + xMove < 0){
      xMove = 0;
    }

    hookX += xMove;
    fish1X += xMove;
    hookY += yMove;
    fish1Y += yMove;

    if(hookY < 75){
      alert("You Caught a fish!");
      location.reload();
    }
  } else {
    //Move fish coordinates
    fish1X += fish1dX;
    fish1Y += fish1dY;
    //Bounce back to start if exceeded bounds of screen.
    if(fish1X > ctx.canvas.width){
      fish1X = -75;
    } else if (fish1X + smallFishWidth < 0){
      fish1X = ctx.canvas.width;
    }
    //Bounce back up if hit the floor or roof.
    if(fish1Y + smallFishHeight > ctx.canvas.height || fish1Y < 0){
      fish1dY = -fish1dY;
    }
    hookX += hookdX;
    hookY += hookdY;
  }
}


function drawSmallFish() {
  //Draw the hitbox.
  ctx.beginPath();
  ctx.rect(fish1X, fish1Y, smallFishWidth, smallFishHeight);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
}

function drawHook() {
  //Draw the hitbox.
  ctx.beginPath();
  ctx.rect(hookX, hookY, hookWidth, hookHeight);
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  ctx.closePath();
}

//Collision detction using Axis-Aligned Bounding Boxes
function collisionDetection() {
  if(hookX < fish1X + smallFishWidth  &&
     hookX + hookWidth > fish1X       &&
     hookY < fish1Y + smallFishHeight &&
     hookY + hookHeight > fish1Y) {
    //Collision detected
    hooked = 1;
  } else {
    hooked = 0;
  }
}

function changeDirection() {
  fish1dX = Math.floor(Math.random() * (4 - (1) + 1) ) + (1);
  fish1dY = Math.floor(Math.random() * (4 - (-4) + 1) ) + (-4);
}

function draw() {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  drawSmallFish();
  drawHook();
  collisionDetection();
  movement();
  requestAnimationFrame(draw);
}

draw();
var cd = setInterval(changeDirection, 2000);
