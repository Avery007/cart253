// Exercise 0 - Spiritual Self-Portrait
// Pippin Barr
// 20 August 2018
//
// Uses p5's set of shape and colour functions to draw a head
// wearing a hat that Pippin claims is spiritually just like him.


// setup()
//
// Draws a beautiful face on the canvas and puts a hat on it!

function setup() {

  // Set up the canvas and give it a nice pink colour

  createCanvas(500,500);
  background(162, 166, 164);

  // Draw the head and body (or is it a chin?) in pink as well

  // No stroke because shapes look nicer without it I think
  noStroke();
  // Set the pale yellow face
  fill(251, 252, 157);
  // The ellipse mode will make it easier to align everything
  ellipseMode(CENTER);
  // Draw the head
  ellipse(250,250,180,230);
  // Draw the ears
  triangle(210,169,100,145,170,220);
  triangle(310,170,390,145,335,220);


  // Draw the googly eyes

  // Draw the backgrounds of the eyes

  fill(232, 234, 235);
  ellipse(200,225,50,30);
  ellipse(300,225,50,30);

  // Draw the blue pupils
  fill(0, 46, 230);
  ellipse(200,225,15,20);
  ellipse(300,225,15,20);

  // third eye
  fill(0, 46, 230);
  ellipse(250,160,15,20);


  // Nose colour
  fill(232, 234, 237);
    // Draw the nose
  ellipse(250,265,25,40);
  // The two nostril areas
  ellipse(241,275,15,20);
  ellipse(259,275,15,20);

  // Draw the mouth

  // mouth colour
  fill(216, 235, 226);

  triangle(225,310,245,335,285,300);

  stroke(0, 135, 245);

//beards
  line(120,250,180,270);
  line(130,260,175,275);
  line(125,280,180,280);


  line(370,250,325,265);
  line(367,260,320,270);
  line(375,280,335,277);


  

}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
