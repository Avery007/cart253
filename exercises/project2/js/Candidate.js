// candidates
// A class that represents candidates
// controlled by the arrow keys. It can move around


class Candidate {

  // constructor
  //
  // Sets the initial values for the candidates properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, img,moveUpkey,moveDownkey,moveLeftkey,moveRightkey,speedupKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // power properties
    this.maxPower = radius;
    this.power = this.maxPower; // Must be AFTER defining this.maxHealth
    this.powerLossPerMove = 0.05; // reduce power so it will exit game if not enough votes got
    this.powerGainPerVote = 1; // increase power when gets votes

    this.radius = this.power; // Radius is defined in terms of power, so when power recude the size reduce

    // set up key control
    this.upKey = moveUpkey;
    this.downKey = moveDownkey;
    this.leftKey = moveLeftkey;
    this.rightKey = moveRightkey;
    this.speedupKey = speedupKey; // enter key

    this.playerImg = img; // display player as images
    this.isFailed = false; // check if players are dead

    this.vote = 0; // count votes
    this.bonus = 0; // extra votes got from boss
    this.result = 0; // vote+ bonus= total votes
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
        this.power = this.power - 0.1;
      }


  }


  // move
  // Updates the position according to velocity
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update power(health)
    if (this.isFailed) // rest player power and size when it exits
    {
      this.power = 0;
      this.radius = 0;
    } else { // reudce play power when game is active
      this.power = this.power - this.powerLossPerMove;
      this.power = constrain(this.power, 0, this.maxPower);
      // Handle wrapping
      this.handleWrapping();
    }
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

  // handling votes
  gainVote(vote,voteSound) {
    // Calculate distance from this cadidates
    let d = dist(this.x, this.y, vote.x, vote.y);
    // when votes get close to player, the shape and color changes
    if (d < this.radius * 2 + vote.radius * 2) {
      vote.shapeShifting();
    }
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + vote.radius) {
      // Increase candidates power and constrain it to its possible range
      this.power += this.powerGainPerVote;
      this.power = constrain(this.power, 0, this.maxPower);

      // Decrease cadidates power by the same amount
      vote.effect = vote.effect - this.powerGainPerVote;

      // Check if the votes lost effectivityand reset it if so
      if (vote.effect < 0) {
        this.vote = this.vote + 1; // track how votes the player get
        vote.sound(voteSound);// play sound when player gets votes
        vote.reset();

      }
    }
  }

  bossConnect(bossPower, bossIsActive) {
    if (!this.isFailed) { // firstly check if play is active
      if (bossIsActive) { // when key V for calling boss is pressed
        this.power = this.power - 0.2; // reduce player' power when boss is called
        this.bonus = floor(bossPower / 2); // bonus increase when boss power increases
      }
    }
  }
  // chekc if player exits
  checkState() {

    if (this.power < 1) { // when power is lower than 1
      this.isFailed = true; // player cannot play anymore
    }
    this.result = this.vote + this.bonus; // count total votes
  }



  // display
  //
  // Draw the cadidates as images
  // with a radius the same size as its current power.
  display() {
    if (!this.isFailed) { // display when game is actvie
      push();
      noStroke();
      imageMode(CENTER);
      this.radius = this.power;
      image(this.playerImg, this.x, this.y, 2 * this.radius, 2 * this.radius);
      pop();
    }
  }
}
