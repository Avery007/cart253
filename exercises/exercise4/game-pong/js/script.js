"use strict";

// Pong
// by Qingyi Deng
//
// A "simple" implementation of Pong with no scoring system
// paddle the ball to move the fireball
// to win the game, player needs to move the fireball toward the dragon in order to kill it.
// when player fails to paddle, the fireball will move left, when it approachs the player, game loses
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle






//game music
let bgMusic; // background music
let winSound; // sound when player wins
let yeahSound; // sound when player wins
let loseSound; // sound when player loses

let result=0; // used to track game state

let countCollision=0;// count how mnay time paddle
let score=0; // caculate score
let lose=0;//count how many times player fails

let scoreImage; // display the score by a fireball image
let backImage; //background image

let offScreen; // check when ball off screen

// display the score as an image
let displayScoreX;
let displayScoreY;

let message;// display instruction

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 15,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 10,
  h: 70,
  vy: 0,
  speed: 7,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 10,
  h: 70,
  vy: 0,
  speed: 7,
  upKey: 38,
  downKey: 40
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  backImage = loadImage('./assets/images/background.png');
  scoreImage = loadImage('./assets/images/ball.jpg');
  bgMusic = loadSound("assets/sounds/backmusic.wav");
  winSound= loadSound("assets/sounds/dragondie.mp3");
  yeahSound= loadSound("assets/sounds/yeah.mp3");
  loseSound= loadSound("assets/sounds/lose.mp3");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(800, 500);
  rectMode(CORNER);

  noStroke();

  setupPaddles();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 ;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {

  // display the background
    image(backImage,0,0,800,500);

if(result===0){ // before game starts, showing introduction
  displayStartMessage();
}

  if (result===1) { // game starts
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    checkResult();

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      // If it went off either side, reset it
      resetBall();
      // This is where we would likely count points, depending on which side
      // the ball went off...
    }
  }

  // We always display the paddles and ball so it looks cool!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall(); // display the moving ball
  displayScore(); // display the fireball as score
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x- ball.size/2 < 0 ) {
    offScreen="left";// record which direction it runs off
    return true;}

  else if(ball.x+ball.size/2>width ) {
   offScreen="right";
  return true;
  }
  else {
    return false;

  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;

    // Play our bouncing sound effect by rewinding and then playing
   beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y ;
  let paddleBottom = paddle.y + paddle.h;
  let paddleLeft = paddle.x ;
  let paddleRight = paddle.x+ paddle.w ;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;


      // Play our bouncing sound effect by rewinding and then playing
     beepSFX.currentTime = 0;
      beepSFX.play();

      countCollision=countCollision+1;// count how many times the ball and paddle collise

      if(ball.x>width-15 || ball.x<15){ // change vy direction when the ball hit paddle bottom or top
        console.log(ball.x)
        console.log(ball.y);
        ball.vy = -ball.vy;
      }

    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  fill(252, 232, 3);
  ellipse(ball.x, ball.y, ball.size, ball.size);

}

function displayScore(){ // showing score by the location of the fireball

  // count score,so the firball move right when player successifully paddle
  // and it move left when player misses
    score=countCollision-lose;

    displayScoreX=width/3+score*20; // set the score image, making the location corresponding to the score
    displayScoreY=height/2;

    image(scoreImage,displayScoreX,displayScoreY,100,100); // display score image

}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  lose=lose+1; //count how mnay times player fails to paddle
  // reset the location, moveing direction of the fireball
  ball.x = width / 2;
  ball.y = height / 2;

  if(offScreen==="right"){ // set the moving direction based on where it runs off last time
  ball.vx = -ball.speed;}
  else{ball.vx=ball.speed;}

  ball.vy = random(ball.speed-1,ball.speed+4); // reset a random speed
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(20);
  message="Can you kill the dragon?\n" + "Paddle the jumping ball to move the fireball\n";
  message=message + "You must move it towards the dragon\n"
  message=message +"Or you will be killed!\n" + "Click to start!";
  text(message, width / 2, 100);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  result = 1; // start the game when mouse is clicked
  bgMusic.loop();// and play background music
}

function checkResult(){ // check ig player wins or lose
  if(displayScoreX<80){ // means player loses the game
    result="lose";
    loseSound.loop();
  }
  else if (displayScoreX>530) { // means dragon is killed and players win
    result="win";
  winSound.loop();
  yeahSound.loop();

  }

}
