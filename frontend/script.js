var connection;
var sessionId;

var hooks = [];
var hookList = new Object();

function startGame() {
  document.getElementById("start").style.display = 'none';
  document.getElementById("back").style.display = 'none';
  document.getElementById("settings-menu").style.display = 'none';
  document.getElementById("settings-button").style.display = 'none';
  document.getElementById("session-code").style.display = 'none';
  //Start this bad boy up yeyeyeyeyeye
  connection.emit('sessionStart', sessionId);
  initGame();
  draw();
}

function createUser(user) {
  hooks[userCount] = new Hook(user, userCount);
  hookList[user] = userCount++;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for(var i = 0; i < userCount; i++){
    hooks[i].origin =  {x: (ctx.canvas.width / (userCount + 1)) * (hooks[i].id + 1) - hooks[i].img.width/2,
                   y: 0}
    hooks[i].x = hooks[i].origin.x - hooks[i].img.width/2;
    hooks[i].y = hooks[i].origin.y + hooks[i].length;
    hooks[i].draw();
  };
}

function newSession() {
  document.getElementById("home-screen").style.display = 'none';
  document.getElementById("game-screen").style.display = 'grid';
  document.getElementById("settings-menu").style.display ='none';
  document.getElementById("game-music").play();
  //Open socket, listen for join, make hook appear.
  connection = io('http://localhost');
  fetch('http://localhost/api/openSession', { method: "POST" })
	.then(res => res.json())
	.then(function(res) {
    if(res.success == true)
		{
			sessionId = res.message;
			connection.emit('joinSession', sessionId);
			connection.on('browserJoined', consoleCheck);
			document.getElementById("session-code").innerHTML = sessionId;
			//Listen for people to join
			connection.on('userJoined', createUser);
		}
		else
		{
			//TODO: Display an error
			//Bring up back to the homescreen.
			backToMenu();
		}
  })
	.catch( err => console.log(err));
  loadAssets();
}

function backToMenu() {
  document.getElementById("home-screen").style.display = 'flex';
  document.getElementById("game-screen").style.display = 'none';
  document.getElementById("settings-menu").style.display = 'none';
  document.getElementById("game-music").pause();
}

function displayPopUp(element, display) {
  document.getElementById(element).style.display = display;
}

function consoleCheck()
{
	console.log('Successful Connection!');
}
