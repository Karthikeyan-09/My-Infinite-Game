var rocket, rocketImage;
var sky, skyImage;
var star, starImage;
var asteroid, asteroid1, asteroid2;
var score = 0;
var lifetime = 0;
var starGroup, asteroidGroup;
var game_over, game_over_img, beepSound;

var PLAY = 1
var END = 0;
var gameState = PLAY;
function preload(){
  
rocketImage = loadImage("rocket.png");
skyImage = loadImage("sky.jpg");
starImage= loadImage("StarImage.jpg");
asteroid1 = loadImage("asteroidimg1.jpg");
asteroid2 = loadImage("asteroidimg2.jpg");
game_over_img = loadImage("GameOver.jpg");
beepSound = loadSound("beep.mp3");
}

function setup() {
createCanvas(600,600);

sky = createSprite(300,300,300,100);
sky.addImage("sky", skyImage);
sky.scale = 5;
sky.velocityX = -3;
  
rocket = createSprite(100,300,10,10);
rocket.addImage("rocket", rocketImage);
rocket.scale = 0.8;
  
game_over = createSprite(300,200,10,10);
game_over.addImage(game_over_img);
  
starGroup = new Group();
asteroidGroup = new Group();
  

}

function draw() {
 background("blue");

if (gameState === PLAY) {
 game_over.visible = false;
  rocket.y = mouseY;
  if (sky.x <0) {
    sky.x = sky .width;
  }
  asteroids();
  stars();

  //console.log(frameCount);
  
  if (rocket.isTouching(starGroup)) {
    starGroup.destroyEach();
    score = score+1;
  }
  lifetime = Math.round(frameCount/2);
}
  if (lifetime % 200 === 0) {
    beepSound.play();
  }
  if (rocket.isTouching(asteroidGroup)) {
    gameState = END;
  }
  
  if (gameState === END) {
    game_over.visible = true;
    sky.velocityX = 0;
    asteroid.velocityX = 0;
    asteroid.lifetime = -1;
    starGroup.destroyEach();
    
  }

  
  drawSprites();
  stroke("white");
  fill("white");
  textSize(25);
  text("Score :   " + score, 450,30);
  text("Lifetime :   " + lifetime, 50,30);
  
}

  
  
function stars () {
if (World.frameCount % 300 === 0) {
star = createSprite(600,300,300,100);
star.y = (random(30,590))
star.addImage(starImage);
star.scale = 0.6;
star.velocityX = -5;
star.lifetime = 90;
starGroup.add(star);
}
}

function asteroids () {
  if (World.frameCount % 150 === 0) {
    asteroid = createSprite(600,200,100,100);
    asteroid.y = (random(30,590));
    
    var r = Math.round(random(1,2));
    if (r === 1) {
      asteroid.addImage(asteroid1);
    }
    
    if (r === 2) {
      asteroid.addImage(asteroid2);
    }
    
    asteroid.velocityX = (-10 + (-score));
    asteroid.lifetime = 80;
    asteroidGroup.add(asteroid);
  }
}