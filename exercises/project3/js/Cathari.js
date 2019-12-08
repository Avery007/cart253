class Cathari {

  // constructor
  //
  // Sets the initial values for the candidates properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius,img,moveUpkey,moveDownkey,moveLeftkey,moveRightkey,speedupKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    // power properties
    this.size = radius;
    this.energyLeft=200;
    this.keyCount=0;

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;
    this.speedupKey = speedupKey; // enter key

     this.getCount=0;
     this.rate=this.getCount;
    this.playerImg = img; // display player as images
    this.isFailed = false; // check if players are dead
    this.shieldActive=false;




  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the candidates
  // velocity appropriately.
  handleInput() {

    // Horizontal movement

      if (keyIsDown(this.leftKey)) {
        this.vx = -this.speed;
      } else if (keyIsDown(this.rightKey)) {
        this.vx = this.speed;
      } else {
        this.vx = 0;
      }
      // Vertical movement
      if (keyIsDown(this.upKey)) {
        this.vy = -this.speed;
      } else if (keyIsDown(this.downKey)) {
        this.vy = this.speed;
      } else {
        this.vy = 0;
      }

      if (keyIsDown(this.speedupKey)) { // speedup when shift is pressed
        this.vy = this.vy * 3;
        this.vx = this.vx * 3;

      }



  }


  getShield(shieldImg,catharImg){
    if (keyIsDown(75)) {
      this.shieldActive=true;

      this.playerImg=shieldImg;
  }
  else{this.playerImg=catharImg;
       this.shieldActive=false;
  }

}

  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

      this.handleWrapping();
    }


  // handleWrapping
  //
  // Checks if the candidates has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

    getScrolls(scrolls) {
      // Calculate distance from this cadidates
      let d = dist(this.x, this.y, scrolls.x, scrolls.y);

      // Check if the distance is less than their two radii (an overlap)
      if (d < this.size + scrolls.radius) {
        // Increase candidates power and constrain it to its possible range
        this.getCount=this.getCount+1;

        scrolls.reset();

        if(floor(this.getCount/1.5)-this.rate>0){
         makeNewKiller();

        this.rate=this.getCount;

       }

    }

    }

  tireness(killerHitCount){


        if(this.speed>1){
      this.speed=10-killerHitCount*0.05;



    }
}

energy(ball){
   fill(255);
   if(this.energyLeft>0){
   this.energyLeft=150-ball.hitCount;}
   else{ball.isActive=false;}
   rect(this.x,this.y-this.size*1.5,this.energyLeft,10);


}

  exit(){
     if (this.x<100&&this.y<100){
if(keyIsDown(ENTER)){

  gameState=4;
  this.x=width-100;
  this.y=height-100;

}

     }


  }
  display() {

      push();
      noStroke();
      imageMode(CENTER);
      image(this.playerImg, this.x, this.y, 2 * this.size, 2 * this.size);
      pop();

  }
}
