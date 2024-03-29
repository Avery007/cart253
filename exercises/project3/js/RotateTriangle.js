// class of rotating triangle serves as barries
// it wont kill player, but reset player's loction to corner



class RotateTriangle {

  constructor(speed, size, rate, img) {
    // Position
    this.x = random(0, width - 100);
    this.y = random(0, height - 100);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.rotatingRate = rate;
    this.size = size;

    // rotate and noise movement
    this.noiseTimeX = random(0, 50);
    this.noiseTimeY = random(0, 10);

    this.img = img; // display player as images
    this.isFailed = false; // check if players are dead
  }

  move() { // copy codes from previous exercise

    this.noiseTimeX = this.noiseTimeX + 0.01; // make noisetime keep increasing so noise() returns different value
    this.noiseTimeY = this.noiseTimeY + 0.02;
    this.vx = map(noise(this.noiseTimeX), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.noiseTimeY), 0, 1, -this.speed, this.speed);

    if (this.x > width || this.x < 0 || this.y < 0 || this.y > height) { // check if gets off the screen
      // reset
      this.x = random(0, width - 100);
      this.y = random(0, height - 100);
    } else { // move
      this.x = this.x + this.vx;
      this.y = this.y + this.vy;


    }
    // rotate the attacker
    this.rotation();
  }


  //rotate the attacker
  rotation() {

    push();

    translate(this.x, this.y);
    rotate(degrees(1 * millis() / this.rotatingRate));
    imageMode(CENTER);
    image(this.img, 0, 0, this.size, this.size);


    pop();
    this.ellipseMask();

  }

  ellipseMask() {
    fill(255, 0, 0, 0); // invisible ellipse to check collisions
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size + 20, this.size + 20);

  }

  checkcollides(cathar) {
    if (dist(this.x, this.y, cathar.x, cathar.y) < (this.size + 20) / 2 + cathar.size / 2) {
      // if so, reset player location
      cathar.x = width;
      cathar.y = height;


    }

  }

}
