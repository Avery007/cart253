// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
let wolf;
// The three prey
let antelope;
let zebra;
let bee;

let player1Info;
let player2Info;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40,1);
  wolf = new Predator(200, 200, 5, color(150, 200, 0), 40,2);
  //antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  //bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);
instruction();
  // Handle input for the tiger
  tiger.handleInput();
  wolf.handleInput();

  // Move all the "animals"
  tiger.move();
  wolf.move();
//  antelope.move();
  zebra.move();
//  bee.move();

  // Handle the tiger eating any of the prey
//  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  //tiger.handleEating(bee);

  //wolf.handleEating(antelope);
  wolf.handleEating(zebra);
  //wolf.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  wolf.display();
  //antelope.display();
  zebra.display();
  //bee.display();
}
function instruction(){
  player1Info=tiger.eat;
  player2Info=wolf.eat;
  textSize(20);
  fill(255);
  text(player1Info,300,100);
  text(player2Info,300,200);

}
