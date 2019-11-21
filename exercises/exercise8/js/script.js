/******************************************************



******************************************************/


//added items



let instruction; // instruction about the apple

let result;  // display when players lose the game

let warn; // display when players go off screen
let showlose; // show how mnay times players are hit

let player;  //player image
let ufo;
let backimg; //background image

let avatarX;
let avatarY;
let avatarSize;



// The speed and velocity of our avatar circle
let avatarSpeed ;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let ufoX;
let ufoY;
let ufoSize = 10;

// The speed and velocity of our enemy circle
let ufoSpeed ;
let ufoVX ;


function preload(){

  backimg=loadImage("assets/images/fire.jpg"); // source:https://pixabay.com/photos/thunderbolt-lightning-thunderstorm-1905603/
  player = loadImage("assets/images/run.png");// source of image: https://tenor.com/view/help-dog-anime-gif-12333977
  ufo=loadImage("assets/images/ufo.png");
}
function setup() {
  // Create our playing area
  createCanvas(800,500);

	imageMode(CENTER); // set center to compare the distance betweens images


  avatarSpeed=10;
  avatarSize = 40;

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  ufoSpeed=5;
  ufoSize=100;
  ufoX=5;
  ufoY=100;


  // No stroke so it looks cleaner
  noStroke();
}


function draw() {

  image(backimg,width/2,height/2,width,height);
  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  image(ufo,ufoX,ufoY,ufoSize,ufoSize/5);

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
  ufoVX = ufoSpeed;
  // Update the enemy's position based on its velocity

  ufoX = ufoX + ufoVX;


  if (dist(ufoX,ufoY,avatarX,avatarY) < ufoSize/2+avatarSize/2) {

  avatarY=ufoY;
  avatarX=ufoX;
  avatarSpeed=ufoSpeed;

   }
   

}
