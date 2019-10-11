"use strict";

/******************************************************

Game - Chaser

Modified by Qingyi Deng

This game is based on the mystery of the pyramids. The player is like an ancient engyptian walking inside the pyramid and can move with keys,
To win the game, player needs to reach the destination--There is a hole linked to the image of Atlantis which will show up when the background image stops movng. Player will travel to another world when they success.
During the game, player has to overlap the (randomly moving) orb to keep healthy or they will die. There are also spells with random movement that will reduce player's size and helath.
The color of player image is corresponding to player's health state. Player dies when both of their health index or size reduced to zero


Includes: Physics-based movement, keyboard controls, health/stamina, sounds
random movement(noise), screen wrap. Using tint() to control image opacity.

******************************************************/

// Track which stage the game is in
let gameState;

// Player position, size, velocity
let playerX;
let playerY;
// set the initial size of player
let playerSizeX = 40;
let playerSizeY = 80;

let playerVX = 0; // player movement
let playerVY = 0;
let playerMaxSpeed = 4;
// Player health
let playerHealth;
let playerMaxHealth = 200;

// orb position, size, velocity
let orbX;
let orbY;
let orbRadius;
let orbVX;
let orbVY;
let orbMaxSpeed = 6;
// orb health
let orbHealth;
let orbMaxHealth = 100;
// orb fill color
let orbFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the orb
let absorbHealth = 10;
// Number of orb absorbed during the game (the "score")
let orbAbsorb = 0;

let noiseTimeX = 0; // for orb movement, the value inside noise function,
let noiseTimeY = 0;

let speedupX = 0; // increase player speed when press shift
let speedupY = 0; // no speedup without key pressed

let playerimage; // change the player from a cicrle to image
let backimage; // background image
let backgroundX; // backgorund image X

let atlantis; // the image showing up when player wins the game
let atlantisOpacity = 0; // make the image invisible

// set front image's size and visibility
let front; // add a front image to make game more meaningful
let frontOpacity;
let frontSizeX;
let frontSizeY;

let gameWinText; // display when player wins
let guide; // game instructions

let backgroundSound; // add background sound
let atlantiSound; // add sound when player wins
let gameOverSound;
let absorbSound; // display when player absorbs orbs
let spellSound; // display when player runs into the spell

// add a spell, set spell speed, movemment, and size
let spell;
let spellX;
let spellY;
let spellVX = 0;
let spellVY = 0;
let spellSize;
let spellMaxSpeed = 13;
// To make spell movememnt different from orb, use another noisetime
let noiseTimeXspell = 0;
let noiseTimeYspell = 0;

// function preload()
function preload() {

  backimage = loadImage('./assets/images/backimgtry.png'); // https://pixabay.com/images/search/egyption%20wall/
  //https://hiddenincatours.com/cholula-mexico-the-worlds-largest-ancient-pyramid/
  playerimage = loadImage('./assets/images/player.png'); //https://www.tes.com/teaching-resource/ancient-egyptian-clothing-6446514
  atlantis = loadImage('./assets/images/atlantis.png'); //www.pinterest.ca/pin/612771093023538915/
  front = loadImage('./assets/images/front.png'); //pixabay.com/illustrations/pyramids-gizeh-night-caravan-camel-3913843/
  spell = loadImage('./assets/images/spell0.png'); //https://pixabay.com/vectors/egyptian-hieroglyphics-king-plaque-159708/
  backgroundSound = loadSound("assets/sounds/insidepyramid.wav"); // I created it
  absorbSound = loadSound("assets/sounds/absorb1.mp3"); // http://www.orangefreesounds.com/
  atlantiSound = loadSound("assets/sounds/atlantis.wav"); // http://www.orangefreesounds.com/mysterious-piano/
  gameOverSound = loadSound("assets/sounds/end.wav"); //http://www.orangefreesounds.com/sonar-sound/
  spellSound = loadSound("assets/sounds/gasp.wav"); //https://www.freesoundeffects.com/free-sounds/human-sound-effects-10037/80/tot_sold/20/5/
}

