class projectile {
  constructor(_type, _x, _y) {
    this.type = _type;

    this.y = _y;
    this.w = 20;
    this.h = 20;
    this.x = _x - this.w / 2;
  }
  draw() {
    if (this.type == 1) {
      image(projectile1, this.x, this.y, this.h, this.w);
      this.y += 2;
    } else {
      image(projectile2, this.x, this.y, this.h, this.w);
      this.y -= 2;
    }
  }
}
