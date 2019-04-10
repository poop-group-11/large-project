class Fish {
  constructor(id) {
    //Set an id tag.
    this.id = id;
    //Store img and dimensions.
    var fishIndex = Math.floor(Math.random() * fishAssets.length);
    this.img = fishAssets[fishIndex].right;
    this.imgLeft = fishAssets[fishIndex].left;
    this.width = this.img.width;
    this.height = this.img.height;
    //Create coordinate info.
    this.x = Math.floor(Math.random() * ctx.canvas.width); //random x position.
    this.y = Math.floor(Math.random() * (ctx.canvas.height - this.height)); //random y position.
    this.dX = Math.floor(Math.random() * (4 - (1))) + (1); //Random inital value.
    this.dY = Math.floor(Math.random() * (4 - (-4))) + (-4); //random initial value.
    //Hooked information.
    this.hooked = -1;
    //Directional Info.
    this.right = Math.round(Math.random()) ? true : false;
  }
  respawn() {
    //Reset fish img
    var fishIndex = Math.floor(Math.random() * fishAssets.length);
    this.img = fishAssets[fishIndex].right;
    this.imgLeft = fishAssets[fishIndex].left;
    this.width = this.img.width;
    this.height = this.img.height;
    //Reset directional status
    this.right = Math.round(Math.random()) ? true : false;
    //Reset Coordinates
    if(this.right) {
      this.x = -this.width; //Reset to left side of screen.
    } else {
      this.x = ctx.canvas.width; //Reset to right side of screen.
    }
    this.y = Math.floor(Math.random() * (ctx.canvas.height - this.height)); //random y position.
    this.dX = Math.floor(Math.random() * (4 - (1))) + (1); //Random inital value.
    this.dY = Math.floor(Math.random() * (4 - (-4))) + (-4); //random initial value.
    //Reset hooked status
    this.hooked = -1;
  }
  move() {
    if(this.hooked == -1){ //Normal Movement.
      if(this.right){
        this.x += this.dX;
      } else {
        this.x -= this.dX;
      }
      this.y += this.dY;
      //Respawn if exceeded bounds of screen.
      if(this.x > ctx.canvas.width){
        this.respawn();
      } else if(this.x < -this.width) {
        this.respawn();
      }
      //Bounce off floor or top of water.
      if(this.y + this.height > ctx.canvas.height || this.y < 0){
        this.dY = -this.dY
      }
    } else {
      this.x = hooks[this.hooked].x;
      this.y = hooks[this.hooked].y;
    }
  }
  draw() {
    if(this.hooked == -1){
      if(this.right) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        ctx.drawImage(this.imgLeft, this.x, this.y, this.width, this.height);
      }
    } else {
      ctx.save(); //saves the state of canvas
      ctx.translate(this.x, this.y); //let's translate
      ctx.rotate(-Math.PI / 2); //rotate the image
      ctx.drawImage(this.img, -this.width - hooks[this.hooked].img.height/2, hooks[this.hooked].img.width/2 - this.height/2, this.width, this.height);
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
