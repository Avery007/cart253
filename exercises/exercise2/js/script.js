/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let cheatime;
let check;
let avatarX;
let avatarY;
let avatarSize;

let word;
let warn;
let lose=0;
// The speed and velocity of our avatar circle
let avatarSpeed ;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 5;

// The speed and velocity of our enemy circle
let enemySpeed ;
let enemyVX ;

// How many dodges the player has made
let dodges = 0;

let apple;
let appleX;
let appleY=0;
let instruction;

let player;
let imgapple;

// setup()
//
// Make the canvas, position the avatar and anemy


function setup() {
  // Create our playing area
  createCanvas(1000,500);
	imageMode(CENTER);

	player = loadImage("assets/images/run.png");// source of image https://tenor.com/view/help-dog-anime-gif-12333977
	imgapple = loadImage("assets/images/apple.png");// source of image https://pixabay.com/illustrations/apple-fruit-red-crayons-drawing-1485458
 cheatime=0;
  instruction="Eat the apple to increase your lifespin!";
  avatarSpeed=10;
  avatarSize = 30;
  appleX=random(10,width-10);
	enemySpeed = 5;
	enemyVX = 5;
  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;



  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(139, 191, 240);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

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

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2+avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    lose=lose+1;
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter

  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");

    cheatime=cheatime+1;
		avatarX=width/2;
		avatarY=height/2;
if(avatarSpeed>=1){ avatarSpeed=9-cheatime*3;}
  else{avatarSpeed=0;}
 warn="Opps! You fall down from the edge so your speed is reduced to " + avatarSpeed;
}
text(check,400,400);
text(warn,450,250);


	                      // if(avatarSize>=60){avatarSize=150;}
			                   // else{avatarSize=cheatime*60;}


                                             // why doesnt}




  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is black
  fill(0);
  // Draw the player as a circle


  // The enemy is red
  fill(255,0,0);
  // Draw the enemy as a rectangle
    rectMode(CENTER);


	if(enemySize<=50){
	enemySize=5+0.5*dodges;
  enemySpeed=enemySize+0.1*dodges;
  }
	else{enemySize=enemySize;}
  rect(enemyX,enemyY,enemySize,enemySize);

  text(word,20,20);
  text(lose,500,20);

  avatarSize=30+lose*lose*5;

  if(avatarSize> 150){
    word="You lose!,your final dodges is "+ dodges;
    text(word,100,20);
    enemySpeed=0;
    appleX=0;appleY=0;

  }
  else{  word="Your dodges" + dodges;}



if(lose>=1){
   appleY=appleY+1;
   fill(255,0,0);
  image(imgapple,appleX,appleY,25,25);
  text(avatarSize,50,50);

	text(instruction,400,300);
}
if (dist(appleX,appleY,avatarX,avatarY) < enemySize/2+avatarSize/2) {
  lose=lose-1;
  appleY=0;appleX=random(10,width-10);
	instruction="";
  }

}
