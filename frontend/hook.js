class Hook {
  constructor(id) {
    //Used for identifying the hook for catching fish/controls.
    this.id = id;
    //Draw() information.
    this.img = fishHook;
    //Origin information.
    this.origin = {x: (ctx.canvas.width / (hookCount + 1)) * (id + 1) - this.img.width/2,
                   y: 0}
    //Line information.
    this.length = -this.img.height - 10;
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
  }
  reset() {
    //reset cast state and position.
    this.cast = false;
    //Reset hitbox dimensions.
    this.length = -this.img.height - 10;
    this.y = this.origin.y + this.length;
  }
  castLine() {
    //set cast state
    this.cast = true;
    //Give an initial velocity?
    this.dL = 3;
    //Play Sound effect
    var snd = new Audio("Assets\\castSound.mp3");
    snd.play();
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
    ctx.font = "30px Arial"
    ctx.fillText("Score:" + this.score.toString(), this.origin.x, this.origin.y + 30);
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
    if(this.cast) {
      this.origin = {x: (ctx.canvas.width / (hookCount + 1)) * (this.id + 1) - this.img.width/2,
                     y: 0} //Reset origin on movement.
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
    }
  }
  catch() {
    if(this.hooked != -1 && this.y + this.img.height < 0){
      //Play sound effect
      var snd = new Audio("Assets\\caughtFish.mp3");
      snd.play();
      //Game Logic
      this.score += 1;
      fish[this.hooked].respawn();
      this.hooked = -1;
      this.reset();
    }
  }
}
