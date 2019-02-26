var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Hook {
  constructor(id) {
    //Used for identifying the hook for catching fish/controls.
    this.id = id;
    //Control variables
    this.pressed = {up: false,
                    down: false}
    //Draw() information.
    this.img = 0;
    this.width = 25;
    this.height = 75;
    //Origin information.
    this.origin = {x: (ctx.canvas.width / 9) * (id + 1) - this.width/2,
                   y: 0}
    //Line information.
    this.length = 50;
    this.dL = 1;
  }
  draw() {
    //draw the line.
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.origin.x, this.origin.y + this.length);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    //Draw hook hitbox.
    ctx.beginPath();
    ctx.rect(this.origin.x - (this.width/2),
             this.origin.y + this.length,
             this.width,
             this.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
  move() {
    this.length += this.dL;
    if(this.length < 0){
      this.length = 0;
      this.dL = -this.dL;
    } else if(this.length + this.height > ctx.canvas.height){
      this.length = ctx.canvas.height - this.height;
      this.dL = -this.dL;
    }
  }
}
