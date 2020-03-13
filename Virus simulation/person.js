function checkCollisionWithBalls() {
  if (simutlationRunning) {
    
    for(let i = 0; i < balls.length; i++){
      if(balls[i].infected){
        for(let y = 0; y < balls.length; y++){
          if(balls[y].infected == false && balls[y].dead == false){
            distance = sqrt(((balls[y].x - balls[i].x)**2) + (((balls[y].y - balls[i].y)**2)));
            if(distance < (balls[i].size + balls[y].size)/2){
              if(balls[y].doctor){
                balls[i].cured = true;
                balls[i].infected = false;
                balls[i].color = [0, 255, 0];
              }
              // GIVER DET MENING???, hvorfor er det ikke til 100 - Luccas
              rand = random(0, 250);
              if (rand < balls[y].infectionRate) {
                if(balls[y].cured == false && balls[y].doctor == false){
                  balls[y].infected = true;
                  balls[y].timeInfected = time;
                  balls[y].color = [255, 0, 0];  
                }
              }
            }
          }
        }
      }
    }
  }
}


function spawnPeople(){
  let canvasParrentSize = getCanvasParrentSize();
  for(let i = 0; i < amount; i++){
      append(balls, new ball(random(50, canvasParrentSize[0] - 50), random(50, canvasHeight - 50), random(7,10), false, infectionRate, false));
    }
  for(let i = 0; i < startInfected; i++){
      randomPerson = round(random(amount));
      if(balls[randomPerson].infected == false && balls[randomPerson].doctor == false){
        balls[randomPerson].infected = true;
        balls[randomPerson].timeInfected = time;
        balls[randomPerson].color = [255, 0, 0];
      }
    }
  
  for(let i = 0; i < startDoctors; i++){
      randomPerson = ceil(random(amount));
      if(balls[randomPerson].infected == false && balls[randomPerson].doctor == false){
        balls[randomPerson].doctor = true;
        balls[randomPerson].color = [42,127,186];
      }
    }
}



function checkInfectionTime(person){
    durationInfected = time - person.timeInfected;
    if(person.immunity <= durationInfected && person.infected && person.infected){
        fate = random(100);
        if(fate < deadlyness){
            person.color = [0, 0, 0];
            person.dead = true;
            person.infected = false;
        } else {
            person.color = [0, 255, 0];
            person.cured = true;
            person.infected = false;
        }
    }
}



class ball {
  
  constructor(x, y, size, infected, infectionRate, doctor){
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.immunity = random(10, 20);
    this.infected = infected;
    this.infectionRate = infectionRate; //infection rate in percent
    this.timeInfected = 0;

    this.dead = false;

    this.cured = false;
    this.doctor = doctor;

    this.speedX = random(-2,2);
    this.speedY = random(-2,2);

    this.color = [255,255,255];

  }
  draw(){
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
  move(){
    if(this.dead == false){
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    
        if(ceil(random(10)) == 1){
        this.speedX = random(-2,2);
        this.speedY = random(-2,2);
        }    
    }
  }
  collisionWithWall(){
    var canvasParrentSize = getCanvasParrentSize();
    
    if(this.x + this.speedX >= canvasParrentSize[0] - 10 || this.x + this.speedX <= 10){
      this.x += ((this.speedX * -1)*2)
      this.speedX = this.speedX * -1;
    }
    if(this.y + this.speedY >= canvasParrentSize[1] - 10|| this.y + this.speedY <= 10){
      this.y += ((this.speedY * -1)*2)
      this.speedY = this.speedY * -1;
    }
  }
  
}