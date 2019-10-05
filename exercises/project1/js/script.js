"use strict";

/******************************************************

Game - Chaser

Modified by Qingyi Deng

This game is based on the mystery of pyramid. The player is an engyptian walking inside the pyramid and can move with keys,
Player has to overlap the (randomly moving) orb to keep healthy or they will die.
The color of player image is corresponding to player's health state.
There is a hole linked to the image of Atlantis at the end of the background image. Player will travel to another world when they success.


Includes: Physics-based movement, keyboard controls, health/stamina,
random movement(noise), screen wrap. Using tint() to control image opacity.

******************************************************/

// Track which stage the game is in
let gameState;

// Player position, size, velocity
let playerX;
let playerY;
let playerSizeX= 80;
let playerSizeY=150;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 3;
// Player health
let playerHealth;
let playerMaxHealth = 200;

// orb position, size, velocity
let orbX;
let orbY;
let orbRadius;
let orbVX;
let orbVY;
let orbMaxSpeed = 4;
// orb health
let orbHealth;
let orbMaxHealth = 100;
// orb fill color
let orbFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the orb
let absorbHealth = 10;
// Number of orb absorbed during the game (the "score")
let orbAbsorb = 0;

let noisetime; // the value inside noise function

let speedupX; // increase player speed when press shift
let speedupY;

let playerimage; // change the player from a cicrle to image
let backimage;
let backgroundX; // backgorund image X

let otherside; // the image showing up when player wins the game
let osOpacity; // the opacity of this image

let front;  // add a front image to make game more meaningful
let frontOpacity;

let gameWinText; // display when player wins
let guide; // game instructions

let isWinner; // check if player wins


function preload(){
  backimage= loadImage('./assets/images/backimgtry.png'); // https://pixabay.com/images/search/egyption%20wall/
  //https://hiddenincatours.com/cholula-mexico-the-worlds-largest-ancient-pyramid/
  playerimage= loadImage('./assets/images/player.png'); //https://www.tes.com/teaching-resource/ancient-egyptian-clothing-6446514
  otherside= loadImage('./assets/images/altlantisa.png'); //www.pinterest.ca/pin/612771093023538915/
  front= loadImage('./assets/images/front.png');//pixabay.com/illustrations/pyramids-gizeh-night-caravan-camel-3913843/
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noisetime=0;
  speedupX=0; // no speedup without key pressed
  speedupY=0;
  noStroke();
  osOpacity=0; // make the image invisible
  gameState = 0; // use 0 represents before game starts
  isWinner=false;
  setupFront(); // show a front image of the game before it starts
  setupOrb(); // change prey to orb
  setupPlayer();

  backgroundX=-3500; // so the background image can move gradually from left to right

}

// Initialises orb's position, velocity, and health
function setupFront(){

  imageMode(CORNER);
  frontOpacity=255;
  tint(255,frontOpacity); // use tint() to control front image's opacity
  image(front,0,0,windowWidth/1.5,windowHeight/1.5);

  rectMode(CENTER); // create a button to start game
  fill(252,219,3,frontOpacity-50);
  rect(windowWidth/2.7,windowHeight/3,160,50);
  textSize(12);
  fill(255,frontOpacity);
  text("Enter the pyramid !",windowWidth/3,windowHeight/3); }

function setupOrb() {
  orbX = width / 5;
  orbY = height / 2;
  orbVX = -orbMaxSpeed;
  orbVY = orbMaxSpeed;
  orbHealth = orbMaxHealth;
}

// setupPlayer()
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}


function draw() {
// use gameState to check which functions should run
  if (gameState===1)
  { // While the game is active,

    if(backgroundX<0)  // move the background image automatically
    {backgroundX=backgroundX+0.5;} // background image stops moving when the left corner has moved to (0.0)
                                    // this means the player has moved to the destination where the hole shows up
  else if (backgroundX>0){backgroundX=0;}
  console.log(backgroundX);

    handleInput(); // set key controls
    movePlayer(); // move player when press keys
    moveOrb();   // set orb movement
    updateHealth(); //continues check player's health to see if game ends
    checkOrbAbsorb(); // check how many orbs player absorbs
    drawbackground(); // set the backgorund image
    drawInstruction(); // set instructions
    drawOrb();
    drawPlayer();
    checkwin(); // check if player wins

  }

  if(gameState===2){ // 2 represents game over
    showGameOver();

  }
  else if (gameState===3) { // 3 represents player wins
    wintime();

  }
  //else {};
}

// handleInput()
// Checks arrow keys and adjusts player velocity accordingly

function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
      playerVX = -playerMaxSpeed;
      if (keyIsDown(SHIFT)){speedupX=-5;// increase player speed when both shift and left arrow presesed
        playerHealth=playerHealth-1; // reduce player's health as the key is pressed
       }
}

