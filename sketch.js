const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var intro, introImg;
var road, roadImg;
var girl, girlImg;

var gameState = "START";
var score = 0;

var blue, blueImg;
var green, greenImg;
var orange, orangeImg;
var white, whiteImg;

function preload()
{
	introImg = loadImage("images/bgs/intro.png");
	roadImg = loadImage("images/bgs/road.png");
	girlImg = loadImage("images/girl.png");
	witchImg = loadImage("images/witch.png");

	blueImg = loadImage("images/portions/blue.png");
	greenImg = loadImage("images/portions/green.png");
	orangeImg = loadImage("images/portions/orange.png");
	whiteImg = loadImage("images/portions/white.png");
}

function setup() 
{
	createCanvas(1535, 750);
	engine = Engine.create();
	world = engine.world;

	intro = createSprite(767, 360, 1535, 720);
	intro.addImage(introImg);

	road = createSprite(767, 460, 1535, 720);
	road.addImage(roadImg);
	road.visible = false;
	road.velocityY = -1;

	girl = createSprite(767, 300, 50, 50);
	girl.addImage(girlImg);
	girl.scale = 0.6;
	girl.velocityY = -1;
	girl.visible = false;
	girl.setCollider("rectangle", 0, 0, 50, 500)

	witch = createSprite(767, 650, 50, 50);
	witch.addImage(witchImg);
	witch.scale = 0.5;
	witch.velocityY = -1;
	witch.visible = false;
	witch.setCollider("rectangle", 0, 0, 50, 500)

	Engine.run(engine);
}


function draw() 
{
	background(0);
  
	if(gameState === "START")
	{
		if(mousePressedOver(intro))
		{
			intro.visible = false;
			gameState = "PLAY";
		}
	}

	if(gameState === "PLAY")
	{
		road.visible = true;
		if(road.y === 360)
		{
			road.y = 460;
		}

		girl.visible = true;
		if(girl.y === 250)
		{
			girl.y = 360;
		}

		if(keyDown("RIGHT_ARROW"))
		{
			girl.x = girl.x + 2
		}
		if(keyDown("LEFT_ARROW"))
		{
			girl.x = girl.x - 2
		}

		spawnBlue();
		spawnGreen();

		if(hasCollided(girl, blue))
		{
			score = score + 5;
		}
		if(hasCollided(girl, green))
		{
			witch.visible = true;
			green.visible = false;
		}
		
		if(witch.y === 600)
	    {
			witch.y = 800;
	    }
		
	}
	
  	drawSprites();

	fill("white");
	stroke("white");
	textSize(20);
	text("Life: " + score, 150, 50);
}

function spawnBlue()
{
	if(frameCount % 100 === 0)
		{
			blue = createSprite(random(0, 1535), random(160, 260), 5, 5);
			blue.addImage(blueImg);
			blue.scale = 0.2;
			blue.velocityY = 2;
			blue.setCollider("circle", 0, 0, 70);
		}
}

function spawnGreen()
{
	if(frameCount % 150 === 0)
		{
			green = createSprite(random(0, 1535), random(160, 260), 5, 5);
			green.addImage(greenImg);
			green.scale = 0.2;
			green.velocityY = 2;
			green.setCollider("circle", 0, 0, 70);
		}
}

function hasCollided(lgirl, lportion)
{
  if((lgirl.x - lportion.x) <= (lgirl.width/2 + lportion.width/2) && 
  (lportion.x - lgirl.x) <= (lportion.width/2 + lgirl.width/2) && 
  (lgirl.y - lportion.y) <= (lgirl.height/2 + lportion.height/2) && 
  (lportion.y - lgirl.y) <= (lportion.height/2 + lgirl.height/2))
  {
	return true;
  }
}