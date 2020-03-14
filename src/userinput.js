
function setupInputHandlers() {
  startstopButton = select("#startstopButton");
  startstopButton.mousePressed(startstopButtonPressed);

  resetButton = select("#resetButton");
  resetButton.mousePressed(resetSimulation);
}


function startstopButtonPressed() {
  if (simutlationRunning) {
    simutlationRunning = false;
    startstopButton.html("Unpause Simutlation");
    startstopButton.removeClass("btn-primary");
    startstopButton.addClass("btn-success");
  } else {
    // If sim is reset
    if (startstopButton.class().includes("reset-sim")) {
      startstopButton.removeClass("reset-sim");
      getSliderSettings();
      spawnPeople();
    }

    simutlationRunning = true;
    startstopButton.html("Pause Simutlation");
    startstopButton.removeClass("btn-success");
    startstopButton.addClass("btn-primary");
  }
}

function resetSimulation() {
  // Make pause button to start
  simutlationRunning = false;
  startstopButton.html("Start Simutlation");
  startstopButton.removeClass("btn-primary");
  startstopButton.addClass("btn-success");
  startstopButton.addClass("reset-sim");

  balls = [];
  healthyOverTime = [0,0];
  infectedOverTime = [0,0];
  curedOverTime = [0,0];
  deadOverTime = [0,0];
  time = 0;
  amountInfected = 0;
  amountHealthy = 0;
  amountCured = 0;

  graph.remove();
  graph = new p5(defaultPlotSketch, "graph-holder");

}

function getSliderSettings() {
  let simulationSizeSlider = select("#simulationSizeSlider");
  let peopleInfectedFromStartSlider = select("#peopleInfectedFromStartSlider");
  let infectionRateSlider = select("#infectionRateSlider");
  let numberOfDoctersSlider = select("#numberOfDoctersSlider");
  let deadlynessSlider = select("#deadlynessSlider");

  amount = simulationSizeSlider.value();
  amountHealthy = simulationSizeSlider.value();
  startInfected = peopleInfectedFromStartSlider.value();
  infectionRate = infectionRateSlider.value();
  startDoctors = numberOfDoctersSlider.value();
  deadlyness = deadlynessSlider.value();

}