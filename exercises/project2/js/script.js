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
}

// function set up
function setup() {
  createCanvas(windowWidth, windowHeight);
  //boss=new HiddenBoss(70,100,"boss1",bossImg);
//  boss=new HiddenBoss(200,50,"boss1",bossImg);
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
  else if (result === 1) {
    imageMode(CORNER);
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
