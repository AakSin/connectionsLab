class Spaceship {
  constructor(_type) {
    this.type = _type;
    this.x = 10;
    this.w = 100;
    this.h = 100;
    this.y = 50;
    this.health = 100;
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
          socket.emit("ship1pos", this.x);
          this.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          socket.emit("ship1pos", this.x);
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
          socket.emit("ship2pos", this.x);
          this.x -= 5;
        }
        if (keyIsDown(68)) {
          socket.emit("ship2pos", this.x);
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
        socket.emit("ship1shoot", {
          x: this.x,
          w: this.w,
          y: this.y,
          h: this.h,
        });
        projectile1Array.push(
          new projectile(1, this.x + this.w / 2, this.y + this.h)
        );
      }
    } else {
      if (keyIsDown(16)) {
        socket.emit("ship2shoot", {
          x: this.x,
          w: this.w,
          y: this.y,
        });
        projectile2Array.push(new projectile(2, this.x + this.w / 2, this.y));
      }
    }
  }
}
