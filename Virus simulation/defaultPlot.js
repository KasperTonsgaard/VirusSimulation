var defaultPlotSketch = function(p) {
	
	var plot;
	var count = 0;

	// Initial setup
	p.setup = function() {
		// Create the canvas
		var canvas = p.createCanvas(500, 350);

		// Prepare the points for the plot
		var points = [];
		points[0] = new GPoint(0,0);

		// Create a new plot and set its position on the screen
		plot = new GPlot(p);
		plot.setPos(25, 25);
		plot.setDim(300, 200);
		//plot.setDim();

		plot.setXLim(0, 100)
		plot.setYLim(0, 500)

		// Set the plot title and the axis labels
		plot.setPoints(points);
		plot.getXAxis().setAxisLabelText("Time");
		plot.getYAxis().setAxisLabelText("Infected");
		plot.setTitleText("Infected over time");
		plot.activatePanning();
		plot.setPoints(points);

	};
	p.draw = function() {
		// Clean the canvas
		p.background(150);

		if(infectedOverTime[count][0] < 10){
			plot.setXLim(0, 10)
		} else{
			plot.setXLim(0, infectedOverTime[count][0])
		}

		// Draw the plot
		plot.beginDraw();
		plot.drawBackground();
		plot.drawBox();
		plot.drawXAxis();
		plot.drawYAxis();
		plot.drawTopAxis();
		plot.drawRightAxis();
		plot.drawTitle();
		plot.getMainLayer().drawPoints();
		plot.endDraw();

		// Add and remove new points every 10th of a second
		plot.addPoint(new GPoint(infectedOverTime[count][0], infectedOverTime[count][1]));

		count++;
		
	};
};
