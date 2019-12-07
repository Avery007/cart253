class Arrows{


  constructor(originalSpeed,img) {
    // Position
    this.x = 0;
    this.y = 0;
    // Velocity and speed
    this.orignalSpeed= originalSpeed;
    this.speed =this.orignalSpeed;

    // power properties
    this.size = 70;




     this.dodges=0;

    this.img = img; // display player as images
    this.isShoot = false; // check if players are dead
  }

move(){

  this.x = this.x + this.speed;
  this.speedUpdate();

  // Check if the arrow has moved all the way across the screen
  if (this.x > width) {
      // This means the player dodged so update its dodge statistic
      this.dodges = this.dodges + 1;
      // Reset the enemy's position to the left at a random height
      this.x = 0;
      this.y = random(0,height);
    }


}


 speedUpdate(){
// change the speed of enermy when players make dodges
  if(this.speed<50 && this.speed>0){           // set the max speed of enermy to 60
    	this.speed=this.orignalSpeed+0.5*this.dodges;  // rate of increased speed

      }

  else{this.speed=this.speed;} //  speed stops changing

console.log(this.speed);

}


display(){

imageMode(CENTER);
image(this.img,this.x,this.y,this.size,this.size/3);




}




}
