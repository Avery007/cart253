





// display information
let player1Info;

let killer=[];
let cathari;
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



      cathari = new Cathari(width - 200, 200, 5, 50, catharImg, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 13);

      for (let i = 0; i < 5; i++) {
        // Generate (mostly) random values for the arguments of the Voter constructor

        let killerSpeed = random(1, 6); // set vote move speed
        let killerRadius = random(30, 60); // set size
        // Create a new Prey objects with the random values
        let newKiller = new Killer(killerRadius, killerSpeed,killerImg);
        // Add the new vote object to the END of our array using push()
        killer.push(newKiller);
      }

}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


    image(background, width/2, height/2, windowWidth, windowHeight); // display background

    for (let n = 0; n < killer.length; n++) {

      killer[n].normalMove();
      killer[n].display();
      killer[n].chaseCheck();
      killer[n].chaseCheck(floor(cathari.x),floor(cathari.y));
      killer[n].chase(cathari.x,cathari.y);

    }
      // display votes

    cathari.handleInput();
    cathari.display();
    cathari.move();

  

  }
