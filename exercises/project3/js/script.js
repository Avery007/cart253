





// display information
let player1Info;

let killer=[];
let cathari;
let scrolls=[];
let scrollImg;

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
  scrollImg = loadImage('./images/book.png');



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

      for (let m = 0; m< 5; m++) {
        // Generate (mostly) random values for the arguments of the Voter constructor
        let bookX = random(0, width);
        let bookY = random(0, height);
        let bookSpeed = random(4, 10); // set vote move speed
        let bookRadius = random(30, 60); // set size
        let reduceVisible=random(0.5, 3);
        // Create a new Prey objects with the random values
        let newBook= new Scrolls(bookX,bookY, bookSpeed,bookRadius,reduceVisible,scrollImg);
        // Add the new vote object to the END of our array using push()
        scrolls.push(newBook);
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
      for (let a = 0; a< scrolls.length; a++) {

        scrolls[a].move();
        scrolls[a].display();
        scrolls[a].appearChange();

      }

      console.log(scrolls[1].visibility);
        // display votes
    cathari.handleInput();
    cathari.display();
    cathari.move();



  }
