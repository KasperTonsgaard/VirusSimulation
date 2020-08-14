function checkCollisionWithPerson() {
  if (simutlationRunning) {
    
    for(let i = 0; i < people.length; i++){
      if(people[i].infected){
        for(let y = 0; y < people.length; y++){
          if(people[y].infected == false && people[y].dead == false){
            distance = sqrt(((people[y].x - people[i].x)**2) + (((people[y].y - people[i].y)**2)));
            if(distance < (people[i].size + people[y].size)/2){
              if(people[y].doctor){
                people[i].cured = true;
                people[i].infected = false;
                people[i].color = [0, 255, 0];
              }
              rand = random(0, 100);
              if(people[i].isFool || people[y].isFool){
                if(rand <= people[y].infectionRate) {
                  if(people[y].cured == false && people[y].doctor == false){
                    people[y].infected = true;
                    people[y].timeInfected = time;
                    people[y].color = [255, 0, 0];  
                  }
                }
              } else {
                if(rand >= people[y].hygiene){
                  rand = random(0, 250);
                  if(rand <= people[y].infectionRate) {
                    if(people[y].cured == false && people[y].doctor == false){
                      people[y].infected = true;
                      people[y].timeInfected = time;
                      people[y].color = [255, 0, 0];  
                    }
                  }
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
      append(people, new person(random(50, canvasParrentSize[0] - 50), random(50, canvasHeight - 50), random(8,10), false, infectionRate, hygiene, false));
    }

  // Check if number of people is too small compared to the amount of roles
  if(startInfected + startDoctors >= amount){
    alert("There are too many infected or too many doctors compared to the amount of people");
    resetSimulation();
  } else if(startFools + startDoctors >= amount){
    alert("There are too many fools or too many doctors compared to the amount of people");
    resetSimulation();
  } else {
    // Make random people infected
    for(let i = 0; i < startInfected; i++){
        while(true){
            randomPerson = floor(random(amount));
            if(people[randomPerson].infected == true || people[randomPerson].doctor == true){
                randomPerson = floor(random(amount));
            } else {
                break;
            }
          }
          people[randomPerson].infected = true;
          people[randomPerson].timeInfected = time;
          people[randomPerson].color = [255, 0, 0];
        }
      
      // Make random people doctors
      for(let i = 0; i < startDoctors; i++){
          while(true){
            randomPerson = floor(random(amount));
            if(people[randomPerson].infected == true || people[randomPerson].doctor == true){
                randomPerson = floor(random(amount));
            } else {
                break;
            }
          }
          people[randomPerson].doctor = true;
          people[randomPerson].color = [42,127,186];
        }

      // Make random people fools
      for(let i = 0; i < startFools; i++){
        while(true){
          randomPerson = floor(random(amount));
          if(people[randomPerson].isFool == true || people[randomPerson].doctor == true){
              randomPerson = floor(random(amount));
          } else {
              break;
          }
        }
        people[randomPerson].isFool = true;
        people[randomPerson].speedX = random(-3,3);
        people[randomPerson].speedY = random(-3,3);
      }
    }
  }
  



function checkInfectionTime(person){
    durationInfected = time - person.timeInfected;
    if(person.immunity <= durationInfected && person.infected){
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



class person {
  
  constructor(x, y, size, infected, infectionRate, hygiene, doctor){
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.immunity = random(10, 20);
    this.infected = infected;
    this.infectionRate = infectionRate; //infection rate in percent
    this.hygiene = hygiene
    this.timeInfected = 0;

    this.isFool = false;

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
    strokeWeight(1.2);
    stroke(1);
    circle(this.x, this.y, this.size);
    if(this.isFool){
      fill(139,69,19)
      noStroke();
      circle(this.x, this.y, this.size/1.5)
    }
  }
  move(){
    if(this.dead == false){
        if(this.doctor){
            this.shortestDistance = null;
            for(let i = 0; i < people.length; i++){
                if(people[i].infected){
                    distance = sqrt(((this.x - people[i].x)**2) + (((this.y - people[i].y)**2)));
                    if(this.shortestDistance == null){
                        this.shortestDistance = distance;
                        this.shortestDistancePerson = people[i];
                    } else {
                        if(distance < this.shortestDistance){
                            this.shortestDistance = distance
                            this.shortestDistancePerson = people[i];
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
              if(this.isFool){
                this.speedX = random(-3,3);
                this.speedY = random(-3,3);
              } else {
                this.speedX = random(-2,2);
                this.speedY = random(-2,2);
              }
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