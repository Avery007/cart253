// Presidential Election Simulation
// by Qingyi Deng
//
// two players play as candidates ：elephant and donkey with different key controls,
//and elipse represents votes with random movement, using array to create many votes
//to win the game players need to get 450 votes in totall or have more votes than the opposite.
//The candidates have changeable power which is correspoinding to the number of votes gained, and their movement
// Candidates exit the game when their power reduced to zero
//
//there is a Elites class whose instances move faster than the normal votes, and players can increase their max size(power) by getting elites
// the power of elites recude each time player get them and when it turns zero there will be no elites showing up
// how many elites players can get determines the winner!

//The cheerleader is used to "confuse voters" that is, to reduce votes' speed so players can get them easily,
//but the effect is reducing each time when the cheerleaders moving to the edge of screen.
//Using array to display many cheerleaders
//
// the Boss is similar to cheating, players can call the boss to get votes quickly, but players' power also reduce rapidly when boss is active



// Our candidates
let donkey;
let elephant;

let boss; // the hidden boss used to cheat



// display how many votes
let player1Info;
let player2Info;

// display players and background by image
let donkeyImg; //donkey image
let elephantImg; // elephantimage
let eliteImage; // triangle image represents elites
let background; // background img
let front; // front image
let bossImg; // boss image
let winnerImage; // display winner image at the end of the game

// add background musci
let backMusic;
let bossMusic;
let clSound;
let voteSound;
let elitesSound;

let gameState = 0; // tracking game state

let numVoter = 10; // How many votes to simulate
let voter = [];

let numCheerleader = 5; // How many cheerleader to simulate
// different cheerleader team for both players
let cheerleader1 = [];
let cheerleader = [];

let numElites=3;
let elites=[];

let winner; //display winner


// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

function preload() {
  // load umages used in this game
  donkeyImg = loadImage('./assets/images/donkey1.png'); // donkey
  elephantImg = loadImage('./assets/images/elephant0.png'); // elephant
  background = loadImage('./assets/images/chess0.jpg'); // backgorund when game is active
  front = loadImage('./assets/images/p2front.png'); // starting scrren
  bossImg = loadImage('./assets/images/boss.png'); //boss image
  eliteImage = loadImage('./assets/images/superElite.png'); // triangle
  clImage = loadImage('./assets/images/cheerleader.png'); // cheerleader team  elepant
  cl1Image = loadImage('./assets/images/cheerleader1.png'); // cheerleader team  donkey
  // load music
  backMusic = loadSound('./assets/sounds/musicback.wav'); // backgorund music
  bossMusic = loadSound('./assets/sounds/bossmusic.wav'); // sound when boss is called
  clSound = loadSound('./assets/sounds/clSound0.wav'); // sound when Cheerleader is active
  voteSound=loadSound('./assets/sounds/vote.wav');// sound when get votes
  elitesSound=loadSound('./assets/sounds/elites.wav');// sound when get elites
}

// function set up
function setup() {
  createCanvas(windowWidth, windowHeight);


 // Run a for loop numVote times to generate each voteand put it in the array
  for (let i = 0; i < numVoter; i++) {
    // Generate (mostly) random values for the arguments of the Voter constructor
    let voterX = random(0, 500);
    let voterY = random(0, 500);
    let voterSpeed = random(7, 15); // set vote move speed
    let voterColor = color(38, 18, 255); // set color
    let voterRadius = random(3, 30); // set size
    // Create a new Prey objects with the random values
    let newVoter = new Voter(voterX, voterY, voterSpeed, voterColor, voterRadius);
    // Add the new vote object to the END of our array using push()
    voter.push(newVoter);
  }

  for (let n = 0; n < numCheerleader; n++) {
    // Generate (mostly) random values for the arguments of the cheerleader constructor
    let cheerleaderX = 100 + n * 100;
    let cheerleaderY = 50 + n * 50;

    let newCheerleader = new Cheerleader(cheerleaderX, cheerleaderY, 100, clImage, 88);
    // Add the new cheerleader object to the END of our array using push()
    cheerleader.push(newCheerleader);

  }

  for (let m = 0; m < numCheerleader; m++) {
    // Generate (mostly) random values for the arguments of the cheerleader constructor
    let cheerleader1X = width - m * 100;
    let cheerleader1Y = m * 50;

    let otherCheerleader = new Cheerleader(cheerleader1X, cheerleader1Y, 100, cl1Image, 78);
    // Add the new cheerleader object to the END of our array using push()
    cheerleader1.push(otherCheerleader);

  }

// set elites
  for(let k=0;k<numElites;k++) {
    let powerMax=floor(random(30,50)); // random max power
    let visibility=100-powerMax; // more power more invisible
    let speed=powerMax/2; // more power run faster
    let elite = new Elites(powerMax, visibility, speed, eliteImage);

    elites.push(elite);

}

  // creat two instances of boss class for two candidates
  boss1 = new HiddenBoss(0,  bossImg, 77); //"bossDonkey",
  boss2 = new HiddenBoss(0, bossImg, 90);
  // creat two candidates
  donkey = new Candidate(width - 200, 200, 5, 50, donkeyImg,UP_ARROW,DOWN_ARROW,LEFT_ARROW,RIGHT_ARROW,13); // ENTER key to speed up
  elephant = new Candidate(200, 200, 5, 50, elephantImg,87,83,65,68,SHIFT); //  WSAD to move
  //  create elites


}


// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


  if (gameState === 0) { // display starting screen

    image(front, 0, 0, width, height);
  }
  // when game starts
  else if (gameState === 1) {
    imageMode(CORNER);
    image(background, 0, 0, windowWidth, windowHeight); // display background

    // display fuctions
    donkey.handleInput(); // key control for donkey
    elephant.handleInput(); // key control for elephant

    donkey.move(); // movement of donkey
    elephant.move(); // movement of elephant
    // movement of elites

    donkey.display(); // display donkey
    elephant.display(); // display elephant

// for donkey and elephant to call boss, and change votes
    donkey.bossConnect(boss1.bossEat, boss1.bossManipulation);
    elephant.bossConnect(boss2.bossEat, boss2.bossManipulation);

    // tracking if candidates failed
    donkey.checkState();
    elephant.checkState();
    // check elites power and update


    boss1.keyControl(); // boss key control
    boss1.display(); // display
    boss1.bossPower(); // boss power
    boss2.keyControl();
    boss2.display();
    boss2.bossPower();

  // sounds effects
  //music when boss is called
    boss1.bossMusic(bossMusic);

   // pause music when no key is pressed
    boss2.bossMusic(bossMusic);
    if(boss1.bossManipulation===false&&boss2.bossManipulation===false){
    bossMusic.pause();

    }

    cheerleader[1].musicPlay(clSound);
    cheerleader1[1].musicPlay(clSound);

// pause music when no key is pressed
    if(cheerleader[1].activeState===false && cheerleader1[1].activeState===false){
    clSound.pause();

    }



    instruction(); // show instruction
    gameOver(); //check if game over and display text when it is true


    for (let i = 0; i < voter.length; i++) {
      // display votes
      // And for each one, move it and display it
      voter[i].move();
      voter[i].display();
      // reduce votes'speed when cheerleader is called
      voter[i].mesmerizing(random(3, 10), 88, 78, cheerleader[1].sober, cheerleader1[1].sober);
      // reduce prey's speed when cheerleader is active

      donkey.gainVote(voter[i],voteSound); // increase votes for donkey
      elephant.gainVote(voter[i],voteSound); // increase votes for elephant
      boss1.bossGain(voter[i]); // for donkey,use boss to increase votes
      boss2.bossGain(voter[i]); // for elephant, use boss to increase votes


    }

    // display cheerleader for donkey
    for (let n = 0; n < cheerleader.length; n++) {
      // And for each one, move it and display it

      cheerleader[n].display();
      cheerleader[n].keyControl();
      cheerleader[n].move(1.5);// set cheerleader movemnet on X


    }


    // display cheerleader for elephant
    for (let m = 0; m < cheerleader.length; m++) {
      // And for each one, move it and display it

      cheerleader1[m].display();
      cheerleader1[m].keyControl();
      cheerleader1[m].move(-1.5);// set cheerleader movemnet on X


    }


// display elites
    for(let k=0;k<elites.length;k++){

       elites[k].display();
       elites[k].move();
       elites[k].elitesPowerUpdate();// changeable power
       elites[k].handleVote(elephant,elitesSound);// when elephant gets elites
       elites[k].handleVote(donkey,elitesSound);// when donkey gets elites
       elites[k].checkElites(); // check if the elites is active
       boss1.bossGain(elites[k]);// boss to get elites as vote
       boss2.bossGain(elites[k]);// // boss to get elites as vote

    }


  }

  // set up display when games end
  else if (gameState === 2) {

    getWinner();
    setupEnd();
  instruction();
  }
}
// function to show instruction
function instruction() {
  // show how many votes player get
  player1Info = "Donkey's votes: " + donkey.vote + " bonus：" + donkey.bonus + "  total:" + donkey.result;
  player2Info = "Elephant's votes: " + elephant.vote + " bonus：" + elephant.bonus + " total:" + elephant.result;
  textSize(20);
  fill(195, 181, 255, 255);
  text("Get 450 votes or beat your rival to win!", windowWidth / 2, 40);
  text(player1Info, windowWidth / 2, 70); // display donkey information
  text(player2Info, windowWidth / 2, 100); // display elephant information

}

/// set gameOver condition
function gameOver() {
  if (donkey.isFailed && elephant.isFailed) { // check if both of the candidates fail,if so, game over
    gameState = 2; // change game state , game over
  } else if (donkey.result > 450 || elephant.result > 450) { // the one who firstly reaches 450 wins!
    gameState = 2;

  }


}

// get who is the the winner and display it then
function getWinner() {
  if (donkey.result > elephant.result) {
    winner = "Donkey !";
    winnerImage=donkeyImg;
  } else {
    winner = "Elephant";
    winnerImage=elephantImg;
  }

  return winner; // return value
}



// function to display ending screen
function setupEnd() {
  noStroke();
  fill(255, 253, 181);// pale yellow
  rect(width / 2, 250, width / 1.2, height / 1.2); // background
  imageMode(CENTER);
  image(bossImg, width / 2, 250, width / 3, height / 3);// boos face image
  image(winnerImage,random(width/3.5,width/1.2),height/2,200,200); ///display winner's image and make it move
  fill(random(120, 255), random(126, 200), 252);// random color
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Game over! the winner is " + getWinner(), width / 2, height / 2); // show winner



}

// function when mouse is pressed
function mousePressed() {
  if (gameState === 0) {
    gameState = 1; // start the game when mouse is clicked
    backMusic.setVolume(0.5);
    backMusic.loop(); // play music when game starts
  }

}
