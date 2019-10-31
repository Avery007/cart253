// Voter
//
// A class that represents voters that moves
// on screen based on a noise() function. It can move around


class Voter {

  // constructor
  //
  // Sets the initial values for the voter's properties
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
    // effect properties
    this.maxEffect = radius/2;
    this.effect= this.maxEffect; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = radius;
    this.checkConfusion=false; // check if the cheerleader is called

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

mesmerizing(initialSpeed,key1,key2,soberIndex1,soberIndex2){// reduce voters's speed when cheerleader is active
   if(keyIsDown(key1)){ // key to activate cheerleader
      if(initialSpeed>soberIndex1){ //when initial speed is larger than the sober index which is related to the movement of cheerleader
       this.speed=soberIndex1; // reset speed

}
  }
  else if(keyIsDown(key2)){ // key to activate cheerleader

     if(initialSpeed>soberIndex2){//when initial speed is larger than the sober index which is related to the movement of cheerleader
      this.speed=soberIndex2; // reset speed

}
 }
   else{this.speed=initialSpeed;} // if soberIndex is larger than orgiinal speed, no long reduce speed


}

// change shape when getting close to the players
shapeShifting(){
  fill(random(200,255),255,100);// change color
  rectMode(CENTER);
  rect(this.x, this.y, this.radius * 2,this.radius*2);// reset shape

}
  // handleWrapping
  //
  // Checks if the voter has gone off the canvas and
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
    fill(random(100,255));
    this.radius = 2*this.effect; // make the effectivity related to its size
    ellipse(this.x, this.y, this.radius * 2);
    fill(random(70,170),random(50,200), 255); // text color
    textSize(this.radius);// text size related to vote size
    text("vote",this.x-this.radius,this.y-this.radius);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset effect
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default effect
    this.effect = this.maxEffect;
    // Default radius
    this.radius = this.effect;
  }
}
