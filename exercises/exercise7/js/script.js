/******************************************************



******************************************************/


//added items
let cheatime; //count how many times players move out of the screen


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
  createCanvas(800,500);

	imageMode(CENTER); // set center to compare the distance betweens images
  backimg=loadImage("assets/images/bg.jpg"); // source:https://pixabay.com/photos/thunderbolt-lightning-thunderstorm-1905603/
  player = loadImage("assets/images/run.png");// source of image: https://tenor.com/view/help-dog-anime-gif-12333977

  cheatime=0; // initally players are on the screen

  avatarSpeed=10;
  avatarSize = 40;
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

  image(backimg,450,250);
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
  if(enemySpeed<60 && enemySpeed>0){           // set the max speed of enermy to 45
    	enemySpeed=10+0.5*dodges;  // rate of increased speed and size
      enemySize=enemySpeed/2;
      }
  else if(enemySpeed===0){enemySpeed=0;} // stop increasing when game over
  else{enemySpeed=60;
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

   }
   showlose="You are hit "+lose+ " times!"; //display how many times players lose
   fill(239, 255, 176); //pale yellow
   text(showlose,20,40);
   avatarSize=40+lose*lose*5; //important!change playersize eatch time after hit




//what will happen when players lose the game
// I use avatarSize to check if players lose the game since players's size
// reflect how many times they fail to dodge
  if(avatarSize> 150 || enemySpeed===0){
     //players lose the game after 5 hit
//a bug occurs when players eat the apple right after being hit 5 times，
//so speed turns 0 but size reduces.To fix the bug, add condition and reset values
       result="You lose!Good luck next time!"; //display when game over
       textSize(30);
       text(result,400,250);
       instruction=""; // get rid of apple instruction by set it to null
       enemySpeed=0;
       lose=5;  // fix the bug

       avatarX=300;   // reset the player location to look better
       avatarY=250;

     }



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
