// ------------
// This game is based on the history of Albigensian Crusade.
// it is a escaping game. Player has two goals: to get as many books as possible; and to escape from being captured
// this game uses existing codes in project 2 and exercise 2
// the game is bascially divided into 2 stage. in stage 1, player aims to get books while fighting against the army
// in stage 2, player needs to get 12 keys in order to escape successfully
// by Qingyi Deng





// display information



let killer = []; // represents the chasing solders
let cathari; // player
let scrolls = []; // books for players to get
let keys = []; // keys
let rotateTri = []; // barriers
let ball; // player's weapon to fight against the killers
let arrow;


// display image
let section2;
let scrollImg;
let catharImg; // player image
let arrowImg;
let killerImage; // attacker
let ballImage;
let mantraImg;
let coverImg;
let background; // background img
let frontImg; // front image
let instructionImg;
let catharsInfoImg;
let shieldImg;
let winImg;
let triImg;
let keyImg;
let gameOverImg;


let killerN; // original length of killer class
let gameState = 0; // tracking game state
let failReason; // display loss reasons
let bcWidth = 2500; // set the moving background

// music
let fightingSound;
let finalSound;
let beginSound;
let escapeSound;



function preload() {
  // load umages used in this game
  // images source: pixabay
  catharImg = loadImage('./images/cathari.png'); // player
  killerImg = loadImage('./images/killer.png'); // killer
  background = loadImage('./images/casle.jpg'); // http://blog.ceconlinebbs.com/BLOG_ARTICLE_231954.HTM
  scrollImg = loadImage('./images/book.png');
  ballImage = loadImage('./images/ball.png');
  mantraImg = loadImage('./images/specialPower.png');
  coverImg = loadImage('./images/front.jpg'); // before game starts
  instructionImg = loadImage('./images/instruct.jpg');// https://www.innervision.com/mysteries/media/languedoc/minerve.jpg
  catharsInfoImg = loadImage('./images/cathars0.jpg');
  keyImg = loadImage("./images/key.png");
  triImg = loadImage("./images/tri.png");
  arrowImg = loadImage("./images/arrow.png");
  section2 = loadImage("./images/bc.jpg"); // created by photoshop
  shieldImg = loadImage("./images/shield.png");
  gameOverImg = loadImage("./images/endtime.jpg");
  info = loadImage("./images/info.jpg"); // created by photoshophttps://en.wikipedia.org/wiki/Pope_Innocent_III#/media/File:Innozenz3.jpg
  winImg = loadImage("./images/final.png");
  // source : https://www.fesliyanstudios.com/royalty-free-music
  fightingSound = loadSound("./sounds/fightt.wav");
  beginSound = loadSound("./sounds/trouble.wav");
  escapeSound = loadSound("./sounds/esc.wav");
  finalSound = loadSound("./sounds/final.wav");
}

// function set up



function setup() {
  createCanvas(windowWidth, windowHeight);



  setupElements(); // creates basic objects
  setupArrays(); // creats array


}

function setupElements() {

  cathari = new Cathari(width - 100, height / 2, 10, 30, catharImg, 87, 83, 65, 68);
  ball = new Magicball(cathari.x, cathari.y, 10, ballImage, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, );
  powerfulMantra = new Scrolls(random(0, width), random(0, height), 10, 70, 2, mantraImg);
  arrow = new Arrows(5, arrowImg);


  section2Start = false; // reset value for restart


}


