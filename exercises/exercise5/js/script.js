// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;
let eagle;
// The three prey
let antelope;
let zebra;
let bee;

let player1Info;
let player2Info;

let p1;
let p2;
let background;
let backMusic;

let result=0; // tracking game state

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload(){

    p1= loadImage('./assets/images/tiger.png');
    p2= loadImage('./assets/images/eagle.png');
    background=loadImage('./assets/images/forest.jpg');
    front=loadImage('./assets/images/front.png');
    backMusic=loadSound('./assets/sounds/music.wav');
}
function setup() {
  createCanvas(windowWidth, windowHeight);


  tiger = new Predator(100, 100, 5, 40,1,p1);

  eagle = new Predator(200, 200, 5, 40,2,p2);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50,"antelope");
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60,"zabra");
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10,"bee");
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if(result===0){

    image(front,0,0,width,height);
  }
  // Clear the background to black
 else if (result===1){
    image(background,0,0,windowWidth,windowHeight);
  instruction();
  gameOver();
  // Handle input for the tiger
  tiger.handleInput();
  eagle.handleInput();

  // Move all the "animals"
  tiger.move();
  eagle.move();
antelope.move();
  zebra.move();
bee.move();

tiger.checkState();
eagle.checkState();

  // Handle the tiger eating any of the prey
tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  eagle.handleEating(antelope);
  eagle.handleEating(zebra);
  eagle.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  eagle.display();
  antelope.display();
  zebra.display();
  bee.display();
}


}
function instruction(){

  player1Info="tiger eats:"+ tiger.eat;
  player2Info="eagle eats:"+ eagle.eat;
  textSize(20);
  fill(255);
  text(player1Info,windowWidth/2,70);
  text(player2Info, windowWidth/2,100);



 if (result===2){

  text("Game over ! now you know who ate more !", windowWidth/2,150);

}


}

function gameOver(){
  if(tiger.isDead&&eagle.isDead){
    result===2;
    text("Game over ! now you know who ate more !", windowWidth/2,150);
  }
}

function mousePressed() {
  if (result===0){
  result = 1; // start the game when mouse is clicked
  backMusic.loop();
 }
}
