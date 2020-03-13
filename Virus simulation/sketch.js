Width = 1000;
Height = 1000;

function setup() {
  createCanvas(Width, Height);
  amount = 100;
  balls = [];
  for(let i = 0; i < amount; i++){
    append(balls, new ball(random(Width - 50), random(Height - 50), random(3,8), false));
  }
  balls[0].infected = true;
}

function draw() {
  background(220);
  for(let i = 0; i < balls.length; i++){
    if(balls[i].infected){
      for(let y = 0; y < balls.length; y++){
        if(balls[y].infected == false){
          distance = sqrt(((balls[y].x - balls[i].x)**2) + (((balls[y].y - balls[i].y)**2)));
          if(distance < (balls[i].size + balls[y].size)){
            balls[y].infected = true;
            balls[y].color = [255, 0, 0];
          }
        }
      }
    }
    
    balls[i].draw();
    balls[i].move();
    balls[i].collisionWithWall();

  }
}


class ball {
  
  constructor(x, y, size, infected){
    this.x = x;
    this.y = y;
    this.size = size;
    this.infected = infected;
    this.speedX = random(-2,2);
    this.speedY = random(-2,2);
    if(this.infected){
      this.color = [255,0,0];
    }
    else{
      this.color = [255,255,255]
    }
  }
  draw(){
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
  move(){
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    
    
    if(ceil(random(10)) == 1){
      this.speedX = random(-2,2);
      this.speedY = random(-2,2);
    }
  }
  collisionWithWall(){
    if(this.x >= Width - this.speedX - 20 || this.x <= this.speedX + 20){
      this.x = this.x + ((this.speedX * -1)*2)
      this.speedX = this.speedX * -1;
    }
    if(this.y >= Height - this.speedY - 20|| this.y <= this.speedY + 20){
      this.y = this.y + ((this.speedY * -1)*2)
      this.speedY = this.speedY * -1;
    }
  }
  
}