class Hook {
  constructor(id) {
    //Used for identifying the hook for catching fish/controls.
    this.id = id;
    //Control variables
    this.pressed = {up: false,
                    down: false}
    //Draw() information.
    this.img = document.getElementById("fishHook");
    this.width = this.img.width;
    this.height = this.img.height;
    //Origin information.
    this.origin = {x: (ctx.canvas.width / (hookCount + 1)) * (id + 1) - this.width/2,
                   y: 0}
    //Line information.
    this.length = 50;
    this.dL = 1;
    //Hitbox information.
    this.x = this.origin.x - this.width/2;
    this.y = this.origin.y + this.length;
    //Information of whether a fish is hooked and which fish it is.
    this.hooked = -1;
    //Score information
    this.score = 0;
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
    ctx.drawImage(this.img, this.x + 1, this.y, this.width, this.height);
  }
  move() {
    this.origin = {x: (ctx.canvas.width / (hookCount + 1)) * (this.id + 1) - this.width/2,
                   y: 0} //Reset origin on movement.
    this.x = this.origin.x - this.width/2; //Reset x on movement for hitbox.
    this.length += this.dL;
    this.y = this.origin.y + this.length;
    if(this.length < 0){
      this.length = 0;
      this.dL = -this.dL;
    } else if(this.length + this.height > ctx.canvas.height){
      this.length = ctx.canvas.height - this.height;
      this.dL = -this.dL;
    }
  }
  catch() {
    if(this.hooked != -1 && this.y + this.height < waterTop){
      this.score += 1;
      fish[this.hooked].respawn();
      this.hooked = -1;
    }
  }
}
