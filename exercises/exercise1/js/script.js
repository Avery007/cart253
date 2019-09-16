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
//let text = "Hello, Word!";
// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;


// an image with random movement
let randamRectX;
let randamRectY;
let image1;

// image from left to right
let imagedoge;

//set image location
let imageX=0;
let imageY=100;

// add text
let thetext="You dont understand!";


function preload() {

image1 = loadImage("assets/images/trump.png");
imagedoge = loadImage("assets/images/doge.png");

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


  textSize(20);
  textAlign(CENTER);

}



// add a function to generate random numbers
function RandomN(low,high) {
	return Math.floor(Math.random()*(high-low+1)+low);
}


// Change the circle and square's positions so they move
// Draw the circle and square on screen
function draw() {

  // add background to get rid of some moving effect
  background(246, 255, 176,100);

  // display the random image

  randamRectX= RandomN(0,600);
  randamRectY= RandomN(0,600);
  image(image1,randamRectX,randamRectY);


  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,120);

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


   // display the doge image,move it from left to the right

   imageX += 0.5;
   image(imagedoge,imageX,imageY);

//add a text always following your mouse
   fill(0,0,255,100);
  text(thetext,mouseX,mouseY);


}
