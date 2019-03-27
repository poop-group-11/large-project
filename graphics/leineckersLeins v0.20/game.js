//Initalize canvas size and objects.
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

hooks = [];
for(var i = 0; i < hookCount; i++){
  hooks[i] = new Hook(i);
}

fish = [];
for(var i = 0; i < fishCount; i++){
  fish[i] = new Fish(i);
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
     hook.x + hook.width > fish.x  &&
     hook.y < fish.y + fish.height &&
     hook.y + hook.height > fish.y) {
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

function draw() {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawHooks();
  drawFish();
  collision();
  requestAnimationFrame(draw);
}

function startGame() {
  document.getElementById("start").style.display = 'none';
  document.getElementById("back").style.display = 'none';
  draw();
}

function newSession() {
  document.getElementById("homeScreen").style.display = 'none';
  document.getElementById("gameScreen").style.display = 'grid';
}

function backToMenu() {
  document.getElementById("homeScreen").style.display = 'grid';
  document.getElementById("gameScreen").style.display = 'none';
  document.getElementById("settingsMenu").style.display = 'none';
}

function displaySettings() {
  document.getElementById("settingsMenu").style.display = 'block';
}
