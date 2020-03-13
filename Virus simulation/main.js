canvasHeight = 500;

simutlationRunning = true;
balls = [];
infectedOverTime = [];

infectionRate = 0;

amount = 0;
amountInfected = 0;
amountHealthy = amount;
amountCured = 0;

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


  for(let i = 0; i < balls.length; i++){
    countAmountInfected = 0;
    countAmountHealthy = 0;
    countAmountCured = 0;

    if(balls[i].infected == true){
      countAmountInfected += 1;
    } else if(balls[i].cured == true){
      countAmountCured += 1;
    } else {
      countAmountHealthy += 1;
    }
    
    balls[i].draw();
    checkInfectionTime(balls[i]);

    if(simutlationRunning){
      balls[i].move();
      balls[i].collisionWithWall();  
    }
  }

  if(simutlationRunning){
    time += (deltaTime/1000);
  }

  amountInfected = countAmountInfected;
  amountHealthy = countAmountHealthy;

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

/*

var defaultPlotSketch = function(p) {
	// Initial setup
	p.setup = function() {
		// Create the canvas
		p.createCanvas(500, 350);
		p.background(150);

		// Prepare the points for the plot
		var points = [];
		
		for (var i = 0; i < 100; i++) {
			points[i] = new GPoint(i, infectedOverTime[i]);
		}

		// Create a new plot and set its position on the screen
		var plot = new GPlot(p);
		plot.setPos(25, 25);

		// Set the plot title and the axis labels
		plot.setPoints(points);
		plot.getXAxis().setAxisLabelText("Tid");
		plot.getYAxis().setAxisLabelText("Antal smittede");
		plot.setTitleText("Smittede over tid");

		// Draw it!
		plot.beginDraw();
		plot.drawBox();
		plot.drawXAxis();
		plot.drawYAxis();
		plot.drawTitle();
		plot.drawPoints();
		plot.drawLines();
		plot.endDraw();
	};
};

*/
