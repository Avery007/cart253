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

    this.speed = 10;
    // power properties
    this.size = radius;

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;


    this.playerImg = img; // display player as images
    this.isActive = false; // check if players are dead



  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the candidates
  // velocity appropriately.
  handleInput(getX,getY) {

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
      }


  }


resetBalls(getX,getY){
  this.x=getX;
  this.y=getY;


}

  display() {

      push();
      noStroke();
      imageMode(CENTER);
      image(this.playerImg, this.x, this.y, 2 * this.size, 2 * this.size);
      pop();

  }
}
