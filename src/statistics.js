
function drawStatistic() {

  select("#amountHealthyValue").html(amountHealthy);
  select("#amountInfectedValue").html(amountInfected);
  select("#amountCuredValue").html(amountCured);
  select("#amountDeadValue").html(amountDead);
  select("#daysElapsedValue").html(round(time));

}