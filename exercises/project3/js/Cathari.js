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

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;
    this.speedupKey = speedupKey; // enter key

    this.playerImg = img; // display player as images
    this.isFailed = false; // check if players are dead



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

  display() {

      push();
      noStroke();
      imageMode(CENTER);
      image(this.playerImg, this.x, this.y, 2 * this.size, 2 * this.size);
      pop();

  }
}
