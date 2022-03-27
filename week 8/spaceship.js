class Spaceship {
  constructor(_type) {
    this.type = _type;
    this.x = 10;
    this.w = 100;
    this.h = 100;
    this.y = 50;
    this.health = 5;
  }
  draw() {
    if (this.type == 1) {
      image(ship1, this.x, this.y, this.w, this.h);
    } else {
      this.y = height - this.h - 50;
      image(ship2, this.x, this.y, this.w, this.h);
    }
  }

  move() {
    if (this.type == 1) {
      if (-this.w / 2 < this.x && this.x < width - this.w / 2) {
        if (keyIsDown(LEFT_ARROW)) {
          this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          this.x += 5;
        }
      } else {
        if (this.x < -this.w / 2) {
          this.x = width - this.w / 2 - 1;
        } else {
          this.x = -this.w / 2 + 1;
        }
      }
    } else {
      if (-this.w / 2 < this.x && this.x < width - this.w / 2) {
        if (keyIsDown(65)) {
          this.x -= 5;
        }
        if (keyIsDown(68)) {
          this.x += 5;
        }
      } else {
        if (this.x < -this.w / 2) {
          this.x = width - this.w / 2 - 1;
        } else {
          this.x = -this.w / 2 + 1;
        }
      }
    }
  }
  shoot() {
    if (this.type == 1) {
      if (keyIsDown(32)) {
        projectile1Array.push(
          new projectile(1, this.x + this.w / 2, this.y + this.h)
        );
      }
    } else {
      if (keyIsDown(16)) {
        projectile2Array.push(new projectile(2, this.x + this.w / 2, this.y));
      }
    }
  }
}
