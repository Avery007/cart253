class Elites{




constructor(x, y, speed,img,radius) {
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
  this.maxPower= 50;
  this.power= this.maxPower; // Must be AFTER defining this.maxHealth
  // Display properties

  this.radius = radius;
  this.img=img;

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
//  NoStroke();
//  fill(0,random(50,200),250);


image(this.img, this.x, this.y, this.radius*2,this.radius*2);
  fill(150);
  textSize(this.radius);
  text("Elites",this.x-this.radius,this.y-this.radius);


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
  this.power = this.maxPower;
  // Default radius

}


}
