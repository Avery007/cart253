// class represent player
// only one player in this game


class Cathari {

  // constructor
  //
  // Sets the initial values for the player properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, img, moveUpkey, moveDownkey, moveLeftkey, moveRightkey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;

    this.size = radius;
    this.energyLeft = 200; // orginal energy
    this.keyCount = 0; // count how mnay keys player gets

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;


    this.getCount = 0; // count how many books player get
    this.rate = this.getCount; // set killer increasing rate based on getCOunt

    this.isFailed = false; // check if players are dead
    this.shieldActive = false; // check if player is using shield

    this.playerImg = img; // display player as images


  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets it
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



  }

  // player can press K to shield themselves from arrows
  getShield(shieldImg, catharImg) {
    if (keyIsDown(75)) { // when key is pressed
      this.shieldActive = true;

      this.playerImg = shieldImg; //replace player image with the shield
    } else {
      this.playerImg = catharImg; // display player
      this.shieldActive = false;
    }

  }

  // using existing codes from previous exercise
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
    if (this.x < 30) {
      this.x = 30;
    } else if (this.x > width) {
      this.x = width;
    }
    // Off the top or bottom
    if (this.y < 30) {
      this.y = 30;
    } else if (this.y > height) {
      this.y = height;
    }
  }



  // player-scrolls collisons
  getScrolls(scrolls) {
    // Calculate distance
    let d = dist(this.x, this.y, scrolls.x, scrolls.y);

    // Check if the distance is less than their two radii (an overlap)
    if (d < this.size + scrolls.radius) {
      // count collisions times
      this.getCount = this.getCount + 1;

      scrolls.reset(); // reset

      // increases killer's number based on the collisions of player and books
      if (floor(this.getCount / 2) - this.rate > 0) { // set a inscreasing certain
        makeNewKiller();
        this.rate = this.getCount;

      }

    }

  }


  // as players hit the killer, it is getting slower

  tireness(killerHitCount) {

    if (this.speed > 1) {
      this.speed = 10 - killerHitCount * 0.05;

    }
  }


  // update player's energy
  energy(ball) {
    fill(255);
    if (this.energyLeft > 0) {
      this.energyLeft = 150 - ball.hitCount;
    } else {
      ball.isActive = false;
    }
    rect(this.x, this.y - this.size * 1.5, this.energyLeft, 10);


  }



  // allow player to exit
  exit() {
    if (this.x < 100 && this.y < 100) { // move to certain area
      // and press ENTER key
      if (keyIsDown(ENTER)) {
        // shift to stage 2 and reset position
        gameState = 4;
        this.x = width - 100;
        this.y = height - 100;

      }

    }


  }


  // display player
  display() {

    push();
    noStroke();
    imageMode(CENTER);
    image(this.playerImg, this.x, this.y, 2 * this.size, 2 * this.size);
    pop();

  }
}