// setup
function setup() {

  createCanvas(windowWidth, windowHeight);

  backgroundX = -3500; // set the length of background image to negative number
  // so the background image can move gradually from left to right
  gameState = 0; // use 0 representing before game starts

  noStroke();
  setupFront(); // show a front image of the game before it starts
  setupOrb(); // change prey to orb
  setupPlayer();
  setupSpell();

}

// set the front image before game starts
function setupFront() {

  frontSizeX = windowWidth / 1.5;
  frontSizeY = windowHeight / 1.5;

  imageMode(CORNER);
  frontOpacity = 255; // make front visible in the beginning
  tint(255, frontOpacity); // use tint() to control front image's opacity
  image(front, 0, 0, frontSizeX, frontSizeY);

  rectMode(CENTER); // create a button to start game
  fill(252, 219, 3, frontOpacity - 50);
  rect(frontSizeX - 300, frontSizeY / 2, 160, 50); // adjust the button position based on frontSize

  textSize(12); // set text within the button
  fill(255, frontOpacity);
  text("Enter The Pyramids", frontSizeX - 354, frontSizeY / 2);
}

// Initialises orb's position, velocity, and health
function setupOrb() {
  orbX = width / 5;
  orbY = height / 2;
  orbVX = -orbMaxSpeed; // limit orb speed
  orbVY = orbMaxSpeed;
  orbHealth = orbMaxHealth;
}

// Initialises spell's position, display and size
function setupSpell() {
  spellX = 0; // initial position
  spellY = 0;
  noTint(); // make spell look clear
  spellSize = 100;

}

// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}



function setupBackSound() { // add sounds

  backgroundSound.loop();

}

function gameEndSound() { // add sounds

  gameOverSound.setVolume(0.2); // reduce sound volune

  if (!gameOverSound.isPlaying()) { // avoid loop
    gameOverSound.loop();

  }

}

function AbsorbSound() { // add sounds when player absorb orbs

  absorbSound.setVolume(0.1); // reduce sound volune

  if (!absorbSound.isPlaying()) { // avoid loop
    absorbSound.play();

  }

}

function WinSound() { // add sounds when win

  atlantiSound.setVolume(0.7);
  //if (!atlantiSound.isPlaying()) {
  atlantiSound.loop();
  //}
}

function draw() {
  // use gameState to check which functions should run
  if (gameState === 1) { // While the game is active,

    if (backgroundX < 0) // move the background image automatically
    {
      backgroundX = backgroundX + 0.5;
    } // background image stops moving when the left corner has moved to (0.0)
    // this means the player has moved to the destination where the hole shows up
    else if (backgroundX > 0) {
      backgroundX = 0;
    }
    console.log(backgroundX);

    handleInput(); // set key controls
    movePlayer(); // move player when press keys
    moveOrb(); // set orb movement
    moveSpell(); // move the image of spell
    updateHealth(); //continues check player's health to see if game ends
    checkOrbAbsorb(); // check how many orbs player absorbs
    checkSpell(); // check if player runs into spells
    drawbackground(); // set the backgorund image
    drawInstruction(); // set instructions
    drawOrb(); // display orb
    drawPlayer(); // display player
    drawSpell(); // display spell

    checkwin(); // check if player wins

  }

  if (gameState === 2) { // 2 represents game over
    showGameOver(); // display game over
    // reset player's health to zero
    playerHealth = 0;
    backgroundSound.stop(); // Stop background music
    gameEndSound(); // start game over sound

  } else if (gameState === 3) { // 3 represents player wins
    wintime(); // display when player wins
    backgroundSound.stop();

  }

}

// handleInput()
// Checks arrow keys and adjusts player velocity accordingly

