var backgroundImage
var hotAirBallonSprite,hotAirBallonImg




function preload(){
  backgroundImage=loadImage("Hot Air Ballon-01.png");
  hotAirBallonImg=loadImage("Hot Air Ballon-02.png");
}



function setup() {
  database = firebase.database();
  createCanvas(1500,900);
  rectMode(CENTER);

  hotAirBallonSprite = createSprite(200,200,20,20);
  hotAirBallonSprite.addImage(hotAirBallonImg);
  hotAirBallonSprite.scale=0.7;

  var hotAirBallonSprite = database.ref('balloon');
    hotAirBallonSprite.on("value",readPosition);

}

function draw() {

  background(backgroundImage);  

  textSize(25);
  fill("black");
  text("**Use Arrow Keys To Move Hot Air Ballon",300,50);
  rectMode(CENTER);

  if(keyDown(LEFT_ARROW)){
    hotAirBallonSprite.x=hotAirBallonSprite.x-5;
  }
  else if(keyDown(RIGHT_ARROW)){
    hotAirBallonSprite.x=hotAirBallonSprite.x+5;
  }
  else if(keyDown(UP_ARROW)){
    hotAirBallonSprite.y=hotAirBallonSprite.y-5;
  }
  else if(keyDown(DOWN_ARROW)){
    hotAirBallonSprite.y=hotAirBallonSprite.y+5;
  }

  drawSprites();
 
}

function readPosition(data){
  position = data.val();
  hotAirBallonSprite.x=position.x;
  hotAirBallonSprite.y=position.y;
}


function changePosition(x,y){
  hotAirBallonSprite.x =hotAirBallonSprite.x + x;
  hotAirBallonSprite.y = hotAirBallonSprite.y + y;
}

function writePosition(x,y){
  database.ref('balloon').set({
      'x':position.x+x,
      'y':position.y+y
  })
}