function setupArrays() {
  killerN = 3;

  for (let i = 0; i < killerN; i++) {

    // Generate (mostly) random values for the arguments

    let killerSpeed = random(1, 5); // set  speed
    let killerRadius = random(30, 60); // set size
    // Create a new killer object with the random values
    let newKiller = new Killer(killerRadius, killerSpeed, killerImg);
    // Add the new object to the END of our array using push()
    killer.push(newKiller);
    killer[i].chasing = false; // reset value for restart game
  }

  for (let m = 0; m < 5; m++) {
    // Generate (mostly) random values for the arguments of the scrolls constructor
    let bookX = random(0, width);
    let bookY = random(0, height);
    let bookSpeed = random(4, 10); // set vote move speed
    let bookRadius = random(30, 60); // set size
    let reduceVisible = random(0.5, 3);
    // Create a new objects with the random values
    let newBook = new Scrolls(bookX, bookY, bookSpeed, bookRadius, reduceVisible, scrollImg);
    // Add the new object to the END of our array using push()
    scrolls.push(newBook);
  }

  for (let r = 0; r < 25; r++) {
    // Generate (mostly) random values for the arguments of the rotateTri constructor
    let speed = random(2, 6);
    let size = random(20, 50);
    let rate = random(1000, 20000);
    // Create a new  objects with the random values
    let newRotateTri = new RotateTriangle(speed, size, rate, triImg);
    // Add the new object to the END of our array using push()
    rotateTri.push(newRotateTri);
  }
  for (let n = 0; n < 12; n++) {
    // Generate (mostly) random values for the arguments of the Keys constructor
    let speed = random(4, 12);
    let size = random(20, 50);
    // Create a new objects with the random values
    let newKey = new Key(size, speed, keyImg);

    // Add the new object to the END of our array using push()
    keys.push(newKey);
    keys[n].isGot = false; // reset value for restart game
  }
}

function makeNewKiller() { // increase the number of killers at a certain rate


  let killerSpeed = random(1, 6); // set killer speed
  let killerRadius = random(30, 60); // set size
  // Create a new killer
  let newKiller = new Killer(killerRadius, killerSpeed, killerImg);
  // Add the new object to the END of our array using push()
  killer.push(newKiller);

}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


  if (gameState === 0) { // cover image, before game starts
    imageMode(CENTER);
    image(coverImg, width / 2, height / 2, windowWidth, windowHeight);


  } else if (gameState === 3) { // first stage
    // play music
    if (!fightingSound.isPlaying() && !cathari.isFailed) {
      fightingSound.play();
    }


    // display background
    imageMode(CENTER);
    image(background, width / 2, height / 2, windowWidth, windowHeight);
    fill(255);
    textSize(25);
    text("To exit, move to the topleft corner and press ENTER ", 100, 70);
    text("You have saved " + cathari.getCount, 100, 100);

    // alow player to use the ball when it is active
    if (ball.isActive) {
      text("press arrow keys to use your magic ball!", 100, 120);
    }


    // display killer class
    for (let n = 0; n < killer.length; n++) {

      killer[n].normalMove(); // movement
      killer[n].display();
      // check if the killer should chase after player
      killer[n].chaseCheck(floor(cathari.x), floor(cathari.y));
      killer[n].chase(cathari.x, cathari.y); // if so, set movement
      // handle collision
      killer[n].killCathari(cathari); // killer-player collision
      ball.killercollision(killer[n], cathari, cathari.x, cathari.y); // killer -bal collision




    }

    // display scrolls
    for (let a = 0; a < scrolls.length; a++) {

      scrolls[a].move();
      scrolls[a].display();
      scrolls[a].appearChange(); // making scrolls gradually disappear

      cathari.getScrolls(scrolls[a]); // allow player to get scrolls

    }


    /// player's function
    cathari.handleInput(); // key controls
    cathari.display();
    cathari.move();
    cathari.exit(); // shift to stage 2

    // handle s special book
    powerfulMantra.display();
    powerfulMantra.move();
    powerfulMantra.mantraCollision(cathari, ball);

    // player's weapon
    ball.handleInput(cathari.x, cathari.y); // generate a ball where player is
    cathari.energy(ball); // check player's energy. when it runs out , player cannot use ball anymore

  } else if (gameState === 4) { // stage 2

    // before player starts stage 2, display instruction
    if (!section2Start) { // check if player click
      clear();
      if (!beginSound.isPlaying()) { // play music
        beginSound.play();

      }
      imageMode(CORNER);
      image(info, 0, 0, width, height);

    } else { // starts section 2
      clear();

      // play music
      if (!escapeSound.isPlaying() && !cathari.isFailed) {
        escapeSound.play();
      }

      // moving background
      if (bcWidth > 0 && !cathari.shieldActive) { // stop moving when player uses the shield
        bcWidth = bcWidth - 0.5;
      }

      imageMode(CORNER); // display background
      image(section2, -bcWidth, 0, width + 2500, height);

      instruction(); // display instruction

      // display triangle as barriers
      for (let a = 0; a < rotateTri.length; a++) {

        rotateTri[a].move();
        rotateTri[a].checkcollides(cathari);

      }

      // display keys
      for (let m = 0; m < keys.length; m++) {

        keys[m].GotKey(cathari);
        keys[m].display();
        keys[m].movement()



      }

      // display arrows
      arrow.move();
      arrow.display();
      arrow.collisionCheck(cathari); // check if arrows shoot player
      // display player
      cathari.handleInput();
      cathari.getShield(shieldImg, catharImg);
      cathari.display();
      cathari.move();

      checkResult(); // check whether player win or loss

    }
  } else if (gameState === 5) { // game over player loses

    // play music
    if (!beginSound.isPlaying()) { // prevent repeating
      beginSound.play();

    }

    imageMode(CORNER);
    image(gameOverImg, 0, 0, width, height);
    explain(); // display why player loses

    // allow player to restart the game by press Space
    if (keyIsDown(32)) { //SPACE key
      clear();

      // reset arrays and variables
      setupArrays();
      setupElements();

      gameState = 0;
      killer.length = 3;
      scrolls.length = 5;
      keys.length = 12;
      rotateTri.length = 25;
      cathari.keyCount = 0;
      bcWidth = 2500;
      cathari.isFailed = false;

    }

  }

  // set display when player wins
  else if (gameState === 6) { //
    clear();
    winScreen(); // winer screen

    // play music
    if (!finalSound.isPlaying()) {
      finalSound.play();

    }

  }

  // player the music at other stage
  else {
    if (!beginSound.isPlaying()) {
      beginSound.play();

    }
  }

}

