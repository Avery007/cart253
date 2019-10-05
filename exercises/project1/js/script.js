"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameState;

// Player position, size, velocity
let playerX;
let playerY;
let playerSizeX= 80;
let playerSizeY=150;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 5;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

let noisetime;

let speedupX;
let speedupY;

let playerimage;
let backimage;
let backgroundX;

let otherside;
let osOpacity;

let front;
let frontOpacity;
// setup()
//
// Sets up the basic elements of the game
function preload(){
  backimage= loadImage('./assets/images/backimgtry.png'); // https://pixabay.com/images/search/egyption%20wall/
  //https://hiddenincatours.com/cholula-mexico-the-worlds-largest-ancient-pyramid/
  //https://www.tes.com/teaching-resource/ancient-egyptian-clothing-6446514
  playerimage= loadImage('./assets/images/player.png');
  otherside= loadImage('./assets/images/altlantisa.png');
    front= loadImage('./assets/images/frontimg.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  noisetime=0;
  speedupX=0;
  speedupY=0;
  noStroke();
osOpacity=0;
gameState = 0;

   setupFront();
  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();

 backgroundX=-3500;

}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupFront(){imageMode(CORNER);
  frontOpacity=200;
  tint(255,frontOpacity);
  image(front,0,0,windowWidth/1.5,windowHeight/1.5);
  rectMode(CENTER);
  fill(252,219,3,frontOpacity-50);
  rect(windowWidth/2.7,windowHeight/3,160,50);
  textSize(12);
  fill(255,frontOpacity);
  text("Enter the pyramid !",windowWidth/3,windowHeight/3); }

function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  //background(100, 100, 200);



    //imageMode(CORNER);
  //noTint();
//  image(backimage,backgroundX,0,3500+windowWidth,windowHeight);
  tint(255,osOpacity);
  image(otherside,10,10,windowWidth,windowHeight);
  if (backgroundX===0 && playerX<140){osOpacity=osOpacity+1};
  if (gameState===1) {
    if(backgroundX<0){
    backgroundX=backgroundX+1;}
    else if (backgroundX>0){backgroundX=0;}
    console.log(playerX);
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();
     drawbackground();
    drawPrey();
    drawPlayer();
  }
  else if(gameState===2){
    showGameOver();

  }
  //else {};
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly


function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
      playerVX = -playerMaxSpeed;
      if (keyIsDown(SHIFT)){speedupX=-5;
        playerHealth=playerHealth-1;
       }

}


  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    if (keyIsDown(SHIFT)){speedupX=5;
      playerHealth=playerHealth-1;
     }


}


  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    if (keyIsDown(SHIFT)){speedupY=-5;
      playerHealth=playerHealth-1;
     }
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    if (keyIsDown(SHIFT)){speedupY=5;
      playerHealth=playerHealth-1;
     }
  }

}
// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX + speedupX;
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
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerSizeX/2 + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity
  noisetime=noisetime+0.01;

  preyVX = noise(noisetime)*7;
  preyVY = noise(noisetime)*5;


  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill, preyHealth);

  preyRadius = noise(noisetime)*20;

  ellipse(preyX, preyY, preyRadius);
  console.log(preyRadius);

}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  //fill(playerFill, playerHealth);
  //tint(255,100);
  tint(0, 153, 204,playerHealth);
  imageMode(CENTER);
  image(playerimage,playerX, playerY, playerSizeX,playerSizeY);
  //playerRadius * 2
}

function drawbackground(){
imageMode(CORNER);
noTint();
image(backimage,backgroundX,0,3500+windowWidth,windowHeight);}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

function keyReleased() {
  speedupX=0;
  speedupY=0;

    playerVX = 0;
    playerVY = 0;

  }

function mousePressed()
{gameState=1;
frontOpacity=0;}