var defaultPlotSketch = function(p) {
	
	var plot;
	var count = 0;
	var size = 5;

	// Initial setup
	p.setup = function() {
		let parrentSize = getGraphParrentSize();
		// Create the canvas
		var canvas = p.createCanvas(parrentSize[0], 500);

		// Prepare the points for the plot
		var points = [];
		var pointsHealthy = [];
		points[0] = new GPoint(0,0);
		pointsHealthy[0] = new GPoint(0,amount);


		// Create a new plot and set its position on the screen
		plot = new GPlot(p);
		plot.setPos(0, 0);
		plot.setDim(parrentSize[0]-100, 400);

		plot.setXLim(0, 100)
		plot.setYLim(0, amount)

		// Set the plot title and the axis labels
		plot.setPoints(points);
		plot.setPointSize(size);
		plot.setPointColor([255, 0, 0]);
		
		plot.getXAxis().setAxisLabelText("Time");
		plot.getYAxis().setAxisLabelText("People");
		plot.setTitleText("");

		plot.setLineWidth(size);
		plot.setLineColor([255, 0, 0]);

		plot.addLayer("healthy", pointsHealthy);
		plot.getLayer("healthy").setPointColor([200, 200, 200]);
		plot.getLayer("healthy").setPointSize(size);
		plot.getLayer("healthy").setLineColor([200, 200, 200]);
		plot.getLayer("healthy").setLineWidth(size);
		
		plot.addLayer("cured", points);
		plot.getLayer("cured").setPointColor([0, 255, 0]);
		plot.getLayer("cured").setPointSize(size);
		plot.getLayer("cured").setLineColor([0, 255, 0]);
		plot.getLayer("cured").setLineWidth(size);
		
		plot.addLayer("dead", points);
		plot.getLayer("dead").setPointColor([0, 0, 0]);
		plot.getLayer("dead").setPointSize(size);
		plot.getLayer("dead").setLineColor([0, 0, 0]);
		plot.getLayer("dead").setLineWidth(size);

	};
	
	p.draw = function() {
		// Clean the canvas
		p.background([0,0,0,0]);

		let parrentSize = getGraphParrentSize();
		plot.setDim(parrentSize[0]-100, 400);

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
		plot.drawLines();
		plot.drawGridLines(1);
		plot.getMainLayer().drawPoints();
		plot.getLayer("healthy").drawPoints();
		plot.getLayer("cured").drawPoints();
		plot.getLayer("dead").drawPoints();
		plot.endDraw();

		// Add and remove new points every 10th of a second
		plot.addPoint(new GPoint(infectedOverTime[count][0], infectedOverTime[count][1]));
		plot.getLayer("healthy").addPoint(new GPoint(healthyOverTime[count][0], healthyOverTime[count][1]));
		plot.getLayer("cured").addPoint(new GPoint(curedOverTime[count][0], curedOverTime[count][1]));
		plot.getLayer("dead").addPoint(new GPoint(deadOverTime[count][0], deadOverTime[count][1]));
		
		
		count++;
		
	};
	
	p.windowResized = function() {
		let parrentSize = getGraphParrentSize();
		p.resizeCanvas(parrentSize[0], 500);
	}

};
