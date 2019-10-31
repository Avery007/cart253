// a class represents elites//
// objects increases player'svotes and max size
// it moves much more faster than other votes, and its sizes changes
// the number of elites is limited
// how mnay elites players can get detertimes the game result!


class Elites{ //set elites properties

//construction
constructor(x, y, speed,img,radius) {
  // Position
  this.x = x;
  this.y = y;
  // Velocity and speed
  this.vx = 0;
  this.vy = 0;

  this.originalSpeed = speed;
  this.speed=this.originalSpeed;
  // Time properties for noise() function
  this.tx = random(500, 1000); // To make x and y noise different
  this.ty = random(0, 1000); // we use random starting values
  // power properties
  this.maxPower= 60;
  this.power= this.maxPower; // Must be AFTER defining this.maxHealth
  this.resetPower=this.power;
  this.noElites=false;// when there is no more elites

  this.visibility=70;// changeable visibility
  this.radius = radius;
  this.img=img;
  this.countElites=0;// count how many times player meets elites


}

// move
//
// Sets velocity based on the noise() function and the elite's speed
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
// Draw the elites as an image
// with a radius the same size as its current power
display() {
  push();

this.radius=this.power;
tint(255,this.visibility);
imageMode(CENTER);
image(this.img, this.x, this.y, this.radius*2,this.radius*2);
  fill(150);
  textSize(this.radius);
  text("Elites",this.x,this.y);
  pop();
}

handleVote(candidate) {
  // Calculate distance from this elite to the candidate
  let d = dist(this.x, this.y, candidate.x, candidate.y);
  // when candidates are too close to the elites,change elites visibility and speed
    if (d < this.radius *2+ candidate.radius*2) {
    this.visibility=this.visibility+5;// make elites more visible
    this.speed=this.speed-1; // change their speed so that they woild avoid run into players
}

// Check if the distance is less than their two radii (an overlap)
  if (d < this.radius/2 + candidate.radius) {


      candidate.vote= candidate.vote+ elites.power; // increase cadidates vote basoed on the power of elites
      candidate.maxPower=candidate.maxPower+floor(elites.power/3);// change candidates max power so it could grow bigger
      this.countElites=this.countElites+1;// count how many elites players get
      this.reset();// rest location and speed


  }
}

elitesPowerUpdate(){ // reduce elites power gradually as game is active
  if(this.power>1){// when it is large than 1(mean game is active)
  this.power=this.power-0.5;
}
else{this.reset();} // means no more elites
}


checkElites(){
if(this.resetPower<1){
this.noElites=true;
this.power=0;
this.radius=0;
}

}

// reset
//
// Set the position to a random location and reset power
// and radius back to default
reset() {
  this.resetPower = this.maxPower-5*this.countElites;// power reduces each time when player get elites
  if(this.resetPower<0){// no more elites
  this.noElites=true;
  this.power=0;
  this.radius=0;
  this.x=-this.radius;
  this.y=-this.radius;
  }
  else{
  // Random position
  this.x = random(0, width);
  this.y = random(0, height);
  // Default health

  this.power=this.resetPower;
  this.visibility=100;
  this.speed=this.originalSpeed;
  // Default radius
}
}


}
