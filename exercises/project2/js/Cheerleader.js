// class display cheerleader
//it is used to reduce the speed of votes


class Cheerleader {

  // constructor
  constructor(x, y, attraction, img, activeKey) {

    // Position
    this.x = x;
    this.y = y;

    this.xv = 0;
    this.yv = 0;

    this.img = img; // img of cheerleader

    this.attraction = attraction;
    this.size = 180;
    this.activeState = false; // used to track if the cheerleader is active

    this.keyActivate = activeKey; // key control to activate cheerleader

    this.sober = 1;


  }

  /// move used to determine the moving direction of cheerleader
  move(moveX) {

    if (this.activeState) {
      this.x = this.x + moveX;
      this.y = this.y + this.yv;
      this.yv = 5;

      if (this.y < 0 || this.y > 400) { // change yv when it moves to the bottom ot top, so creating a kind o dancing effect

        this.yv = -200;

      }
      if (this.x > windowWidth) {
        this.x = 50;
        this.sober = this.sober + 1; // increase each time it moves over the width
      }
      if (this.x < 0) {
        this.x = windowWidth - 50;
        this.sober = this.sober + 1; //increase each time it moves over the width
      }
    }
  }

  keyControl() {


    if (keyIsDown(this.keyActivate)) {

      this.activeState = true;
    } else {
      this.activeState = false;

    }
  }




  display() { // display Cheerleader

    if (this.activeState) { // check if the key is pressed

      imageMode(CENTER);
      image(this.img, this.x, this.y, this.size, this.size);


    }


  }

  // display music
  musicPlay(music) {
    if (this.activeState) {
      if (!music.isPlaying()) {
        music.play();
        music.setVolume(0.5);

      }



    }

  }

}
