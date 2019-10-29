// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Voter {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxEffect = radius/2;
    this.effect= this.maxEffect; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = radius;
    this.checkConfusion=false;
    //this.preyName = name; // prey name
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  mesmerizing(initialSpeed,key1,key2,soberIndex1,soberIndex2){// reduce prey's speed when cheerleader is active
   if(keyIsDown(key1)){ // key to activate cheerleader
      //if(this.preyRadius>20){
      if(initialSpeed>soberIndex1){
       this.speed=soberIndex1; // reset speed

}
  }
  else if(keyIsDown(key2)){ // key to activate cheerleader
     //if(this.preyRadius>20){
     if(initialSpeed>soberIndex2){
      this.speed=soberIndex2; // reset speed

}
 }
   else{this.speed=initialSpeed;}




  }

shapeShifting(){ fill(random(200,255),255,100);
  rectMode(CENTER);
  rect(this.x, this.y, this.radius * 2,this.radius*2);

}
  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
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

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
  //  fill(0,random(50,200),250);
    fill(random(100,255));
    this.radius = 2*this.effect;
    ellipse(this.x, this.y, this.radius * 2);
    fill(150);
    textSize(this.radius);
    text("vote",this.x-this.radius,this.y-this.radius);


    // display preys' name with prey image
    //textSize(this.radius * 2);
    //text(this.preyName, this.x, this.y - this.radius);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.effect = this.maxEffect;
    // Default radius
    this.radius = this.effect;
  }
}