function mousePressed() {
  if (gameState === 0) {
    gameState = 1; // display game background when mouse is clicked
    image(catharsInfoImg, width / 2, height / 2, windowWidth, windowHeight); // display info


  } else if (gameState === 1) { // another info
    gameState = 2; // instruction
    image(instructionImg, width / 2, height / 2, windowWidth, windowHeight);
  } else if (gameState === 2) { // start game
    gameState = 3;

  } else if (gameState === 4) { //start stage 2
    section2Start = true;
  }
}

function instruction() {
  fill(255);
  textSize(24);
  let content;
  if (cathari.keyCount < 12) {
    content = "You have got keys: " + cathari.keyCount + "   Distance: " + bcWidth;
  } else {
    content = "Congratulations! You have got all keys" + "   Distance: " + bcWidth;
  }


  text(content, width / 2, 50);

}

function explain() { // display why player loses
  fill(random(0, 255));
  textSize(30);
  text(failReason, width / 5, height / 1.8);


}

// check if player wins
function checkResult() {
  if (bcWidth < 10) { // reach destination
    if (cathari.keyCount > 11) { // and get 12keys
      gameState = 6;
    } // display winner screen
    else {
      gameState = 5; // player loses
      bcWidth = 2500; // reset background and display reasons
      failReason = "Oops!You dont get enough keys\n " + "when you arrive at the destination\n" +
        "So you are trapped here\n" + "And you are captured!";

    }

  }
}

// set winner screen

function winScreen() {

  noStroke();
  imageMode(CORNER);
  image(winImg, 0, 0, width, height); // backgorund image
  image(catharImg, random(width / 3.5, width / 1.2), height / 2, 100, 200); ///display winner's image and make it move
  fill(random(120, 255), random(126, 200), 252); // random color
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Congratulations for your successful escape!\n", width / 2, height / 2.5); // show winner
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  let finaltext = " I have got " + cathari.getCount + " scrolls\n" +
    "Now I will bury them under the mountain where no villain can enter\n" +
    "And one day they should be discovered again!";
  text(finaltext, width / 2, 100);


}
