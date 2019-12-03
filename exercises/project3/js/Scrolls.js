// Scroll
//
// A class that represents Scrolls
// on screen based on a noise() function. It can move around


class Scrolls {

  // constructor
  //
  // Sets the initial values for the voter's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius,visibleReduce,img) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.image=img;

    this.visibility=255;
    this.visibleReduce=visibleReduce;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // effect properties
    this.maxEffect = radius/2;
    this.effect= this.maxEffect; // Must be AFTER defining this.maxHealth
    // Display properties

    this.radius = radius;
    this.isDestroyed=false; // check if the book is isDestroyed
    this.isAvailable=true;

  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    if(this.isAvailable){
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
}

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

 appearChange(){
   if(this.visibility>0){ // make the books get less visible
  this.visibility=this.visibility-this.visibleReduce;
}
else{this.reset();}  // reset the visibility when it disapears


 }
  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
   if(this.isAvailable){
    push();
    noStroke();
    imageMode(CENTER);
    tint(255,this.visibility);
    image(this.image,this.x,this.y,this.radius,this.radius);

    pop();
  }
}

  mantraCollision(cathari,magicBall) {
    // Calculate distance from this cadidates
    let d = dist(this.x, this.y, cathari.x, cathari.y);

    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + cathari.size) {
      // Increase candidates power and constrain it to its possible range
      magicBall.isActive=true;
    this.isAvailable=false;



    }
  }

  // reset
  //
  // Set the position to a random location and reset effect
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    this.visibility=255;

  }

  

// sound when player gets vote
  sound(music) {
        music.play();
        music.setVolume(0.4);
      }

}