else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    if (keyIsDown(SHIFT)){speedupX=5; // increase player speed corresponding to the moving direction
      playerHealth=playerHealth-1;
     }
}

// Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    if (keyIsDown(SHIFT)){speedupY=-5; // increase player speed corresponding to the moving direction
      playerHealth=playerHealth-1;
     }
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    if (keyIsDown(SHIFT)){speedupY=5; // increase player speed corresponding to the moving direction
      playerHealth=playerHealth-1;
     }
  }

}

// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX + speedupX; // allow player to speed up
  playerY = playerY + playerVY + speedupY;

// Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.1;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameState = 2;
  }

}


// Check if the player overlaps the orb and updates health of both
function checkOrbAbsorb() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, orbX, orbY);
  // Check if it's an overlap
  if (d < playerSizeX/2 + orbRadius) {
    // Increase the player health
    playerHealth = playerHealth + absorbHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    orbHealth = orbHealth - absorbHealth;
    // Constrain to the possible range
    orbHealth = constrain(orbHealth, 0, orbMaxHealth);

    // Check if the prey died (health 0)
    if (orbHealth === 0) {
      // Move the "new" prey to a random position
      orbX = random(0, width);
      orbY = random(0, height);
      // Give it full health
      orbHealth = orbMaxHealth;
      // Track how many prey were eaten
      orbAbsorb = orbAbsorb + 1;
    }
  }
}


// Moves the prey based on random velocity changes
function moveOrb() {
  // Change the orb's velocity
  noisetime=noisetime+0.01;// make noisetime keep increasing so noise() returns different value
  orbVX = noise(noisetime)*7;
  orbVY = noise(noisetime)*5;

// Update ord position based on velocity
  orbX = orbX + orbVX;
  orbY = orbY + orbVY;

  // Screen wrapping
  if (orbX < 0) {
    orbX = orbX + width;
  }
  else if (orbX > width) {
    orbX = orbX - width;
  }

  if (orbY < 0) {
    orbY = orbY + height;
  }
  else if (orbY > height) {
    orbY = orbY - height;
  }
}


// Draw the orb as an ellipse
function drawOrb() {

  fill(orbFill, 100);// to make the orb easier to notice, set its color to fixed value
  textSize(15);

  if(orbAbsorb<1){ // add an instruction of the Orb before players eat them
  text("Hello, I am an Orb!",orbX-10,orbY-10);}

  orbRadius = noise(noisetime)*20; // use noise() to create changable size
  ellipse(orbX, orbY, orbRadius);

}

// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {

  tint(0, 153, 204,playerHealth);
  imageMode(CENTER);
  image(playerimage,playerX, playerY, playerSizeX,playerSizeY);

}

function drawbackground(){
     imageMode(CORNER);
     noTint();
     image(backimage,backgroundX,0,3500+windowWidth,windowHeight);
}

function drawInstruction(){
   if(backgroundX<0){ // when player has not moved to destination
    textSize(12);     // show game instructions
    fill(255,200);
    guide="Wanna run faster ? \n" + "Press Shift to speed up!\n";
    guide= guide + "But is it good for health ?";
    text(guide,windowWidth-200,20);

  }

  else if(backgroundX===0){
     guide="oh, what is inside the hole? Go and see ?";
     textSize(20);
     fill(255,200);
     text(guide,windowWidth/2,50);

  }

}// end of drawInstruction


// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = "GAME OVER, YOU DIE\n"; // \n means "new line"
  gameOverText = gameOverText + "You failed to absorb enough orbs to maintain your health\n";
  gameOverText = gameOverText + "Good luck next time";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

function keyReleased() { // set players moving speed to 0 when no key is pressed
    speedupX=0;
    speedupY=0;

    playerVX = 0;
    playerVY = 0;

  }

function mousePressed(){ //start the game and hide front image when player click the button
    gameState=1; // start game
    frontOpacity=0;
  }

function wintime(){
  /// things to display when player wins
  // firstly, change the backgorund image
  tint(255,osOpacity);
  if (osOpacity<255) {
  osOpacity=osOpacity+0.5;
}
  else {osOpacity=255;}

   imageMode(CORNER);  // display the new background
   image(otherside,0,0,width,height);

   textSize(35); // display text
   fill(252,244,3,osOpacity);
   gameWinText="Congratulations!\n" + "You've just passed the time tunnel\n";
   gameWinText=gameWinText + "Welcome Back to Atlantis!\n" + "Now you know the secret of the pyramid\n";
   gameWinText=gameWinText +  "Don't you?";
   text(gameWinText, windowWidth/2.5,150);

 }


 function checkwin(){ // chekc if player wins by check if player has moved to the destination

   if (backgroundX===0 && playerX<140){
    isWinner=true;
    gameState=3;
  }
    else {isWinner=false;}
 }
