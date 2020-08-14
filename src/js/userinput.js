
function setupInputHandlers() {
  startstopButton = select("#startstopButton");
  startstopButton.mousePressed(startstopButtonPressed);

  resetButton = select("#resetButton");
  resetButton.mousePressed(resetSimulation);
}


function startstopButtonPressed() {
  if (simutlationRunning) {
    simutlationRunning = false;
    startstopButton.html("Start Simutlation");
    startstopButton.removeClass("btn-primary");
    startstopButton.addClass("btn-success");
  } else {
    // If simulation has been is reset
    if (startstopButton.class().includes("reset-sim")) {
      startstopButton.removeClass("reset-sim");
      getSliderSettings();
      resetGraph();
      spawnPeople();
    }

    simutlationRunning = true;
    startstopButton.html("Stop Simutlationen");
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

  people = [];
  healthyOverTime = [0,0];
  infectedOverTime = [0,0];
  curedOverTime = [0,0];
  deadOverTime = [0,0];
  time = 0;
  amountInfected = 0;
  amountHealthy = amount;
  amountCured = 0;

  resetGraph();

  graph.remove();
  graph = new p5(defaultPlotSketch, "graph-holder");

}

function getSliderSettings() {
  let simulationSizeSlider = select("#simulationSizeSlider");
  let peopleInfectedFromStartSlider = select("#peopleInfectedFromStartSlider");
  let infectionRateSlider = select("#infectionRateSlider");
  let deadlynessSlider = select("#deadlynessSlider");
  // let numberOfDoctersSlider = select("#numberOfDoctersSlider");
  let numberOfFoolsSlider = select("#numberOfFoolsSlider");
  let peoplesHygieneSlider = select("#peoplesHygieneSlider");

  amount = simulationSizeSlider.value();
  amountHealthy = simulationSizeSlider.value();
  startInfected = peopleInfectedFromStartSlider.value();
  infectionRate = infectionRateSlider.value();
  deadlyness = deadlynessSlider.value();
  // startDoctors = numberOfDoctersSlider.value();
  startDoctors = 0;
  startFools = numberOfFoolsSlider.value();
  hygiene = peoplesHygieneSlider.value();

}