function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
    if (keyIsDown(SHIFT)) {
      speedupX = -9; // increase player speed when both shift and left arrow presesed
      playerHealth = playerHealth - 1.5; // reduce player's health as the key is pressed
    }
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    if (keyIsDown(SHIFT)) {
      speedupX = 9; // increase player speed corresponding to the moving direction
      playerHealth = playerHealth - 1.5;
    }
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    if (keyIsDown(SHIFT)) {
      speedupY = -9; // increase player speed corresponding to the moving direction
      playerHealth = playerHealth - 1.5;
    }
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    if (keyIsDown(SHIFT)) {
      speedupY = 9; // increase player speed corresponding to the moving direction
      playerHealth = playerHealth - 1.5;
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
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
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
  if (playerHealth === 0 || playerSizeX <= 0) {
    // If so, the game is over
    gameState = 2;
  }

}


// Check if the player overlaps the orb and updates health of both
function checkOrbAbsorb() {
  // Get distance of player to orb
  let d = dist(playerX, playerY, orbX, orbY);
  // Check if it's an overlap
  if (d < playerSizeX / 2 + orbRadius) {
    AbsorbSound(); // add sound when player absorbs orb

    // change playersize when player absorb orbs
    playerSizeX = playerSizeX + 0.5;
    playerSizeY = playerSizeY + 1;

    // Increase the player health
    playerHealth = playerHealth + absorbHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the orb health

    orbHealth = orbHealth - absorbHealth;
    // Constrain to the possible range
    orbHealth = constrain(orbHealth, 0, orbMaxHealth);

    // Check if the orb died (health 0)
    if (orbHealth === 0) {
      // Move the "new" orb to a random position
      orbX = random(0, width);
      orbY = random(0, height);
      // Give it full health
      orbHealth = orbMaxHealth;
      // Track how many orb were absorbed
      orbAbsorb = orbAbsorb + 1;
    }
  }
}

// make players lose size and  health when they run into the spell
function checkSpell() {
  // Get distance of player to spell
  let dSpell = dist(playerX, playerY, spellX, spellY);
  // Check if it's an overlap
  if (dSpell < playerSizeX / 2 + spellSize / 2) {
    // play sound
    spellSound.play();
    spellSound.setVolume(0.5);
    //reset spell position
    spellX = 0;
    spellY = random(0, height);
    // reduce player size and health

    playerSizeX = playerSizeX - 15;
    playerSizeY = playerSizeY - 30;
    playerHealth = playerHealth - 10;

  }

}
// set spell movement
function moveSpell() {
  // make noisetime keep increasing so noise() returns different value
  noiseTimeXspell = noiseTimeXspell + 0.02;
  noiseTimeYspell = noiseTimeYspell + 0.01;
  // random movement
  spellVX = map(noise(noiseTimeXspell), 0, 1, -spellMaxSpeed, spellMaxSpeed);
  spellVY = map(noise(noiseTimeYspell), 0, 1, -spellMaxSpeed, spellMaxSpeed);

  // Update ord position based on velocity
  spellX = spellX + spellVX;
  spellY = spellY + spellVY;

  // Screen wrapping
  if (spellX < 0) {
    spellX = spellX + width;
  } else if (spellX > width) {
    spellX = spellX - width;
  }

  if (spellY < 0) {
    spellY = spellY + height;
  } else if (spellY > height) {
    spellY = spellY - height;
  }
}


// Moves the orb based on random velocity changes
function moveOrb() {
  // Change the orb's velocity
  noiseTimeX = noiseTimeX + 0.01; // make noisetime keep increasing so noise() returns different value
  noiseTimeY = noiseTimeY + 0.02;
  orbVX = map(noise(noiseTimeX), 0, 1, -orbMaxSpeed, orbMaxSpeed);
  orbVY = map(noise(noiseTimeY), 0, 1, -orbMaxSpeed, orbMaxSpeed);

  // Update ord position based on velocity
  orbX = orbX + orbVX;
  orbY = orbY + orbVY;

  // Screen wrapping
  if (orbX < 0) {
    orbX = orbX + width;
  } else if (orbX > width) {
    orbX = orbX - width;
  }

  if (orbY < 0) {
    orbY = orbY + height;
  } else if (orbY > height) {
    orbY = orbY - height;
  }
}


