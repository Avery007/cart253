// Predator-Prey Simulation
// by Qingyi Deng
//
// two players play as predators：eagle and tiger, with different key controls
//and three prey (of different sizes and speeds)
// The predator should chase the prey and consumes them.
// The predator loses health over time, so must keep eating to survive.
// The winter is the one who eat most preys

// Our predator
let tiger;
let eagle;

let boss;
// The three prey
let antelope;
let zebra;
let rabbit;

// display how many preys eaten
let player1Info;
let player2Info;

// display players and background by image
let tigerImg; //tiger image
let eagleImg; // eagle image
let background; // background img
let front; // front image
let bossImg;

// add background musci
let backMusic;

let result = 0; // tracking game state
let numPrey = 10; // How many Prey to simulate
let prey = [];

let numCheerleader = 5; // How many Prey to simulate
let cheerleader= [];
let cheerleader1= [];


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
  bossImg = loadImage('./assets/images/boss1.png');
  clImage=loadImage('./assets/images/cheerleader.png');
cl1Image=loadImage('./assets/images/cheerleader1.png');
}

// function set up
function setup() {
  createCanvas(windowWidth, windowHeight);

// An empty array to store them in (we'll create them in setup())

  // Run a for loop numPrey times to generate each Prey and put it in the array
  for (let i = 0; i < numPrey; i++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let preyX = random(0, 500);
    let preyY = random(0, 500);
    let preySpeed = random(2, 10);
    let preyColor = color(0, 100, 100);
    let preyRadius = random(3, 50);
    // Create a new Prey objects with the random values
    let newPrey = new Prey(preyX, preyY, preySpeed, preyColor, preyRadius);
    // Add the new Prey object to the END of our array using push()
    prey.push(newPrey);
  }

  for (let n = 0; n < numCheerleader; n++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let cheerleaderX =100+n*100;
    let cheerleaderY =50+n*50;
    let attraction=100;
    let moveX=1;

    //let  clOpacity = color(0, 100, 100);
    //let cheerleaderSize = random(50, 200);
    // Create a new Prey objects with the random values
    let newCheerleader = new Cheerleader(cheerleaderX, cheerleaderY,attraction,clImage, 90);
    // Add the new Prey object to the END of our array using push()
    cheerleader.push(newCheerleader);

  }

  for (let m = 0; m< numCheerleader; m++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let cheerleader1X =1000-m*100;
    let cheerleader1Y =m*50;
    let moveX=-1

    //let attraction=100;
    //let  clOpacity = color(0, 100, 100);
    //let cheerleaderSize = random(50, 200);
    // Create a new Prey objects with the random values
    let otherCheerleader = new Cheerleader(cheerleader1X, cheerleader1Y,100,cl1Image, 78);
    // Add the new Prey object to the END of our array using push()
    cheerleader1.push(otherCheerleader);

  }

  boss1=new HiddenBoss(0,"boss1",bossImg,1);
  boss2=new HiddenBoss(0,"boss2",bossImg,2);
  tiger = new Predator(100, 100, 5, 40, 1, tigerImg); // source pixably
  eagle = new Predator(200, 200, 5, 40, 2, eagleImg); // source pixably
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 20, "antelope");
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 25, "zebra");
  rabbit = new Prey(100, 100, 20, color(255, 255, 0), 10, "rabbit");
  health=tiger.health;
  eat=tiger.eat;

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

    for (let i = 0; i < prey.length; i++) {
  // And for each one, move it and display it
  prey[i].move();
  prey[i].display();
  tiger.handleEating(prey[i]);
  eagle.handleEating(prey[i]);
  boss1.bossGain(prey[i]);
  boss2.bossGain(prey[i]);
  tiger.handleEating(prey[i]);
  eagle.handleEating(prey[i]);
  boss1.bossGain(prey[i]);
  boss2.bossGain(prey[i]);
}


  for (let n = 0; n< cheerleader.length; n++) {
  // And for each one, move it and display it
  //cheerleader[i].move();

  cheerleader[n].display();
  cheerleader[n].keyControl();
  cheerleader[n].move(1);
  console.log(cheerleader[1].activeState);

}
for (let m = 0; m< cheerleader.length; m++) {
// And for each one, move it and display it
//cheerleader[i].move();

cheerleader1[m].display();
cheerleader1[m].keyControl();
cheerleader1[m].move(-1);
//console.log(cheerleader1[1].activeState);

}




     // display background
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
    rabbit.move();

    // tracking if predators are dead
    tiger.checkState();
    eagle.checkState();

  //  Handle the tiger eating any of the prey
    tiger.handleEating(antelope);
    tiger.handleEating(zebra);
    tiger.handleEating(rabbit);

    eagle.handleEating(antelope);
    eagle.handleEating(zebra);
    eagle.handleEating(rabbit);

    boss1.bossGain(antelope);
      boss1.bossGain(zebra);
  boss1.bossGain(rabbit);

  boss2.bossGain(antelope);
    boss2.bossGain(zebra);
boss2.bossGain(rabbit);
    // Display all the "animals"
    tiger.display();
    eagle.display();
    antelope.display();
    zebra.display();
    rabbit.display();
  //boss.blackBoxState=tiger.isCalled;
    boss1.keyControl();
    boss1.display();
    boss1.bossPower();
    boss2.keyControl();
    boss2.display();
    boss2.bossPower();

    tiger.bossConnect(boss1.bossEat,boss1.bossManipulation);
    eagle.bossConnect(boss2.bossEat,boss2.bossManipulation);
    console.log(tiger.health);
    //boss.bonus(health,eat);



}

}

function instruction() {
  // show how many preys players eat
  player1Info = "tiger eats: " + tiger.eat + " bonus：" + tiger.bonus;
  player2Info = "eagle eats: " + eagle.eat + " bonus：" + eagle.bonus;
  textSize(20);
  fill(255);
  text(player1Info, windowWidth / 2, 70);
  text(player2Info, windowWidth / 2, 100);
  text(boss1.bossEat, windowWidth / 2, 120);
  text(boss2.bossEat, windowWidth / 2, 140);


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
