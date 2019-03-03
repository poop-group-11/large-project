var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Fish {
  constructor(img) {
    //Create coordinate info.
    this.x = Math.floor(Math.random() * ctx.canvas.width); //random x position.
    this.y = Math.floor(Math.random() * (ctx.canvas.height - img.height)); //random y position.
    this.dX = Math.floor(Math.random() * (4 - (1))) + (1); //Random inital value.
    this.dY = Math.floor(Math.random() * (4 - (-4))) + (-4); //random initial value.
    //Store img and dimensions.
    this.img = img;
    this.width = img.width;
    this.height = img.height;
  }
  move() {
    this.x += this.dX;
    this.y += this.dY;
    //Bounce back to start if exceeded bounds of screen.
    if(this.x > ctx.canvas.width){
      this.x  = -this.width;
    }
    //Bounce off floor or roof.
    if(this.y + this.height > ctx.canvas.height || this.y < 0){
      this.dY = -this.dY
    }
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  collide(hook) {
    //TODO logic.
  }
  changeDir() {
    this.dX += Math.random() < 0.5 ? -1 : 1; //Add 1 or subtract 1 from the speed.
    this.dY += Math.random() < 0.5 ? -1 : 1;
    if(this.dX > 4) this.dX = 4;
    if(this.dX < 1) this.dX = 1;
    if(this.dY > 4) this.dY = 4;
    if(this.dY < -4) this.dY = -4;
  }
}
