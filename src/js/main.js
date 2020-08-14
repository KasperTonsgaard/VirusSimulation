canvasHeight = 500;

simutlationRunning = false;
people = [];
healthyOverTime = [0,0];
infectedOverTime = [0,0];
curedOverTime = [0,0];
deadOverTime = [0,0];

infectionRate = 0;
hygiene = 0;

amount = 0;
amountInfected = 0;
amountHealthy = amount;
amountCured = 0;
amountDead = 0;

graph = null;

startInfected = 0;
startDoctors = 0;
startFools = 0;

deadlyness = 50; 

time = 0;
lastTime = 0;


function setup() {
  let canvasParrentSize = getCanvasParrentSize();
  canvas = createCanvas(canvasParrentSize[0], 500);
  canvas.parent('canvas-holder');
  
  // graph = new p5(defaultPlotSketch, "graph-holder");

  resetSimulation();

  setupInputHandlers();

  getSliderSettings();
  spawnPeople();
}

function draw() {
  background(233,236,242); 

  // Collision
  checkCollisionWithPerson();

  countAmountInfected = 0;
  countAmountHealthy = 0;
  countAmountCured = 0;
  countAmountDead = 0;
  for(let i = 0; i < people.length; i++){
    if(people[i].infected == true){
      countAmountInfected += 1;
    } else if(people[i].cured == true){
      countAmountCured += 1;
    } else if(people[i].dead == true){
      countAmountDead += 1;
    } else {
      countAmountHealthy += 1;
    }
    
    people[i].draw();
    
    if(simutlationRunning){
      checkInfectionTime(people[i]);
      people[i].move();
      people[i].collisionWithWall();  
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
  if(round(time) != lastTime) {
    lastTime = round(time)
    updateGraph();
  }

  // append(healthyOverTime, [time, amountHealthy]);
  // append(infectedOverTime, [time, amountInfected]);
  // append(curedOverTime, [time, amountCured]);
  // append(deadOverTime, [time, amountDead]);

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

// function getGraphParrentSize() {
//   let parrent = select('#graph-parrent');
//   let width = parrent.width - 40;
//   let height = parrent.height - 40;
//   return [width, height];
// }