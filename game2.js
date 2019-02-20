var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

var smallFish = {width:75, height: 25}
var hook = {width:25, height: 75}

//Create functions to generate multiple of these in future.
var fish1 = {x: 0, y:(ctx.canvas.height)/2, dX:2, dY:2}
var hook1 = {x: (ctx.canvas.width/2) - hook.width/2, y: 0, dX: 0, dY: 0, origin:{x: (ctx.canvas.width/2), y: 0}}

var line = {length: 0, dL: 0, theta: 0, dTheta: 0}

var hooked = false;

var pressed = {up: false, down: false, left: false, right: false}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight"){
    pressed.right = true;
  } else if(e.key == "Left" || e.key == "ArrowLeft"){
    pressed.left = true;
  } else if(e.key == "Down" || e.key == "ArrowDown"){
    pressed.down = true;
  } else if(e.key == "Up" || e.key == "ArrowUp"){
    pressed.up = true;
  }
}
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight"){
    pressed.right = false;
  } else if(e.key == "Left" || e.key == "ArrowLeft"){
    pressed.left = false;
  } else if(e.key == "Down" || e.key == "ArrowDown"){
    pressed.down = false;
  } else if(e.key == "Up" || e.key == "ArrowUp"){
    pressed.up = false;
  }
}

function drawLine() {
  //Draw a line from hook origin to current line point.
  ctx.beginPath();
  ctx.moveTo(hook1.origin.x, hook1.origin.y);
  ctx.lineTo(hook1.origin.x + line.length * Math.sin(line.theta), hook1.origin.y + line.length * Math.cos(line.theta));
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath();
  //Draw a hook hitbox.
  ctx.beginPath();
  ctx.rect(hook1.origin.x + line.length * Math.sin(line.theta) - (hook.width/2), hook1.origin.y + line.length * Math.cos(line.theta), hook.width, hook.height);
  ctx.strokeStyle = "green";
  ctx.stroke();
  ctx.closePath();
}

function drawSmallFish() {
  //Draw the hitbox.
  ctx.beginPath();
  ctx.rect(fish1.x, fish1.y, smallFish.width, smallFish.height);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
}

function drawObjects() {
  drawLine();
  drawSmallFish();
}

function lineMovement() {
  //Line angular movement
  if(pressed.right && !pressed.left){
    line.dTheta = .087;
  } else if(pressed.left && !pressed.right){
    line.dTheta = -.087;
  } else {
    line.dTheta = 0;
  }
  if(line.theta + line.dTheta > 1.5708){
    line.theta = 1.5708;
  } else if(line.theta + line.dTheta < -1.5708){
    line.theta = -1.5708;
  } else {
    line.theta += line.dTheta;
  }
  //Line length movement.
  if(pressed.up && !pressed.down){
    line.dL = -5;
  } else if(pressed.down && !pressed.up){
    line.dL = 5;
  } else {
    line.dL = 0;
  }
  if(line.length + line.dL + hook.height > ctx.canvas.height){
    line.length = ctx.canvas.height - hook.height;
  } else if(line.length + line.dL < 0){
    line.length = 0;
  } else {
    line.length += line.dL //TODO Implement better boundary logic.
  }
}

function fishMovement() {
  //Move fish coordinates
  fish1.x += fish1.dX;
  fish1.y += fish1.dY;
  //Bounce back to start if exceeded bounds of screen.
  if(fish1.x > ctx.canvas.width){
    fish1.x = -75;
  } else if (fish1.x + smallFish.width < 0){
    fish1.x = ctx.canvas.width;
  }
  //Bounce back up if hit the floor or roof.
  if(fish1.y + smallFish.height > ctx.canvas.height || fish1.y < 0){
    fish1.dY = -fish1.dY;
  }
}

function movement() {
  lineMovement();
  fishMovement();
}

function draw(){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  drawObjects();
  movement();
  //CollisionDetection()
  requestAnimationFrame(draw);
}

function changeDirection() {
  fish1.dX = Math.floor(Math.random() * (4 - (1) + 1) ) + (1);
  fish1.dY = Math.floor(Math.random() * (4 - (-4) + 1) ) + (-4);
}

draw();
var cd = setInterval(changeDirection, 2000);
