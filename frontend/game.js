//Initalize canvas size and objects.
ctx.canvas.height = window.innerHeight;
ctx.canvas.width = window.innerWidth;

var winning = new Object();
fish = [];

function initGame() {
  for(var i = 0; i < userCount; i++){
    hooks[i].lobby = false;
    hooks[i].length = -hooks[i].img.height - 10;
    hooks[i].y = this.origin.y + this.length;
  }
  for(var i = 0; i < fishCount; i++){
    fish[i] = new Fish(i);
  }
  
  winning.score = 0;
}

//This function is intended for the frontend guys to fill with whatever logic they need.
//Should basically take inputs from users and translate them into game terms for gameplay.
function listen() {
  //TODO
  connection.on('casted', user =>
  {
	  //Get's user's usercount from hookList then gets the line to cast
	  hooks[hookList[user]].castLine();
  });
  
  connection.on('reeled', (user, direction) =>
  {
	  //Deal with interpreting direction and making the hook go up and down
	  if(direction == -1)
		  //TODO: Make hook go up
		console.log('hi');
	  else
		  hooks[hookList[user]].castLine();
  });
}


function drawHooks() {
  for(var i = 0; i < userCount; i++){
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
  for(var i = 0; i < userCount; i++){
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
  if(winning.score >= scoreGoal)
  {
	  connection.emit('endSession', (sessionId, winning.user));
  }
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
