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

//display a rotating trianle
let x1=300;
let x2=400;
let x3=350;
let y1=100;
let y2=150;
let y3=290;

//noise movement
let noiseTimeY=0;
let noiseTimeX=0;



function preload(){

  backimg=loadImage("assets/images/fire.jpg"); // source:https://pixabay.com/photos/thunderbolt-lightning-thunderstorm-1905603/
  player = loadImage("assets/images/run.png");// source of image: https://tenor.com/view/help-dog-anime-gif-12333977
  ufo=loadImage("assets/images/flying.png");
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


 keycontrol();
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;


  ufoVX = ufoSpeed;


  ufoX = ufoX + ufoVX;


  checkcollides();

attackerMove();
rotationTri();
ellipseMask();
}

function keycontrol(){
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



}

function checkcollides(){
  // check if player moves to the UFO
  if (dist(ufoX,ufoY,avatarX,avatarY) < ufoSize/2+avatarSize/2) {
  // if so, make player moves the same as the UFO
  avatarY=ufoY;
  avatarX=ufoX;
  avatarSpeed=ufoSpeed;

   }

   //check if player runs into the attacker
   if (dist(rotateX,rotateY,avatarX,avatarY) < 120/2+avatarSize/2) {
  // if so, reset player location
   avatarY=random(0,500);
   avatarX=random(0,700);


    }


}

function attackerMove(){

  noiseTimeX = noiseTimeX + 0.01; // make noisetime keep increasing so noise() returns different value
  noiseTimeY = noiseTimeY + 0.02;
  attackerVx = map(noise(noiseTimeX), 0, 1, -10, 10);
  attackerVy = map(noise(noiseTimeY), 0, 1, -10, 10);

  if(rotateX>width||rotateX<0){// check if gets off the screen
// reset
    rotateX=random(0,width);
    rotateY=random(0,height);
  }
  else{// move
  rotateX=rotateX+attackerVx;
  rotateY=rotateY+attackerVy;
  console.log(rotateX);

}
// rotate the attacker
rotation();
}


//rotate the attacker
function rotation(){

  push();

  translate(rotateX,rotateY);
  rotate(degrees(1*millis()/10000));
image(rotateImg,0,0,100,100);
pop();

console.log(rotateX);
}


// create a scanning triangle
function rotationTri(){
  push();
  fill(255);
  translate(x2,y2);
  rotate(degrees(1*millis()/5000));
triangle(x1,y1,0,0,x3,y3);

pop();

console.log(x1);
}


// the invisible ellipse is used to cover the rotating attacker and check collisions
function ellipseMask(){
fill(100,0,0,0);
ellipseMode(CENTER);
ellipse(rotateX,rotateY,120,120);

}
