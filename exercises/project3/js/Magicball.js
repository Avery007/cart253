class Magicball {

  // constructor
  //
  // Sets the initial values for the candidates properties
  // Either sets default values or uses the arguments provided
  constructor(speed, radius,img,moveUpkey,moveDownkey,moveLeftkey,moveRightkey,speedupKey) {
    // Position
    this.x = 0;
    this.y = 0;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // power properties
    this.size = radius;

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;
    this.speedupKey = speedupKey; // enter key

    this.playerImg = img; // display player as images
    this.isActive = false; // check if players are dead



  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the candidates
  // velocity appropriately.
  handleInput() {

    // Horizontal movement

      if (keyIsDown(this.leftKey)) {
        this.display();
        this.vx = -this.speed;
        this.x =this.x- this.vx;
      } else if (keyIsDown(this.rightKey)) {
        this.vx = this.speed;
        this.display();
        this.x =this.x- this.vx;
      } else {
        this.vx = 0;
      }
      // Vertical movement
      if (keyIsDown(this.upKey)) {
        this.display();
        this.vy = -this.speed;
        this.y =this.y- this.vy;
      } else if (keyIsDown(this.downKey)) {
        this.display();
        this.vy = -this.speed;
        this.y =this.y- this.vy;
      } else {
        this.vy = 0;
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
