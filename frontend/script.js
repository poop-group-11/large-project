var connection;
var sessionId;

function startGame() {
  document.getElementById("start").style.display = 'none';
  document.getElementById("back").style.display = 'none';
  document.getElementById("session-code").style.display = 'none';
  //Start this bad boy up yeyeyeyeyeye
  connection.emit('sessionStart', sessionId);
  initGame();
  draw();
}

function newSession() {
  document.getElementById("home-screen").style.display = 'none';
  document.getElementById("game-screen").style.display = 'grid';
  document.getElementById("settings-menu").style.display ='none';
  document.getElementById("game-music").play();
  //Open socket, listen for join, make hook appear.
  connection = io('https://poopgroup11.xyz/leins');
  fetch('https://poopgroup11.xyz/api/openSession', { method: "POST" })
	.then(res = > res.json())
	.then
	( 
		if(res.success == true)
		{
			sessionId = res.message;
			var userCount = 0;
			connection.emit('joinSession', sessionId);
			connection.on('browserJoined' => {console.log('successful')});
			//TODO: Display the id in the CSS
			document.getElementById("session-code").innerHTML = sessionId;
			//Listen for people to join
			connection.on('userJoined', (user) =>
			{
				//Pass the info on to display it.
				displayUser(user, userCount);
				userCount++;
			});
		}
		else
		{
			//TODO: Display an error
			//Bring up back to the homescreen.
			backToMenu();
		}
	)
	.catch( err => console.log(err);) ;
  loadAssets();
}

function backToMenu() {
  document.getElementById("home-screen").style.display = 'grid';
  document.getElementById("game-screen").style.display = 'none';
  document.getElementById("settings-menu").style.display = 'none';
  document.getElementById("game-music").pause();
}

function displaySettings() {
  document.getElementById("settings-menu").style.display = 'block';
}
