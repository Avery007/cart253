// Predator-Prey Simulation
// by Qingyi Deng
//
// two players player as predators-eagle and tiger, with different key controls
//and three prey (of different sizes and speeds)
// The predator should chase the prey and consumes them.
// The predator loses health over time, so must keep eating to survive.
// The winter is the one who eat most preys

// Our predator
let tiger;
let eagle;
// The three prey
let antelope;
let zebra;
let bee;

// display how many preys eaten
let player1Info;
let player2Info;

// display players and background by image
let tigerImg; //tiger image
let eagleImg; // eagle image
let background; // background img
let front; // front image

// add background musci
let backMusic;

let result = 0; // tracking game state

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload() {

  tigerImg = loadImage('./assets/images/tiger.png');
  eagleImg = loadImage('./assets/images/eagle.png');
  background = loadImage('./assets/images/forest.jpg');
  front = loadImage('./assets/images/front.png');
  backMusic = loadSound('./assets/sounds/music.wav');
}

// function set up
function setup() {
  createCanvas(windowWidth, windowHeight);

  tiger = new Predator(100, 100, 5, 40, 1, tigerImg); // source pixably
  eagle = new Predator(200, 200, 5, 40, 2, eagleImg); // source pixably
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50, "antelope");
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60, "zabra");
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10, "bee");
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (result === 0) { // before game starts, display the front image

    image(front, 0, 0, width, height);
  }
  // when game starts
  else if (result === 1) {
    image(background, 0, 0, windowWidth, windowHeight); // display background
    instruction(); // show player's information
    gameOver(); //check if game over and display text when it is true
    // Handle input for the tiger
    tiger.handleInput();
    eagle.handleInput();

    // Move all the "animals"
    tiger.move();
    eagle.move();
    antelope.move();
    zebra.move();
    bee.move();

    // tracking if predators are dead
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

function instruction() {
  // show how many preys players eat
  player1Info = "tiger eats:" + tiger.eat;
  player2Info = "eagle eats:" + eagle.eat;
  textSize(20);
  fill(255);
  text(player1Info, windowWidth / 2, 70);
  text(player2Info, windowWidth / 2, 100);

}

function gameOver() {
  if (tiger.isDead && eagle.isDead) { // check if both of the predators are dead,if so, game over
    result === 2; // change game state , game over
    text("Game over ! now you know who ate more !", windowWidth / 2, 150); // display when game over
  }
}

function mousePressed() {
  if (result === 0) {
    result = 1; // start the game when mouse is clicked
    backMusic.loop(); // play music when game starts
  }
}
