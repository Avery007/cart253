/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/


//added items
let cheatime; //count how many times players move out of the screen

// add an apple to recude player's lose
let apple;
let appleX;
let appleY=0;
let instruction; // instruction about the apple

let result;  // display when players lose the game
let dodgesNumber; //showing doges number
let warn; // display when players go off screen
let showlose; // show how mnay times players are hit

let player;  //player image
let imgapple; // apple image
let backimg; //background image

let avatarX;
let avatarY;
let avatarSize;

let lose=0;

// The speed and velocity of our avatar circle
let avatarSpeed ;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 10;

// The speed and velocity of our enemy circle
let enemySpeed ;
let enemyVX ;

// How many dodges the player has made
let dodges = 0;

function setup() {
  // Create our playing area
  createCanvas(950,500);

	imageMode(CENTER); // set center to compare the distance betweens images
  backimg=loadImage("assets/images/thunder.png"); // source:https://pixabay.com/photos/thunderbolt-lightning-thunderstorm-1905603/
  player = loadImage("assets/images/run.png");// source of image: https://tenor.com/view/help-dog-anime-gif-12333977
	imgapple = loadImage("assets/images/apple.png");// source of image: https://pixabay.com/illustrations/apple-fruit-red-crayons-drawing-1485458

  cheatime=0; // initally players are on the screen
  instruction="Eat the apple to increase your lifespin!";
  avatarSpeed=10;
  avatarSize = 40;
  appleX=random(10,width-10); // make apple location random
	enemySpeed = 10;
	enemyVX = 10;

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

// Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}


function draw() {

  image(backimg,490,250);
  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

// display player as an image and the size and speed could change
image(player,avatarX,avatarY,avatarSize,avatarSize);
console.log(avatarSize);

// Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity

  enemyX = enemyX + enemyVX;

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
      // This means the player dodged so update its dodge statistic
      dodges = dodges + 1;
      // Reset the enemy's position to the left at a random height
      enemyX = 0;
      enemyY = random(0,height);
    }

  // Draw the enemy as a red rectangle
  fill(255,0,0);
  rectMode(CENTER);
// change the size and speed of enermy when players make dodges
  if(enemySize<=35){           // set the max size of enermy to 40
    	enemySize=10+0.5*dodges;  // rate of increased speed and size
      enemySpeed=enemySize;
      }
  else{enemySize=enemySize;
    } // size and speed stops increasing
  console.log(enemySpeed);
  rect(enemyX,enemyY,enemySize,enemySize);// display enery as a rectangle


  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2+avatarSize/2) {

    lose=lose+1; // count how many times lose
    enemyX = 0; // reset enemy location
    enemyY = random(0,height);
    avatarX = width/2;// Reset the avatar's position
    avatarY = height/2;

   }
   showlose="You are hit "+lose+ " times!"; //display how many times players lose
   fill(239, 255, 176); //pale yellow
   text(showlose,20,40);
   avatarSize=40+lose*lose*5; //important!change playersize eatch time after hit


// display an apple each time when players are hit
 if(lose>=1){
   appleY=appleY+1; // move apple
   // appleX is a random number so the position is different each time
   image(imgapple,appleX,appleY,25,25);
   text(instruction,400,200); // explain the apple function
   }

// when players move towards the apple, lose is reduced by one each time
 if (dist(appleX,appleY,avatarX,avatarY) < enemySize/2+avatarSize/2)
   // check distance between players and apples
   {
     lose=lose-1; // reduce lose if it is true
     appleY=0;
     appleX=random(10,width-10);
   	 instruction="";
// instructions only show up one time， when players eat the apple,it disappears
  }


//what will happen when players lose the game
// I use avatarSize to check if players lose the game since players's size
// reflect how many times they fail to dodge
  if(avatarSize> 150){      //players lose the game after 5 hit
       result="You lose!Good luck next time!"; //display when game over
       textSize(30);
       text(result,400,250);
       instruction=""; // get rid of apple instruction by set it to null
       enemySpeed=0;
       appleX=0;  // reset apple--no apple on the screen
       appleY=0;
       avatarX=300;   // reset the player location to look better
       avatarY=250;

     }
  else{ dodgesNumber="Your dodges " + dodges;} //when game continues, show dodges number
     textSize(15);
     fill(239, 255, 176); //pale yellow
     text(dodgesNumber,20,20);



  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
// if players do so, their position will be reset and their speed reduces
 //each time they cheat
  cheatime=cheatime+1; //count cheat time
	avatarX=width/2;    // reset position
	avatarY=height/2;

if(avatarSpeed>=1){ avatarSpeed=9-cheatime*3;} // reset player's speed
else{avatarSpeed=0;} // to avoid the speed turns negative number

 warn="Opps! You fall down from the edge so your speed is reduced to " + avatarSpeed;
}
textSize(15);
text(warn,250,25);// display warn when this happens

}
