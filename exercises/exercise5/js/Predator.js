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
  constructor(x, y, speed, radius, player,img) {
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

    this.p2upKey = 87;
    this.p2downKey = 83;
    this.p2leftKey = 65;
    this.p2rightKey = 68;

    this.p1speedup=13;
    this.p2speedup=SHIFT;
    this.playerNumber=player;

    this.playerImg=img;
    this.isDead=false;

    this.eat=0;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if(this.playerNumber===1){
    if (keyIsDown(this.p1leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.p1rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.p1upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.p1downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }

    if(keyIsDown(this.p1speedup)){
      this.vy=this.vy*3;
      this.vx=this.vx*3;

    }
  }

  if(this.playerNumber===2){
    if (keyIsDown(this.p2leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.p2rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.p2upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.p2downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }

    if(keyIsDown(this.p2speedup)){
      this.vy=this.vy*3;
      this.vx=this.vx*3;

    }
  }



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
    if(this.isDead)
    { this.health=0;this.radius=0;}

    else{
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
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
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
        this.eat = this.eat+1;
        prey.reset();

      }
    }
  }


  checkState(){

    if(this.health<1){
      this.isDead=true;
      this.radius=0;
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    if(!this.isDead){
      push();
      noStroke();
      imageMode(CENTER);
      this.radius = this.health;
      image(this.playerImg,this.x, this.y, 2*this.radius,2*this.radius);
      console.log(this.radius);
      pop();
    }
  }
}
