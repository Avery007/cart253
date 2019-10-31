// class boss used to cheat--get votes easily
// but player's power reduces when boss is activeKey//
// boss gets bigger when its power increases

class HiddenBoss {


  // constructor
  constructor(power, img, activateKey) {
    // Position

    // Velocity and speed
    this.x = 0;
    this.y = 0;

    this.img = img;

    this.power = power;
    this.size = 100; // link the size with boss'power
    this.bossManipulation = false; // used to track if the boss is active
    this.bossEat = 0; // count how mnay votes boss get
    this.callCount = 0; // count how many times boss is called
    this.activateKey = activateKey; // key control for boss

  }

  // caculate boss' power
  bossPower() {
    if (this.bossManipulation) { // when boss is active

      this.callCount = this.callCount + 1; // count how mnay times boss is called
      this.power = floor(this.callCount - this.callCount / 1.1); // defualt power, more times when boss is called, boss power increases


    }


  }


  // count how mnay votes boss get
  bossGain(vote) {
    // Calculate distance from this boss to vote
    let d = dist(this.x, this.y, vote.x, vote.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.size / 2 + vote.radius) {

      this.bossEat = this.bossEat + 1; // track how mnay votes boss get

      vote.reset(); // reset vote afer overclap


    }


  }

  // set up key control to call boss, different player uses different key control
  keyControl() {

    if (keyIsDown(this.activateKey)) {
      this.bossManipulation = true;
    } else {
      this.bossManipulation = false;
    }
  }

  display() { // display boss

    if (this.bossManipulation) { // check if the key is pressed

      this.size = this.power + 100; // boss size increases when it has more power
      this.x = random(0, 1000);
      this.y = random(0, 500);
      imageMode(CENTER);
      image(this.img, this.x, this.y, this.size, this.size);
      fill(random(190, 255));
      textSize(60);
      text("Boss Power !", 500, 150);


    } else {
      this.x = -this.size;
      this.y = 0;
    } // when it is not active, it is not on the screen

  }

  // set music when boss is active
  bossMusic(music) {
    if (this.bossManipulation) {
      if (!music.isPlaying()) { // to avoid repreatly play music
        music.play();
      }
    }
  }
}
