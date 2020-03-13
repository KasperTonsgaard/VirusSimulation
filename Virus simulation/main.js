canvasHeight = 500;

simutlationRunning = true;
balls = [];
infectedOverTime = [];

infectionRate = 0;

amount = 0;
amountInfected = 0;
amountHealthy = amount;
amountCured = 0;
amountDead = 0;

startInfected = 0;
startDoctors = 0;

deadlyness = 50; 

time = 0;


function setup() {
  let canvasParrentSize = getCanvasParrentSize();
  canvas = createCanvas(canvasParrentSize[0], 500);
  canvas.parent('canvas-holder');

  setupInputHandlers();

  getSliderSettings();
  spawnPeople();

}

function draw() {
  background(70);  

  // Collision
  checkCollisionWithBalls();

  countAmountInfected = 0;
  countAmountHealthy = 0;
  countAmountCured = 0;
  countAmountDead = 0;
  for(let i = 0; i < balls.length; i++){
    if(balls[i].infected == true){
      countAmountInfected += 1;
    } else if(balls[i].cured == true){
      countAmountCured += 1;
    } else if(balls[i].dead == true){
      countAmountDead += 1;
    } else {
      countAmountHealthy += 1;
    }
    
    balls[i].draw();
    
    if(simutlationRunning){
      checkInfectionTime(balls[i]);
      balls[i].move();
      balls[i].collisionWithWall();  
    }
  }

  
  amountInfected = countAmountInfected;
  amountHealthy = countAmountHealthy;
  amountCured = countAmountCured;
  amountDead = countAmountDead;

  if(amountInfected != 0 && simutlationRunning){
    time += (deltaTime/1000);
  }

  drawStatistic();
  
  append(infectedOverTime, amountInfected);

}

function windowResized() {
  let canvasParrentSize = getCanvasParrentSize();
  resizeCanvas(canvasParrentSize[0], 500);
}


function getCanvasParrentSize() {
  let parrent = select('#canvas-parrent');
  let width = parrent.width - 40;
  let height = parrent.height - 40;
  return [width, height];
}

