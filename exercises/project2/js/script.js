// Predator-Prey Simulation
// by Qingyi Deng
//
// two players play as predators：eagle and tiger, with different key controls
//and three prey (of different sizes and speeds)
// The predator should chase the prey and consumes them.
// The predator loses health over time, so must keep eating to survive.
// The winter is the one who eat most preys

// Our predator
let donkey;
let elephant;

let boss;
// The three prey
let elites;


// display how many preys eaten
let player1Info;
let player2Info;

// display players and background by image
let donkeyImg; //tiger image
let elephantImg; // eagle image
let eliteImage;
let background; // background img
let front; // front image
let bossImg;

// add background musci
let backMusic;
let bossMusic;
let clSound;

let result = 0; // tracking game state
let numVoter = 10; // How many Prey to simulate
let voter = [];

let numCheerleader = 5; // How many Prey to simulate
let cheerleader= [];
let cheerleader1= [];


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload() {

  donkeyImg = loadImage('./assets/images/donkey1.png');
  elephantImg = loadImage('./assets/images/elephant0.png');
  background = loadImage('./assets/images/chess0.jpg');
  front = loadImage('./assets/images/p2front.png');
  backMusic = loadSound('./assets/sounds/music.wav');
  bossMusic = loadSound('./assets/sounds/bossSound.wav');
  clSound =loadSound('./assets/sounds/clSound.wav');
  bossImg = loadImage('./assets/images/boss1.png');
  clImage=loadImage('./assets/images/cheerleader.png');
  cl1Image=loadImage('./assets/images/cheerleader1.png');
  eliteImage=loadImage('./assets/images/superElite.png');
}

