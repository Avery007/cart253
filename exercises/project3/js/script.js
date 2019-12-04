





// display information
let player1Info;

let killer=[];
let cathari;
let scrolls=[];
let ball;
let scrollImg;

// display players and background by image
let catharImg; // player image
let arrowImg;
let killerImage; // attacker
let ballImage;
let mantraImg;
let background; // background img
let front; // front image

let killerNumber;
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
  ballImage = loadImage('./images/ball.png');
  mantraImg = loadImage('./images/specialPower.png');



}

// function set up

function setupKiller(){

  killerNumber=3+floor(cathari.getCount/3);
   for (let i = 0; i < killerNumber; i++) {

     // Generate (mostly) random values for the arguments of the Voter constructor

     let killerSpeed = random(1, 6); // set vote move speed
     let killerRadius = random(30, 60); // set size
     // Create a new Prey objects with the random values
     let newKiller = new Killer(killerRadius, killerSpeed,killerImg);
     // Add the new vote object to the END of our array using push()
     killer.push(newKiller);
   }



}
function makeNewKiller(){
  //console.log(killerNumber);
  //

   //for (let i = killer.length; i <killer.length+killerNumber; i++) {

     // Generate (mostly) random values for the arguments of the Voter constructor

     let killerSpeed = random(1, 6); // set vote move speed
     let killerRadius = random(30, 60); // set size
     // Create a new Prey objects with the random values
     let newKiller = new Killer(killerRadius, killerSpeed,killerImg);
     // Add the new vote object to the END of our array using push()
     killer.push(newKiller);
  // }



}




function setup() {
  createCanvas(windowWidth, windowHeight);

      imageMode(CENTER);



      cathari = new Cathari(width - 200, 200, 10, 30, catharImg, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 13);
      ball=new Magicball(cathari.x,cathari.y,10,ballImage,87, 83, 65, 68); //wsad movement
      powerfulMantra=new Scrolls(random(0,width),random(0,height),10,50,2,mantraImg);


      setupKiller();

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
    fill(255);
    textSize(25);
    text("You have saved " + cathari.getCount,100,100 );

    for (let n = 0; n < killer.length; n++) {

      killer[n].normalMove();
      killer[n].display();
      killer[n].chaseCheck();
      killer[n].chaseCheck(floor(cathari.x),floor(cathari.y));
      killer[n].chase(cathari.x,cathari.y);
      killer[n].killCathari(cathari);
      ball.killercollision(killer[n],cathari.x,cathari.y);



    }

      // display votes
      for (let a = 0; a< scrolls.length; a++) {

        scrolls[a].move();
        scrolls[a].display();
        scrolls[a].appearChange();

        cathari.getScrolls(scrolls[a]);

      }


        // display votes
    cathari.handleInput();
    cathari.display();
    cathari.move();
    cathari.exit();

    powerfulMantra.display();
    powerfulMantra.move();
    powerfulMantra.mantraCollision(cathari,ball);
    ball.handleInput(cathari.x,cathari.y);



  }
