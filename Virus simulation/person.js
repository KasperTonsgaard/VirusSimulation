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
  
  // Spawn people
  for(let i = 0; i < amount; i++){
      append(balls, new ball(random(50, canvasParrentSize[0] - 50), random(50, canvasHeight - 50), random(7,10), false, infectionRate, false));
    }

  // Make random people infected
  if(startInfected + startDoctors >= amount){
    alert("There are too many infected or too many doctors compared to the amount of people");
    resetSimulation();
  } else {
    for(let i = 0; i < startInfected; i++){
        while(true){
            randomPerson = floor(random(amount));
            if(balls[randomPerson].infected == true || balls[randomPerson].doctor == true){
                randomPerson = floor(random(amount));
            } else {
                break;
            }
          }
          if(balls[randomPerson].infected == false && balls[randomPerson].doctor == false){
            balls[randomPerson].infected = true;
            balls[randomPerson].timeInfected = time;
            balls[randomPerson].color = [255, 0, 0];
          }
        }
      
      // Make random people doctors
      for(let i = 0; i < startDoctors; i++){
          while(true){
            randomPerson = floor(random(amount));
            if(balls[randomPerson].infected == true || balls[randomPerson].doctor == true){
                randomPerson = floor(random(amount));
            } else {
                break;
            }
          }
          
          if(balls[randomPerson].infected == false && balls[randomPerson].doctor == false){
            balls[randomPerson].doctor = true;
            balls[randomPerson].color = [42,127,186];
          }
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
    this.speed = 1;

    this.color = [255,255,255];

  }
  draw(){
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
  move(){
    if(this.dead == false){
        if(this.doctor){
            this.shortestDistance = null;
            for(let i = 0; i < balls.length; i++){
                if(balls[i].infected){
                    distance = sqrt(((this.x - balls[i].x)**2) + (((this.y - balls[i].y)**2)));
                    if(this.shortestDistance == null){
                        this.shortestDistance = distance;
                        this.shortestDistancePerson = balls[i];
                    } else {
                        if(distance < this.shortestDistance){
                            this.shortestDistance = distance
                            this.shortestDistancePerson = balls[i];
                        }
                    }
                }
            }

            if(this.shortestDistance == null){
                // Don't move
                this.x = this.x;
                this.y = this.y;       
            } else {
                this.distanceX = this.shortestDistancePerson.x - this.x;
                this.distanceY = this.shortestDistancePerson.y - this.y;

                if(this.distanceX < 0){
                    this.x -= this.speed;
                } else if(this.distanceX > 0){
                    this.x += this.speed;
                } else if(this.distanceX == 0){
                    this.x = this.x;
                }

                if(this.distanceY < 0){
                    this.y -= this.speed;
                } else if(this.distanceY > 0){
                    this.y += this.speed;
                } else if(this.distanceY == 0){
                    this.y = this.y;
                }
            }

        } else {
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
        
            if(ceil(random(10)) == 1){
                this.speedX = random(-2,2);
                this.speedY = random(-2,2);
            }
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