// function set up
function setup() {
  createCanvas(windowWidth, windowHeight);


// An empty array to store them in (we'll create them in setup())

  // Run a for loop numPrey times to generate each Prey and put it in the array
  for (let i = 0; i < numVoter; i++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let voterX = random(0, 500);
    let voterY = random(0, 500);
    let voterSpeed = random(7, 15);
    let voterColor = color(100, 100, 100);
    let voterRadius = random(3, 30);
    // Create a new Prey objects with the random values
    let newVoter = new Voter(voterX, voterY, voterSpeed, voterColor, voterRadius);
    // Add the new Prey object to the END of our array using push()
    voter.push(newVoter);
  }

  for (let n = 0; n < numCheerleader; n++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let cheerleaderX =100+n*100;
    let cheerleaderY =50+n*50;
    let attraction=100;


    //let  clOpacity = color(0, 100, 100);
    //let cheerleaderSize = random(50, 200);
    // Create a new Prey objects with the random values
    let newCheerleader = new Cheerleader(cheerleaderX, cheerleaderY,attraction,clImage, 88);
    // Add the new Prey object to the END of our array using push()
    cheerleader.push(newCheerleader);

  }

  for (let m = 0; m< numCheerleader; m++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let cheerleader1X =1000-m*100;
    let cheerleader1Y =m*50;


    //let attraction=100;
    //let  clOpacity = color(0, 100, 100);
    //let cheerleaderSize = random(50, 200);
    // Create a new Prey objects with the random values
    let otherCheerleader = new Cheerleader(cheerleader1X, cheerleader1Y,100,cl1Image, 78);
    // Add the new Prey object to the END of our array using push()
    cheerleader1.push(otherCheerleader);

  }

  boss1=new HiddenBoss(0,"boss1",bossImg,77);
  boss2=new HiddenBoss(0,"boss2",bossImg,90);
  donkey = new Candidate(100, 100, 5, 40, 1, donkeyImg); // source pixably
  elephant = new Candidate(200, 200, 5, 40, 2, elephantImg); // source pixably
  elites = new Elites(100, 100, 20, eliteImage, 10);
  //superElite= new Voter(100, 100, 30, color(255, 255, 255), 25, "zebra");
   //= new Voter(100, 100, 20, color(255, 255, 0), 10, "rabbit");
  //health=tiger.health;
//  eat=tiger.eat;

}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


  if (result === 0) { // before game starts, display the front image

    image(front, 0, 0, width, height);
  }
  // when game starts
  else if (result === 1) {imageMode(CORNER);
  image(background, 0, 0, windowWidth, windowHeight);

    for (let i = 0; i < voter.length; i++) {
  // And for each one, move it and display it
  voter[i].move();
  voter[i].display();

  voter[i].mesmerizing(random(3,10),88,78,cheerleader[1].sober,cheerleader1[1].sober);// reduce prey's speed when cheerleader is active
  console.log(cheerleader[1].sober);
  console.log(cheerleader1[1].sober);
  //console.log(prey[1].speed);
  donkey.handleEating(voter[i]);
  elephant.handleEating(voter[i]);
  boss1.bossGain(voter[i]);
  boss2.bossGain(voter[i]);
  donkey.handleEating(voter[i]);
  elephant.handleEating(voter[i]);
  boss1.bossGain(voter[i]);
  boss2.bossGain(voter[i]);
}


  for (let n = 0; n< cheerleader.length; n++) {
  // And for each one, move it and display it
  //cheerleader[i].move();

  cheerleader[n].display();
  cheerleader[n].keyControl();
  cheerleader[n].move(3);


}
for (let m = 0; m< cheerleader.length; m++) {
// And for each one, move it and display it


cheerleader1[m].display();
cheerleader1[m].keyControl();
cheerleader1[m].move(-3);






}


     // display background
    instruction(); // show player's information
    gameOver(); //check if game over and display text when it is true
    // Handle input for the tiger
    donkey.handleInput();
    elephant.handleInput();

    // Move all the "animals"
    donkey.move();
    elephant.move();
    elites.move();


    // tracking if predators are dead
    donkey.checkState();
    elephant.checkState();

  //  Handle the tiger eating any of the prey
  //  donkey.handleEating(elite);
    //donkey.handleEating(zebra);
    //donkey.handleEating(rabbit);

    //elephant.handleEating(antelope);
    //elephant.handleEating(zebra);
    //elephant.handleEating(rabbit);

    //boss1.bossGain(antelope);
      //boss1.bossGain(zebra);
  //boss1.bossGain(elite);

  //boss2.bossGain(elites);
  //  boss2.bossGain(zebra);
//boss2.bossGain(rabbit);
    // Display all the "animals"
    donkey.display();
    elephant.display();
  //  antelope.display();
    //zebra.display();
    elites.display();
  //boss.blackBoxState=tiger.isCalled;
    boss1.keyControl();
    boss1.display();
    boss1.bossPower();
    boss2.keyControl();
    boss2.display();
    boss2.bossPower();
    boss1.bossMusic(bossMusic);
    boss2.bossMusic(bossMusic);
    cheerleader[1].musicPlay(clSound);
    cheerleader1[1].musicPlay(clSound);

    donkey.bossConnect(boss1.bossEat,boss1.bossManipulation);
    elephant.bossConnect(boss2.bossEat,boss2.bossManipulation);

    //boss.bonus(health,eat);



}

}

function instruction() {
  // show how many preys players eat
  player1Info = "Donkey's votes: " + donkey.vote + " bonus：" + donkey.bonus;
  player2Info = "Elephant's votes: " + elephant.vote + " bonus：" + elephant.bonus;
  textSize(20);
  fill(255);
  text(player1Info, windowWidth / 2, 70);
  text(player2Info, windowWidth / 2, 100);
  text(boss1.bossEat, windowWidth / 2, 120);
  text(boss2.bossEat, windowWidth / 2, 140);


}

function gameOver() {
  if (donkey.isFailed && elephant.isFailed) { // check if both of the predators are dead,if so, game over
    result === 2; // change game state , game over
    text("Game over ! now you know who is the winner more !", windowWidth / 2, 150); // display when game over
  }
}



function mousePressed() {
  if (result === 0) {
    result = 1; // start the game when mouse is clicked
    backMusic.setVolume(0.5);
    backMusic.loop(); // play music when game starts
    //backMusic.volume(0);
  }
}
//function compare(){
 //if (elephant.result>donkey.result){
   //let winner ="elephant";
 //}

//}
