class RotateTriangle{

constructor(x, y, speed, size,img) {
  // Position
  this.x = x;
  this.y = y;
  // Velocity and speed
  this.vx = 0;
  this.vy = 0;
  this.speed = speed;

  // power properties
  this.size = size;
   this.noiseTimeX=random(0,50);
   this.noiseTimeY=random(0,10);



   this.getCount=0;
   this.rate=this.getCount;
  this.img = img; // display player as images
  this.isFailed = false; // check if players are dead
}

move(){

  this.noiseTimeX = this.noiseTimeX + 0.01; // make noisetime keep increasing so noise() returns different value
  this.noiseTimeY = this.noiseTimeY + 0.02;
  this.vx = map(noise(this.noiseTimeX), 0, 1, -this.speed, this.speed);
  this.vy = map(noise(this.noiseTimeY), 0, 1, -this.speed, this.speed);

  if(this.x>width||this.x<0||this.y<0||this.y>height){// check if gets off the screen
// reset
    this.x=random(0,width);
    this.y=random(0,height);
  }
  else{// move
  this.x=this.x+this.vx;
  this.y=this.y+this.vy;


}
// rotate the attacker
this.rotation();
}


//rotate the attacker
 rotation(){

  push();

  translate(this.x,this.y);
  rotate(degrees(1*millis()/10000));
  image(this.img,0,0,100,100);
pop();


}






}
