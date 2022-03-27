let spaceship1 = new Spaceship(1);
let spaceship2 = new Spaceship(2);
projectile1Array = [];
projectile2Array = [];
let spaceship1HealthFull = spaceship1.health;
let spaceship2HealthFull = spaceship2.health;
let spaceship1Health;
let spaceship2Health;
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship1 = loadImage("assets/ship1.png");
  ship2 = loadImage("assets/ship2.png");
  bg = loadImage("assets/bg.jpg");
  projectile1 = loadImage("assets/projectile1.png");
  projectile2 = loadImage("assets/projectile2.png");
}

function draw() {
  background(bg);
  spaceship1Health = spaceship1.health;
  spaceship2Health = spaceship2.health;
  fill("black");
  rect(width - 50, 10, 20, spaceship1HealthFull);
  rect(
    width - 50,
    height - spaceship2HealthFull - 10,
    20,
    spaceship2HealthFull
  );
  fill("red");
  rect(width - 50, 10, 20, spaceship1Health);
  fill("white");
  rect(width - 50, height - spaceship2Health - 10, 20, spaceship2Health);
  if (frameCount % 30 == 0) {
    spaceship1.shoot();
    spaceship2.shoot();
  }
  for (let i = projectile1Array.length - 1; i >= 0; i--) {
    projectile1Array[i].draw();
    if (projectile1Array[i].y > height) {
      projectile1Array.splice(i, 1);
    } else {
      // collision detection
      if (
        projectile1Array[i].y > spaceship2.y &&
        projectile1Array[i].x > spaceship2.x &&
        projectile1Array[i].x < spaceship2.x + spaceship2.w
      ) {
        spaceship2.health -= 1;
        projectile1Array.splice(i, 1);
      }
    }
  }
  for (let i = projectile2Array.length - 1; i >= 0; i--) {
    projectile2Array[i].draw();
    if (projectile2Array[i].y < 0) {
      projectile2Array.splice(i, 1);
    } else {
      // collision detection
      if (
        projectile2Array[i].y < spaceship1.y + spaceship1.h &&
        projectile2Array[i].x > spaceship1.x &&
        projectile2Array[i].x < spaceship1.x + spaceship1.w
      ) {
        projectile2Array.splice(i, 1);
        spaceship1.health -= 1;
      }
    }
  }
  spaceship1.draw();
  spaceship2.draw();
  spaceship1.move();
  spaceship2.move();

  if (spaceship1.health < 1) {
    background("black");
    text("player 2 won", width / 2, height / 2);
  }
  if (spaceship2.health < 1) {
    background("black");
    text("player 1 won", width / 2, height / 2);
  }
}
