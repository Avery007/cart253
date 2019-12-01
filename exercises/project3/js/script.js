





// display information
let player1Info;

let killer;
// display players and background by image
let catharImg; // player image
let arrowImg;
let killerImage; // attacker
let background; // background img
let front; // front image


// add background musci
let backMusic;



let gameState = 0; // tracking game state


let arrow = [];



// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload() {
  // load umages used in this game
  catharImg = loadImage('./images/cathari.png'); // player
  killerImg = loadImage('./images/killer.png'); // killer
  background = loadImage('./images/casle.jpg'); // backgorund when game is active




}

// function set up
function setup() {
  createCanvas(windowWidth, windowHeight);

      imageMode(CENTER);

      killer = new Killer(50,5, killerImg); //"bossDonkey",


}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


    image(background, width/2, height/2, windowWidth, windowHeight); // display background

    killer.normalMove();
    killer.display();
    killer.chaseCheck();


  }
