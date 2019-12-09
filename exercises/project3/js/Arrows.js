// a class of  arrows that can shoot player
// this class using existing codes from exercise 2



class Arrows {


  constructor(originalSpeed, img) {
    // Position
    this.x = 0;
    this.y = 0;
    // Velocity and speed
    this.orignalSpeed = originalSpeed;
    this.speed = this.orignalSpeed;

    this.size = 70;

    this.dodges = 0; // count how many times play dodges

    this.img = img; // display images
    this.isShoot = false; // check if players are dead
  }



  move() { // using existing codes from previous exercise

    this.x = this.x + this.speed;
    this.speedUpdate();

    // Check if the arrow has moved all the way across the screen
    if (this.x > width) {
      // This means the player dodged so update its dodge statistic
      this.dodges = this.dodges + 1;
      // Reset the it's position to the left at a random height
      this.x = 0;
      this.y = random(20, height);
    }


  }


  speedUpdate() {
    // change the speed of enermy when players make dodges
    if (this.speed < 50 && this.speed > 0) { // set the max speed of enermy to 40
      this.speed = this.orignalSpeed + 0.5 * this.dodges; // rate of increased speed

    } else {
      this.speed = this.speed;
    } //  speed stops changing



  }

  collisionCheck(cathar) {
    let d = dist(this.x, this.y, cathar.x, cathar.y);

    // Check if the distance is less than their two radii (an overlap)
    if (d < this.size / 2 + cathar.size / 2) {
      if (cathar.shieldActive) { // check if player uses shieldI
        // if so, reset the arrows
        this.x = 0;
        this.y = random(20, height);

      } else {
        gameState = 5; // if not, it means player fails
        cathar.isFailed = true;
        failReason = "Oops!You are shoot by an arrow \n" + "so you are captured!";
      } // display reason

    }

  }

  display() { // display arrows

    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size / 3);

  }



}
