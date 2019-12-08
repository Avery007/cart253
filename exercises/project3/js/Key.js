class Key { //set key properties

  //construction
  constructor(size, speed, img) {
    // random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;

    this.originalSpeed = speed;
    this.speed = this.originalSpeed;
    // Time properties for noise() function
    this.tx = random(500, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // power properties


    this.size = size;

     this.isGot=false;


    this.img = img;



  }

  movement() {
    if (!this.isGot) {// when elites is active
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



  display() {

       if(!this.isGot){
      push();
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.size/2, this.size);

      pop();

        fill(random(0,255));
        textSize(15);
        text("Got me",this.x,this.y-this.size);


      }
    }




   GotKey(cathar) {
      // Calculate distance from this cadidates
      let d = dist(this.x, this.y, cathar.x, cathar.y);

      // Check if the distance is less than their two radii (an overlap)
      if (d < this.size/2 + cathar.size/2) {
        if(!cathar.shieldActive){
        // Increase candidates power and constrain it to its possible range
        this.isGot=true;
        this.x = random(0, width);
        this.y = random(0, height);
        // Velocity and speed
        this.vx = 0;
        this.vy = 0;


        cathar.keyCount= cathar.keyCount+1;

      



}
      }
    }




}
