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


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;

//move triangle from left to the right


  // Make the circle transparent red
  fill(255,0,0,10);

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

   // display the triangle

fill(0,0,170,10);
stroke(255);
   trix1 += 1;
   trix2 += 1;
   trix3 += 1;

  triangle(trix1,50,trix2,25,trix3,50);
}
