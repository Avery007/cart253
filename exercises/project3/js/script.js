





// display information
let player1Info;
let failReason;

let killer=[];
let cathari;
let scrolls=[];
let keys=[];
let ball;
let arrow;
let bcWidth=2500;
let section2;
let scrollImg;

// display players and background by image
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
let killerN;
// add background musci
let backMusic;
let rotateTri=[];


let gameState = 0; // tracking game state

let fightingSound;
let finalSound;
let beginSound;
let escapeSound;





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
  coverImg = loadImage('./images/front.jpg');
  instructionImg = loadImage('./images/instruct.jpg');
  catharsInfoImg = loadImage('./images/cathars0.jpg');
  keyImg=loadImage("./images/key.png");
  triImg=loadImage("./images/tri.png");
  arrowImg=loadImage("./images/arrow.png");
  section2=loadImage("./images/bc.jpg");
  shieldImg=loadImage("./images/shield.png");
  gameOverImg=loadImage("./images/endtime.jpg");
  info=loadImage("./images/info.jpg");
  winImg=loadImage("./images/final.png");
  fightingSound=loadSound("./sounds/fightt.wav");
  beginSound=loadSound("./sounds/trouble.wav");
  escapeSound=loadSound("./sounds/esc.wav");
  finalSound=loadSound("./sounds/final.wav");
}

// function set up


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



    setupElements();
    setupArrays();


    }

function setupElements(){
  cathari = new Cathari(width - 100, height/2, 10, 30, catharImg, 87, 83, 65, 68);
  ball=new Magicball(cathari.x,cathari.y,10,ballImage,UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW,); //wsad movement
  powerfulMantra=new Scrolls(random(0,width),random(0,height),10,70,2,mantraImg);
  //rotateTri=new RotateTriangle(10,50,triImg);
  arrow=new Arrows(5,arrowImg);


section2Start=false;
cathari.keyCount=0;

}


