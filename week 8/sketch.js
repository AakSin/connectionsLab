let spaceship1 = new Spaceship(1);
let spaceship2 = new Spaceship(2);
projectile1Array = [];
projectile2Array = [];
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
  spaceship1.draw();
  spaceship2.draw();
  spaceship1.move();
  spaceship2.move();
  if (frameCount % 30 == 0) {
    spaceship1.shoot();
    spaceship2.shoot();
  }
  for (let i = projectile1Array.length - 1; i >= 0; i--) {
    projectile1Array[i].draw();
    if (projectile1Array[i].y > height) {
      projectile1Array.splice(i, 1);
      console.log("gone");
      //   } else {
      //     // checking distance between sprite and planet
      //     if (
      //       abs(character.x - planetArray[i].x) <= character.w &&
      //       abs(character.y - planetArray[i].y) <= character.h
      //     ) {
      //       character.health -= 0.5;
      //     }
      //   }
      // }
    }
  }
  for (let i = projectile2Array.length - 1; i >= 0; i--) {
    projectile2Array[i].draw();
    if (projectile2Array[i].y < 0) {
      projectile2Array.splice(i, 1);
      console.log("gone");
    }
    //   } else {
    //     // checking distance between sprite and planet
    //     if (
    //       abs(character.x - planetArray[i].x) <= character.w &&
    //       abs(character.y - planetArray[i].y) <= character.h
    //     ) {
    //       character.health -= 0.5;
    //     }
    //   }
    // }
  }
}
