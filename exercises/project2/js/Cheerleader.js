class Cheerleader{



  // constructor
  constructor(x,y,attraction, img, activeKey) {
    // Position

    // Velocity and speed
    this.x = x;
    this.y = y;

    this.img = img;


    // creat a black box which can be generated by calling the boss and use to get more points
    this.attraction=attraction;
    this.size=100; // link the size with boss'power
    this.activeState = false; // used to track if the black box is active
  //  this.name = name;

    this.keyActivate=activeKey; // key control to activate cheerleader

    this.callCount=0;
  //  this.CheerleaderN=cheerleaderN;

  }




keyControl(){
                                          /// why only one key is effective

if(keyIsDown(this.keyActivate)){

  this.activeState=true;
}

else{this.activeState=false;

}
}


  display() { // display Cheerleader

  if (this.activeState) { // check if the key is pressed


    
       imageMode(CENTER);
       image(this.img, this.x, this.y, this.size, this.size);
    //  fill(255);
      //textSize(60);
      //text(this.name, 500, 100);
      //console.log(this.size);

  }
  //else{this.x=-this.size; this.y=0;}

  }

}
