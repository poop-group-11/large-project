var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.height = window.innerHeight;
ctx.canvas.width  = window.innerWidth;

fishCount = 8;

//Create fish objects.
fish = [];
for(var i = 0; i < fishCount; i++){
  fish[i] = new Fish(document.getElementById("fishAndWatch"));
}

function drawFish(){
  for(var i = 0; i < fishCount; i++){
    fish[i].draw();
    fish[i].move();
  }
}

function changeDirection(){
  for(var i = 0; i < fishCount; i++){
    fish[i].changeDir();
  }
}

function draw(){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawFish();
  requestAnimationFrame(draw);
}

draw();
var cd = setInterval(changeDirection, 2000);
