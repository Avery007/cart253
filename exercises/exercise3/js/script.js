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

// display the image of target at the right coner
let showtarget;
let showX;
let showY=90;

//background will gradually turn pink when players win
let backshow;
let opacity;

// The number of decoys to show on the screen
// chosen from the decoy images
let numDecoys;

// Keep track of whether they've won
let gameOver = false;
let gamecount;//count how many games played. this value is used to increase numDecoys and game level

// set a new game starter
let restart="Click to next level!";
let restartX;// location
let restartY;

//texts to show game information
let instruction="Where I am?";
let gamelevel;
let animalN;

//diaplay when players win
let wintime="Good Job! You got it!";


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


// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  numDecoys=50; // initial number.
  opacity=0;   // the pink background is invisible until players win
  gamecount=1;
  background(255,255,0,50);
  imageMode(CENTER);
  restartX=0; // hide restart button
  restartY=0;

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(50,width-150);// leave some empty place to put instruction
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

  showtarget= targetImage; // display the image of the dog that plays are supposed to find

}


// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {

  // fistly set the pink backgorund when game ends
  rectMode(CORNER);
  fill(255,1,255,opacity); // invisible
  rect(0,0,windowWidth,windowHeight);// cover whole screen

  //instruction texts
  textSize(15);
  textAlign(LEFT,LEFT);
  noStroke();
  fill(255);
  gamelevel="Level "+ gamecount; // display game level
  animalN="Animals " + numDecoys; // display the total number of animals on screen
  text(gamelevel,width-100,showY+120);
  text(animalN,width-110,showY+140);
  text(instruction,width-110,showY-40); // display instruction

  image(showtarget,width-60,showY,70,70);
 // display the instruction image with background color
  fill(17,48,207,100);
  rectMode(CENTER);
  rect(width-50,showY,150,350);

  image(targetImage,targetX,targetY); //targetimage

  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(28);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    text(wintime,width/2,height/3);
    // Tell them they won!

    restartX=width/2; // now reset and display the restart button
    restartY=height/2;

// opacity of pink background
  if (opacity<60){opacity=opacity+0.1;} // gradually becoming visible

    if( opacity>30&&targetX<windowWidth){  //move target image now
      targetX=targetX+1;
      image(targetImage,targetX,targetY);
      fill(255);
      text(restart,restartX,restartY); // display button to start a new game

  }
  else if(opacity<=29){ // Draw a circle around the dog to show where it is
  noFill();
  stroke(random(255));
   ellipse(targetX,targetY,targetImage.width,targetImage.height);
 }
  else {targetX=50;} // prevent the dog move off screen

}

else {opacity=0;} //reset the opacity after restart

}

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
// start a new game when players click the restart button
else if (restartX!==0 && mouseX>restartX-100 && mouseX<restartX+100){
    if (mouseY<restartY+50&& mouseY>restartY-50)     {
       gameOver = false;
       background(random(255)); // rest the background to hide texts

gamecount=gamecount+1;
newgame(); // calling new game function
    }
  }

}

function newgame(){
  numDecoys=numDecoys+gamecount*10;
  restartX=0; // reset the location of the button
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

redraw(); // recall the draw fucntion

}

  //else if ( restartX!==0 && mouseX > restartX-restart.width/2 && mouseX < restartX + restart.width/2) dosent work?
