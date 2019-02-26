class Fish {
  constructor(id, img) {
    //Set an id tag.
    this.id = id;
    //Create coordinate info.
    this.x = Math.floor(Math.random() * ctx.canvas.width); //random x position.
    this.y = Math.floor(Math.random() * (ctx.canvas.height - img.height - waterTop) + waterTop); //random y position.
    this.dX = Math.floor(Math.random() * (4 - (1))) + (1); //Random inital value.
    this.dY = Math.floor(Math.random() * (4 - (-4))) + (-4); //random initial value.
    //Store img and dimensions.
    this.img = img;
    this.width = img.width;
    this.height = img.height;
    //Hooked information.
    this.hooked = -1;
  }
  move() {
    if(this.hooked == -1){ //Normal Movement.
      this.x += this.dX;
      this.y += this.dY;
      //Bounce back to start if exceeded bounds of screen.
      if(this.x > ctx.canvas.width){
        this.x  = -this.width;
      }
      //Bounce off floor or top of water.
      if(this.y + this.height > ctx.canvas.height || this.y < waterTop){
        this.dY = -this.dY
      }
    } else {
      this.x = hooks[this.hooked].x;
      this.y = hooks[this.hooked].y;
    }
  }
  draw() {
    if(this.hooked == -1){
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } else {
      ctx.save(); //saves the state of canvas
      ctx.translate(this.x, this.y); //let's translate
      ctx.rotate(-Math.PI / 2); //rotate the image
      ctx.drawImage(this.img, -this.width - hooks[this.hooked].height/4, hooks[this.hooked].width/2 - this.width/2, this.width, this.height);
      ctx.restore(); //restore the state of canvas
    }
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
