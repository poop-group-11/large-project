//Initalize canvas size and objects.
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

hooks = [];
fish = [];

function initGame() {
  for(var i = 0; i < hookCount; i++){
    hooks[i] = new Hook(i);
  }
    
  for(var i = 0; i < fishCount; i++){
    fish[i] = new Fish(i);
  }
}

//This function is intended for the frontend guys to fill with whatever logic they need.
//Should basically take inputs from users and translate them into game terms for gameplay.
function listen() {
  //TODO
}


function drawHooks() {
  for(var i = 0; i < hookCount; i++){
    hooks[i].move();
    hooks[i].draw();
    hooks[i].catch();
  }
}

function drawFish() {
  for(var i = 0; i < fishCount; i++){
    fish[i].move();
    fish[i].draw();
  }
}

function collide(hook, fish) {
  if(hook.x < fish.x + fish.width  &&
     hook.x + hook.img.width > fish.x  &&
     hook.y < fish.y + fish.height &&
     hook.y + hook.img.height > fish.y) {
    //Collision detected
    hook.hooked = fish.id;
    fish.hooked = hook.id;

  }
}

function collision() {
  for(var i = 0; i < hookCount; i++){
    for(var j = 0; j < fishCount; j++){
      if(hooks[i].hooked != -1 || fish[j].hooked != -1){
        continue;
      } else {
        collide(hooks[i], fish[j]);
      }
    }
  }
}

//Function is intended for frontend guys.
//Should contain logic to send whatever necessary information to users/websocket.
function talk() {
  //TODO
}

function draw() {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  listen();
  drawHooks();
  drawFish();
  collision();
  talk();
  requestAnimationFrame(draw);
}
