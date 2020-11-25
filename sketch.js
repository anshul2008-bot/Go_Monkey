var END;
var PLAY;
var gameState = 1;
var monkey, monkey_running;
var ground;
var banana, bananaImage, obstacle, obstacleImage
var food;
var FoodGroup, obstacleGroup
var survivalTime = 1;
var score = 1;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(530, 365);

  monkey = createSprite(80, 260, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(260, 340, 600, 100);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  console.log(ground.x);

  invisibleGround = createSprite(260, 340, 600, 100);

  FoodGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() {
  background("blue");


  text("Score : " + score, 180, 50);
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time : " + survivalTime, 250, 50);

  if (keyDown("space") && monkey.y >= 230) {
    monkey.velocityY = -13;
  }

  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);

  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
  }

  FOOD();
  OBSTACLE();

  if (monkey.isTouching(ObstacleGroup)) {
    gameState = END;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }



  drawSprites();
}

function FOOD() {

  if (frameCount % 80 === 0) {
    food = createSprite(530, 260, 20, 20);
    food.y = Math.round(random(120, 200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -5;
    food.setLifetime = 150;

    FoodGroup.add(food);
  }

}

function OBSTACLE() {

  if (frameCount % 360 === 0) {
    obstacle = createSprite(530, 270, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.setLifetime = 150;

    ObstacleGroup.add(obstacle);

  }
}