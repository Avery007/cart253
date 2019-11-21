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
let rotateImg;

let avatarX;
let avatarY;
let avatarSize;

let rotateX;
let rotateY;


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

let x1=300;
let x2=400;
let x3=350;
let y1=100;
let y2=150;
let y3=290;

let rectX;
let rectY;


function preload(){

  backimg=loadImage("assets/images/fire.jpg"); // source:https://pixabay.com/photos/thunderbolt-lightning-thunderstorm-1905603/
  player = loadImage("assets/images/run.png");// source of image: https://tenor.com/view/help-dog-anime-gif-12333977
  ufo=loadImage("assets/images/ufo.png");
  rotateImg=loadImage("assets/images/rotate.png");
}

function setup() {
  // Create our playing area
  createCanvas(800,500);

	imageMode(CENTER); // set center to compare the distance betweens images

 rotateX=500;
 rotateY=100;

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
rotation();
rotationTri();
rectmove();
}

function rotation(){
  push();

  translate(rotateX,rotateY);
  rotate(degrees(1*millis()/10000));
image(rotateImg,0,0,100,100);
pop();

console.log(rotateX);
}

function rotationTri(){
  push();
  fill(255);
  translate(x2,y2);
  rotate(degrees(1*millis()/100000));
triangle(x1,y1,0,0,x3,y3);

pop();

console.log(x1);
}

function rectmove(){
fill(100);
rectX=x1;
rextY=x2;
rectX=rectX+5;
rectY=rectY+5;
rect(x1,y1,50,50);

}
