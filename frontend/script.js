function startGame() {
  document.getElementById("start").style.display = 'none';
  document.getElementById("back").style.display = 'none';
  draw();
}

function newSession() {
  document.getElementById("home-screen").style.display = 'none';
  document.getElementById("game-screen").style.display = 'grid';
  document.getElementById("settings-menu").style.display ='none';
  document.getElementById("game-music").play();
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
