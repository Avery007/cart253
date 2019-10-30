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
let finalBossImg;

// add background musci
let backMusic;
let bossMusic;
let clSound;

let gameState = 0; // tracking game state
let numVoter = 10; // How many Prey to simulate
let voter = [];

let numCheerleader = 5; // How many Prey to simulate
let cheerleader = [];
let cheerleader1 = [];
let winner;


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
  finalBossImg = loadImage('./assets/images/boss.png');
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

    let otherCheerleader = new Cheerleader(cheerleader1X, cheerleader1Y,100,cl1Image, 78);
    // Add the new Prey object to the END of our array using push()
    cheerleader1.push(otherCheerleader);

  }

  boss1=new HiddenBoss(0,"boss1",bossImg,77);
  boss2=new HiddenBoss(0,"boss2",bossImg,90);
  donkey = new Candidate(100, 100, 5, 40, 1, donkeyImg); // source pixably
  elephant = new Candidate(200, 200, 5, 40, 2, elephantImg); // source pixably
  elites = new Elites(100, 100, 20, eliteImage, 10);

}


// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


  if (gameState=== 0) { // before game starts, display the front image

    image(front, 0, 0, width, height);
  }
  // when game starts
  else if (gameState === 1) {
    imageMode(CORNER);
  image(background, 0, 0, windowWidth, windowHeight);

    for (let i = 0; i < voter.length; i++) {
  // And for each one, move it and display it
  voter[i].move();
  voter[i].display();

  voter[i].mesmerizing(random(3,10),88,78,cheerleader[1].sober,cheerleader1[1].sober);// reduce prey's speed when cheerleader is active

  donkey.gainVote(voter[i]);
  elephant.gainVote(voter[i]);
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
  // show player's information
    gameOver(); //check if game over and display text when it is true
    // Handle input for the tiger
    donkey.handleInput();
    elephant.handleInput();

    // Move all the "animals"
    donkey.move();
    elephant.move();
    elites.move();

  elites.handleVote(elephant);
  elites.handleVote(donkey);
  console.log(donkey.isFailed);
  elites.elitesPowerUpdate();

    // tracking if predators are dead
    donkey.checkState();
    elephant.checkState();


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
  instruction();
    donkey.bossConnect(boss1.bossEat,boss1.bossManipulation);
    elephant.bossConnect(boss2.bossEat,boss2.bossManipulation);

    //boss.bonus(health,eat);



}
else if(gameState===2){
  setupEnd();

   console.log(gameState);

}
}

function instruction() {
  // show how many preys players eat
  player1Info = "Donkey's votes: " + donkey.vote + " bonus：" + donkey.bonus + "  total:" + donkey.result;
  player2Info = "Elephant's votes: " + elephant.vote + " bonus：" + elephant.bonus+ " total:" + elephant.result;
  textSize(20);
  fill(195, 181, 255,255);
  text(player1Info, windowWidth / 2, 70);
  text(player2Info, windowWidth / 2, 100);
  //text(boss1.bossEat, windowWidth / 2, 120);
  //text(boss2.bossEat, windowWidth / 2, 140);


}

/// set gameOver condition
function gameOver() {
  if (donkey.isFailed && elephant.isFailed) { // check if both of the predators are dead,if so, game over
    gameState = 2; // change game state , game over
}
  else if(donkey.result>450  || elephant.result>450){ // the one who firstly reaches 450 wins!
  gameState=2;

  }
  //  text("Game over ! now you know who is the winner more !", windowWidth / 2, 150); // display when game over

}

// get who is the the winner and display it then
function getWinner(){
  if(donkey.result>elephant.result)
  { winner="Donkey !";}
  else{winner="Elephant";}
  console.log(donkey.result);

  return winner;
  }

  function setupEnd (){
    noStroke();
    fill(255, 253, 181,3);
    rect(width/2,200,width/1.5,height/1.5);
    imageMode(CENTER);
    image(finalBossImg,width/2,200,width/3,height/3)
    fill(random(120,255), random(126,200), 252);
    textSize(40);
    textAlign(CENTER,CENTER);
    text("Game over! the winner is "+ getWinner(),width/2,height/2);


  }

function mousePressed() {
  if (gameState === 0) {
    gameState = 1; // start the game when mouse is clicked
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
