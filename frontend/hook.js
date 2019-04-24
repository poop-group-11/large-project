class Hook {
  constructor(user, id) {
    //Used for identifying the hook for catching fish/controls.
    this.id = id;
    this.user = user;
	//Used for identifying user from server
	this.servId = user.id;
    //Draw() information.
    this.img = fishHook;
    //Origin information.
    this.origin = {x: (ctx.canvas.width / (userCount + 1)) * (id + 1) - this.img.width/2,
                   y: 0}
    //Line information.
    this.length = 50;
    this.dL = 0;
    //Hitbox information.
    this.x = this.origin.x - this.img.width/2;
    this.y = this.origin.y + this.length;
    //Information of whether a fish is hooked and which fish it is.
    this.hooked = -1;
    //Score information
    this.score = 0;
    //Cast status
    this.cast = false;
    this.lobby = true;
  }
  reset() {
    //reset cast state and position.
    this.cast = false;
    //Reset hitbox dimensions.
    this.length = -this.img.height - 10;
    this.y = this.origin.y + this.length;
  }
  totalReset(){
	  this.cast = false;
	  this.score = 0;
	  this.lobby = true;
  }
  castLine(speed) {
    //set cast state
    this.cast = true;
    //Give an initial velocity?
    this.dL = 10*speed;
  }
  draw() {
    //draw the line.
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.origin.x, this.origin.y + this.length);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    //draw the score.
    ctx.font = "30px Chelsea Market";
    ctx.fillText(this.user.username, this.origin.x, this.origin.y + 30);
    if( !this.lobby ){
      ctx.fillText("Score:" + this.score.toString(), this.origin.x, this.origin.y + 60);
    }
    //Draw hook hitbox.
    /*
    ctx.beginPath();
    ctx.rect(this.origin.x - (this.width/2),
             this.origin.y + this.length,
             this.width,
             this.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    */
    //Draw hook.
    ctx.drawImage(this.img, this.x + 1, this.y, this.img.width, this.img.height);
  }
  move() {
    this.origin = {x: (ctx.canvas.width / (userCount + 1)) * (this.id + 1) - this.img.width/2,
                   y: 0} //Reset origin on movement.
    if(this.cast) {
      this.x = this.origin.x - this.img.width/2; //Reset x on movement for hitbox.
      this.length += this.dL;
      this.y = this.origin.y + this.length;
      if(this.length < -this.img.height){
        this.length = -this.img.height;
        this.dL = -this.dL;
      } else if(this.length + this.img.height > ctx.canvas.height){
        this.length = ctx.canvas.height - this.img.height;
        this.dL = -this.dL;
      }
	  if(this.dL > 0){
		  this.dL -= 1;
	  }else if(this.dL < 0){
		  this.dL += 1;
	  }
    }
  }
  catch() {
    if(this.hooked != -1 && this.y + this.img.height < 0){
	    if(fish[this.hooked].name == "jelly")
	    {
        console.log('jellies suck');
		    fish[this.hooked].respawn();
        this.hooked = -1;
        this.reset();
		  }
      else
      {
        this.score += 1;
	      //Maximizes the winning score
	      if(this.score > winning.score)
	      {
			  winning.username = this.user.username;
		      winning.userId = this.servId;
		      winning.score = this.score;
	      }

	  connection.emit('fishCaught', this.servId, fish[this.hooked].name, sessionId);
      fish[this.hooked].respawn();
      this.hooked = -1;
      this.reset();
	  }
    }
  }
}