function setupArrays(){
killerN=3;
  //killerNumber=3+floor(cathari.getCount/3);
   for (let i = 0; i < killerN; i++) {

     // Generate (mostly) random values for the arguments of the Voter constructor

     let killerSpeed = random(1, 5); // set vote move speed
     let killerRadius = random(30, 60); // set size
     // Create a new Prey objects with the random values
     let newKiller = new Killer(killerRadius, killerSpeed,killerImg);
     // Add the new vote object to the END of our array using push()
     killer.push(newKiller);
     killer[i].chasing=false; // reset value for restart game
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

      for (let r = 0; r< 25; r++) {
        // Generate (mostly) random values for the arguments of the Voter constructor
        let speed = random(2, 6);
        let size = random(20, 50);
        let rate=random(1000,20000);
        // Create a new Prey objects with the random values
        let newRotateTri= new RotateTriangle(speed,size,rate,triImg);
        // Add the new vote object to the END of our array using push()
        rotateTri.push(newRotateTri);
      }
      for (let n= 0; n< 12; n++) {
        // Generate (mostly) random values for the arguments of the Voter constructor
        let speed = random(4, 12);
        let size = random(20, 50);
        // Create a new Prey objects with the random values
        let newKey= new Key(size,speed,keyImg);

        // Add the new vote object to the END of our array using push()
        keys.push(newKey);
       keys[n].isGot=false;// reset value for restart game
      }
}


// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {


       if(gameState===0){
   imageMode(CENTER);
  image(coverImg, width/2, height/2, windowWidth, windowHeight);


}


    else if(gameState===3){
      if(!fightingSound.isPlaying()&&!cathari.isFailed){
        fightingSound.play();
    }



      imageMode(CENTER);
    image(background, width/2, height/2, windowWidth, windowHeight); // display background
    fill(255);
    textSize(25);
    text("To exit, move to the topleft corner and press ENTER " , 100,70 );
    text("You have saved " + cathari.getCount,100,100 );
    if(ball.isActive){
      text("press arrow keys to use your magic ball!",100,120 );
    }

    for (let n = 0; n < killer.length; n++) {

      killer[n].normalMove();
      killer[n].display();
      killer[n].chaseCheck();
      killer[n].chaseCheck(floor(cathari.x),floor(cathari.y));
      killer[n].chase(cathari.x,cathari.y);
      killer[n].killCathari(cathari);
      ball.killercollision(killer[n],cathari,cathari.x,cathari.y);




    }

      // display votes
      for (let a = 0; a< scrolls.length; a++) {

        scrolls[a].move();
        scrolls[a].display();
        scrolls[a].appearChange();

        cathari.getScrolls(scrolls[a]);

      }



      cathari.handleInput();
      cathari.display();
      cathari.move();

    cathari.exit();

    powerfulMantra.display();
    powerfulMantra.move();
    powerfulMantra.mantraCollision(cathari,ball);
    ball.handleInput(cathari.x,cathari.y);
    cathari.energy(ball);

   }

   else if(gameState===4){

     if(!section2Start){
     clear();
     if(!beginSound.isPlaying()){
       beginSound.play();

     }
     imageMode(CORNER);
     image(info,0,0,width,height);

    }

    else{
      clear();
      if(!escapeSound.isPlaying()&&!cathari.isFailed){
        escapeSound.play();
    }

     if(bcWidth>0&&!cathari.shieldActive){
     bcWidth=bcWidth-0.5;}

     imageMode(CORNER);
    image(section2,-bcWidth,0,width+2500,height);

    instruction();

    // instruction(info);

     for (let a = 0; a< rotateTri.length; a++) {

       rotateTri[a].move();
       rotateTri[a].checkcollides(cathari);

     }

     for (let m = 0; m< keys.length; m++) {

       keys[m].GotKey(cathari);
       keys[m].display();
       keys[m].movement()



     }

     arrow.move();
     arrow.display();
     cathari.handleInput();
      cathari.getShield(shieldImg,catharImg);
     cathari.display();
     cathari.move();
     arrow.collisionCheck(cathari);
      checkResult();

}
   }
 else if(gameState===5){
   if(!beginSound.isPlaying()){
     beginSound.play();

   }
   imageMode(CORNER);
    image(gameOverImg,0,0,width,height);
 explain();
    if(keyIsDown(32)) {
      clear();
      setupArrays();
      setupElements();
      //killer.length=3;
      gameState=0;
      killer.length=3;
      scrolls.length=5;
      keys.length=12;
      rotateTri.length=25;
      cathari.keyCount=0;
      bcWidth=2500;
      cathari.isFailed=false;

    }

 }
 else if(gameState===6){
  clear();
 winScreen();
 if(!finalSound.isPlaying()){
   finalSound.play();

 }

 }
 else{if(!beginSound.isPlaying()){
   beginSound.play();

 }
}

  }

  function mousePressed() {
    if (gameState === 0) {
      gameState = 1; // start the game when mouse is clicked
      image(catharsInfoImg,width/2,height/2,windowWidth,windowHeight);


    }
    // giving a choice to restart the game when it is over
    else if (gameState === 1) { // when game is over
      gameState = 2; // reset gamestate
     image(instructionImg,width/2,height/2,windowWidth,windowHeight);
    }
    else if (gameState === 2) {
      gameState=3;

  }
    else if (gameState === 4) {
      section2Start=true;
    }
  }

  function instruction(){
         fill(255);
         textSize(24);
         let content;
         if(cathari.keyCount<12){
       content="You have got keys: "+cathari.keyCount+"   Distance: "+ bcWidth;
     }

       else{content="Congratulations! You have got all keys"+ "   Distance: "+ bcWidth;}
      // console.log(cathari.keyCount);


 text(content,width/2,50);

  }

  function explain(){
     fill(random(0,255));
     textSize(30);
     text(failReason,width/5,height/1.8);


  }

  function checkResult(){
    if(bcWidth<10){
      if(cathari.keyCount>11){
  gameState=6;}

else {gameState=5;
     bcWidth=2500;
      failReason="Oops!You dont get enough keys\n " +"when you arrive at the destination\n"
                  +"So you are trapped here\n" + "And you are captured!";

}

  }
}



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
    let finaltext=" I have got " + cathari.getCount+ " scrolls\n"+
                   "Now I will bury them under the mountain where no villain can enter\n"
                   +"And one day they should be discovered again!";
    text(finaltext, width / 2, 100);




  }
