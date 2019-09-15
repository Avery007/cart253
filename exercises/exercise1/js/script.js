// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;
let text = "Hello, Word!";
// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

//add an triangle
let trix1=0;
let trix2=30;
let trix3=60;

// add a rectangle with random movement
let randamRectX;
let randamRectY;



function preload() {



}



// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas

  createCanvas(640,640);



  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this

}



// add a function to generate random numbers
function RandomN(low,high) {
	return Math.floor(Math.random()*(high-low+1)+low);
}


// Change the circle and square's positions so they move
// Draw the circle and square on screen
function draw() {

  // add background to get rid of moving effect
  background(246, 255, 176);

  // display the random rectangle
  fill(158, 66, 255);
  randamRectX= RandomN(0,600);
  randamRectY= RandomN(0,600);
  rect(randamRectX,randamRectY,50,50);


  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,100);

  // nostroke for ellipse and rectangle
  noStroke();

  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);


   // display the triangle,move triangle from left to the right
fill(158, 66, 255);
stroke(255);
   trix1 += 0.5;
   trix2 += 0.5;
   trix3 += 0.5;

  triangle(trix1,100,trix2,50,trix3,80);

//add an elispe always following your mouse
  ellipse(mouseX,mouseY,25,40);



}
