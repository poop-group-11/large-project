//    var canvas = document.getElementById("canvas");
//var ctx = canvas.getContext("2d");

ctx.canvas.height = window.innerHeight;
ctx.canvas.width  = window.innerWidth;

hookCount = 6;

//Create hook objects.
hooks = [];
for(var i = 0; i < hookCount; i++){
  hooks[i] = new Hook(i);
}

function drawHooks() {
  for(var i = 0; i < hookCount; i++){
    hooks[i].move();
    hooks[i].draw();
  }
}

function draw() {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawHooks();
  requestAnimationFrame(draw);
}

draw();
