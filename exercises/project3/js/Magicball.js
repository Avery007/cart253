class Magicball {

  // constructor
  //
  // Sets the initial values for the candidates properties
  // Either sets default values or uses the arguments provided
  constructor(x,y,radius,img,moveUpkey,moveDownkey,moveLeftkey,moveRightkey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed

    this.speed = 15;
    // power properties
    this.size = 0;

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;

   this.hitCount=0;
    this.playerImg = img; // display player as images
    this.isActive = false; // check if players are dead



  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the candidates
  // velocity appropriately.
  handleInput(getX,getY) {
    if(this.isActive){

    // Horizontal movement

      if (keyIsDown(this.leftKey)) {
        this.display();
        this.x =this.x- this.speed;
      } else if (keyIsDown(this.rightKey)) {
        this.display();
        this.x =this.x+ this.speed;
      }
      // Vertical movement
      else if (keyIsDown(this.upKey)) {
        this.display();
        this.y =this.y- this.speed;
      } else if (keyIsDown(this.downKey)) {
        this.display();
        this.y =this.y+ this.speed;
      } else {
        this.resetBalls(getX,getY);
        this.size=0;
      }


  }
}

resetBalls(getX,getY){
  this.x=getX;
  this.y=getY;


}


killercollision(killer,cathari,getX,getY) {

  // Calculate distance from this cadidates
  let d = dist(this.x, this.y, killer.x, killer.y);

  // Check if the distance is less than their two radii (an overlap)
  if (d < this.size + killer.size) {
    // Increase candidates power and constrain it to its possible range

      this.resetBalls(getX,getY);

      killer.reset();
    this.hitCount=this.hitCount+1;
    cathari.tireness(this.hitCount);



  }
}



  display() {
      this.size=10;
      push();
      noStroke();
      imageMode(CENTER);
      image(this.playerImg, this.x, this.y, 2 * this.size, 2 * this.size);
      pop();

  }
}
