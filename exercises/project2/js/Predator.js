// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, player, img) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.05;
    this.healthGainPerEat = 1;
    // Display properties

    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.p1upKey = UP_ARROW;
    this.p1downKey = DOWN_ARROW;
    this.p1leftKey = LEFT_ARROW;
    this.p1rightKey = RIGHT_ARROW;

    this.p2upKey = 87; // key W
    this.p2downKey = 83; // key S
    this.p2leftKey = 65; // key A
    this.p2rightKey = 68; // key D

    this.p1speedup = 13; // enter key
    this.p2speedup = SHIFT;
    this.cheat=86; // Space key to call the hidden boss, same for both player
    this.playerNumber = player; // used to check which player

    this.playerImg = img; // display player as images
    this.isDead = false; // check if players are dead
    this.callBoss=0;// count how many times the boss is called
   this.isCalled=false;// check if player press the key to call boss

    this.eat = 0; // prey eaten number
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (this.playerNumber === 1) { // players as a tiger
      if (keyIsDown(this.p1leftKey)) {
        this.vx = -this.speed;
      } else if (keyIsDown(this.p1rightKey)) {
        this.vx = this.speed;
      } else {
        this.vx = 0;
      }
      // Vertical movement
      if (keyIsDown(this.p1upKey)) {
        this.vy = -this.speed;
      } else if (keyIsDown(this.p1downKey)) {
        this.vy = this.speed;
      } else {
        this.vy = 0;
      }

      if (keyIsDown(this.p1speedup)) { // speedup when shift is pressed
        this.vy = this.vy * 3;
        this.vx = this.vx * 3;

      }
    }

    if (this.playerNumber === 2) { // player as eagle
      if (keyIsDown(this.p2leftKey)) {
        this.vx = -this.speed;
      } else if (keyIsDown(this.p2rightKey)) {
        this.vx = this.speed;
      } else {
        this.vx = 0;
      }
      // Vertical movement
      if (keyIsDown(this.p2upKey)) {
        this.vy = -this.speed;
      } else if (keyIsDown(this.p2downKey)) {
        this.vy = this.speed;
      } else {
        this.vy = 0;
      }

      if (keyIsDown(this.p2speedup)) { // speedup when enter key is pressed
        this.vy = this.vy * 3;
        this.vx = this.vx * 3;

      }
    }

    if(keyIsDown(this.cheat)){
      this.isCalled=true;}
  else{this.isCalled=false;}
  console.log(this.isCalled);


}
  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    if (this.isDead) // rest player health and size when it is dead
    {
      this.health = 0;
      this.radius = 0;
    } else { // reudce play health when game is active
      this.health = this.health - this.healthLossPerMove;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Handle wrapping
      this.handleWrapping();
    }
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
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

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);

      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;

      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        this.eat = this.eat + 1; // track how mnay preys the player eat
        prey.reset();

      }
    }
  }

  // chekc if player is dead
  checkState() {

    if (this.health < 1) {
      this.isDead = true;
    }
  }

// function to count how mnay times the boss is called
  countBosscall(){
    if(this.isCalled){

      this.callBoss=this.callBoss+1;
      console.log(this.callBoss);

    }


  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    if (!this.isDead) { // display when game is actvie
      push();
      noStroke();
      imageMode(CENTER);
      this.radius = this.health;
      image(this.playerImg, this.x, this.y, 2 * this.radius, 2 * this.radius);
      //console.log(this.radius);
      pop();
    }
  }
}
