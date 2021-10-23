var play
var end
var gameState = play

var ghost, ghostImage
var tower, towerImage

var door, doorImage, doorsGroup
var climber, climberImage, climbersGroup
var invisibleClimber, invisible_ClimbersGroup

var spookySound

function preload(){
  ghostImage = loadImage("ghost-standing.png")
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  towerImage = loadImage("tower.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
    //spookySound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY = 3;

  ghost = createSprite (300, 300, 4, 4);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3
  ghost.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisible_ClimbersGroup = new Group();
}

function draw() {
    background(0);
  
  if (gameState === play){
    
        if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
        if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")){
      ghost.velocityY = -10
    }
    ghost.velocityY += 0.8
    
      if (tower.y > 400){
    tower.y = tower.height/2
  } 
    spawnDoors();
    
    
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if (invisible_ClimbersGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     gameState = "end"
    }
      drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill ("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
  


}

function spawnDoors(){
  if (World.frameCount%100 === 0){
    door = createSprite(400, 200, 5, 5);
    door.addImage(doorImage);
    door.velocityY = 3;
    door.lifetime = 300;
    
    climber = createSprite(400, 250, 5, 5);
    climber.addImage(climberImage);
    climber.velocityY = 3;
    climber.lifetime = 300;
        
    invisibleClimber = createSprite(400, 250, 100, 5);
    invisibleClimber.velocityY = 3;
    invisibleClimber.lifetime = 300;
    invisibleClimber.width = climber.width;
    invisibleClimber.height = 2;
    //invisibleClimber.visible = false;
    invisibleClimber.debug = true;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleClimber.x = climber.x;

    ghost.depth = door.depth;
    ghost.depth += 1
    
    doorsGroup.add(door); 
    climbersGroup.add(climber);
    invisible_ClimbersGroup.add(invisibleClimber);
  }
}