// Draw the orb as an ellipse
function drawOrb() {

  fill(random(0, 255), 170); // random color
  textSize(15);

  if (orbAbsorb < 1) { // add an instruction of the Orb before players eat them
    text("Hello, I am an Orb!", orbX - 10, orbY - 10);
  }

  orbRadius = noise(noiseTimeX) * 20; // use noise() to create changable size
  ellipse(orbX, orbY, orbRadius); // display orb

}
// Draw the spell
function drawSpell() {
  noTint(); // make spell clear
  imageMode(CENTER);
  image(spell, spellX, spellY, spellSize, spellSize);

}

// Draw the player
function drawPlayer() {

  //tint(0, 153, 204,playerHealth);
  tint(250, 237, 0, playerHealth);
  imageMode(CENTER);
  image(playerimage, playerX, playerY, playerSizeX, playerSizeY);

}

// display background
function drawbackground() {
  imageMode(CORNER);
  noTint();
  image(backimage, backgroundX, 0, 3500 + windowWidth, windowHeight);
}

// display instuction
function drawInstruction() {
  if (backgroundX < 0) { // when player has not moved to destination
    textSize(14); // show game instructions
    fill(255, 200);
    guide = "To catch the orbs,\n" + "Use the hands not the feet!\n";
    guide = guide + "Be careful of the ancient spells!\n" + "Press Shift to speed up!\n";
    guide = guide + "A surprise is waiting for you\n" + "at the destination! \n\n";
    guide = guide + "Your Health Index: " + floor(playerHealth);
    if(playerSizeX<0){playerSizeX=0;}// set playerSizeX to zero when gome over
    guide = guide + "\nYour Size: " + floor(playerSizeX);
    text(guide, windowWidth - 220, 30);

  } else if (backgroundX === 0) { // destination
    guide = "oh, what is inside the hole? Go and see ?";
    textSize(20);
    fill(255, 200);
    text(guide, windowWidth / 2, 50);

  }

} // end of drawInstruction


// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = "GAME OVER, YOU DIE\n" + "You absorbed " + orbAbsorb + " orbs\n"; // \n means "new line"
  gameOverText = gameOverText + "You don't absorb enough orbs to maintain your health\n";
  gameOverText = gameOverText + "So you failed to know the mystery of the pyramid ";
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

// when no key is pressed
function keyReleased() { // set players moving speed to 0 when no key is pressed
  speedupX = 0;
  speedupY = 0;

  playerVX = 0;
  playerVY = 0;

}

function mousePressed() { //start the game and hide front image when player click the button
  if (frontOpacity === 255) { // use frontOpacity to check game state
    gameState = 1; // start game
    frontOpacity = 0;
    setupBackSound(); // play background sound when game starts
  }
}

// applys when player wins
function wintime() {
  /// things to display when player wins
  // firstly, change the backgorund image
  tint(255, atlantisOpacity);
  if (atlantisOpacity < 255) { // increase wopacity hen opacity <255
    atlantisOpacity = atlantisOpacity + 0.5;

  } else {
    atlantisOpacity = 255; // set max opacity to 255
  }

  imageMode(CORNER); // display the new background
  image(atlantis, 0, 0, width, height); // display image of atlantis

  textSize(35); // display text
  fill(252, 244, 3, atlantisOpacity);
  gameWinText = "Congratulations!\n" + "You've just passed the time tunnel\n";
  gameWinText = gameWinText + "Welcome Back to Atlantis!\n" + "Now you know the secret of the pyramid\n";
  gameWinText = gameWinText + "Don't you?";
  text(gameWinText, windowWidth / 2.5, 150);

}


function checkwin() { // chekc if player wins by check if player has moved to the destination

  if (backgroundX === 0 && playerX < 140) {
    WinSound(); // play music
    gameState = 3;
  }

}
