"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

let showtarget;
let showX;
let showY=50;

let backshow;
let opacity;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys;

// Keep track of whether they've won
let gameOver = false;
let gamecount;
let nextgame;


let restart="restart";
let restartX;
let restartY;

let wintimeX;
let wintimeY;
let wintime="Good Job! You got it!";


// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage('./assets/images/animals-target.png');

  decoyImage1 = loadImage('./assets/images/animals-01.png');
  decoyImage2 = loadImage("./assets/images/animals-02.png");
  decoyImage3 = loadImage("./assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  numDecoys=50;
  opacity=0;
  gamecount=0;
  background(255,255,0,50);
  imageMode(CENTER);
  restartX=0;
  restartY=0;

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(50,width-150);
    let y = random(50,height-50);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(50,width-150);
  targetY = random(50,height-70);

  // And draw it (because it's the last thing drawn, it will always be on top)

  showtarget= targetImage;

image(showtarget,width-50,showY,50,50);
fill(17,48,207,100);
rectMode(CENTER);
rect(width-50,showY,100,100);





}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {


  rectMode(CORNER);
  fill(255,1,255,opacity);
  rect(0,0,windowWidth,windowHeight);

  image(targetImage,targetX,targetY);

  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(28);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
     text(wintime,wintimeX,wintimeY);
    // Tell them they won!
     wintimeX=width/2;
     wintimeY=height/3;

     restartX=width/2;
     restartY=height/2;
    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)

    //strokeWeight(10);

    if (opacity<80){opacity=opacity+0.1;}

    if( opacity>30&&targetX<1000){
      targetX=targetX+1;
      image(targetImage,targetX,targetY);
      fill(255);
      text(restart,restartX,restartY);

       }
  else if(opacity<=29){
  noFill();
  stroke(random(255));
   ellipse(targetX,targetY,targetImage.width,targetImage.height);
 }
  else {targetX=50;}


}

else {opacity=0;}



}
// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }

  else if (restartX!==0 && mouseX>restartX-50 && mouseX<restartX+50){
    if (mouseY<restartY+30&& mouseY>restartY-30)     {
       gameOver = false; restartX=20;
//gamecount=gamecount+1;
//numDecoys= numDecoys*gamecount*10;
background(255,255,0); gamecount=gamecount+1;
console.log(gamecount);
newgame();
    }
  }

}

function newgame(){
  numDecoys=numDecoys+gamecount*10;
  console.log(numDecoys);
  restartX=0;
  restartY=0;
   for (let i = 0; i < numDecoys; i++) {
  // Choose a random location on the canvas for this decoy
  let x = random(50,width-150);
  let y = random(50,height-50);
  // Generate a random number we can use for probability
  let r = random();
  // Use the random number to display one of the ten decoy
  // images, each with a 10% chance of being shown
  // We'll talk more about this nice quality of random soon enough.
  // But basically each "if" and "else if" has a 10% chance of being true
  if (r < 0.1) {
    image(decoyImage1,x,y);
  }
  else if (r < 0.2) {
    image(decoyImage2,x,y);
  }
  else if (r < 0.3) {
    image(decoyImage3,x,y);
  }
  else if (r < 0.4) {
    image(decoyImage4,x,y);
  }
  else if (r < 0.5) {
    image(decoyImage5,x,y);
  }
  else if (r < 0.6) {
    image(decoyImage6,x,y);
  }
  else if (r < 0.7) {
    image(decoyImage7,x,y);
  }
  else if (r < 0.8) {
    image(decoyImage8,x,y);
  }
  else if (r < 0.9) {
    image(decoyImage9,x,y);
  }
  else if (r < 1.0) {
    image(decoyImage10,x,y);
  }
}

targetX = random(50,width-150);
targetY = random(50,height-70);

showtarget= targetImage;

image(showtarget,width-50,showY,100,100);
fill(17,48,207,100);
rectMode(CENTER);
rect(width-50,showY,150,150);


redraw();


}


//function newgame(){
//  if(nextgame){ gamecount=gamecount+1; numDecoys= numDecoys*gamecount*10;opacity=0;

//}



  //else if ( restartX!==0 && mouseX > restartX-restart.width/2 && mouseX < restartX + restart.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
  //  if (mouseY > restartY - restart.height/2 && mouseY < restarY + restart.height/2) {
      //gameOver = false;
