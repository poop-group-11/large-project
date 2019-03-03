var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Hook {
  constructor(id) {
    //Used for identifying the hook for catching fish/controls.
    this.id = id;
    //Control variables
    this.pressed = {up: false,
                    down: false,
                    left: false,
                    right: false}
    //Draw() information.
    this.img = 0;
    this.width = 25;
    this.height = 75;
    //Origin information.
    this.origin = {x: (ctx.canvas.width / 9) * (id + 1) - this.width/2,
                   y: 0}
    //Line information.
    this.length = Math.random() * ctx.canvas.height - this.height;
    this.dL = 0;
    this.angle = 0;
    this.dAngle = Math.random() < 0.5 ? -.0435 : .0435;
  }
  draw() {
    //draw the line.
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    ctx.lineTo(this.origin.x + this.length * Math.sin(this.angle),
               this.origin.y + this.length * Math.cos(this.angle));
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    //Draw hook hitbox.
    ctx.beginPath();
    ctx.rect(this.origin.x + this.length * Math.sin(this.angle) - (this.width/2),
             this.origin.y + this.length * Math.cos(this.angle),
             this.width,
             this.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
  move() {
    //Angular boundarys:
    if(this.angle + this.dAngle > 1.5708){
      this.angle = 1.5708;
      this.dAngle = -this.dAngle;
    } else if(this.angle + this.dAngle < -1.5708){
      this.angle = -1.5708;
      this.dAngle = -this.dAngle;
    } else {
      this.angle += this.dAngle;
    }

    this.length += this.dL;
    //No negative length.
    if(this.length < 0){
      this.length = 0;
      this.dL = -this.dL;
    }
  }
}
