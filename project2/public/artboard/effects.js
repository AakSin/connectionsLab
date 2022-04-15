// definition of color palletes
let fireColor = [
  {
    r: 255,
    g: 173,
    b: 51,
  },
  {
    r: 255,
    g: 147,
    b: 31,
  },
  {
    r: 250,
    g: 94,
    b: 31,
  },
  {
    r: 236,
    g: 63,
    b: 19,
  },
  {
    r: 184,
    g: 23,
    b: 23,
  },
];
let waterColor = [
  {
    r: 202,
    g: 240,
    b: 248,
  },
  {
    r: 144,
    g: 224,
    b: 239,
  },
  {
    r: 72,
    g: 202,
    b: 228,
  },
  {
    r: 0,
    g: 180,
    b: 216,
  },
  {
    r: 0,
    g: 150,
    b: 199,
  },
];

let earthColor = [
  {
    r: 203,
    g: 153,
    b: 126,
  },
  {
    r: 221,
    g: 190,
    b: 169,
  },
  {
    r: 255,
    g: 232,
    b: 214,
  },
  {
    r: 183,
    g: 183,
    b: 164,
  },
  {
    r: 165,
    g: 165,
    b: 141,
  },
];

// this.state  in each class becomes false when that animation disappears from screen
// this.cnt is equivalent of frame count since that animation has been running

class expandingCirle {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.r = random(100, 200);
    this.state = true;
    this.opacity = 255;

    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    // this.weight = random(1, 3);
  }
  play() {
    // strokeWeight(this.weight);
    fill(this.color.r, this.color.g, this.color.b, this.opacity);
    noStroke();
    // stroke(3, 7, 30, this.opacity);
    circle(this.x, this.y, this.r);
    this.r += 3;
    this.opacity -= 2;
    if (this.opacity <= 0) {
      this.state = false;
    }
  }
}

class fourCircle {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.d = random(50, 100);
    this.n = 8;
    this.x = (window.innerWidth - (2 * this.n - 1) * this.d) / 2;
    this.y = random(50, height - 50);
    this.cnt = 0;
    this.opacity = 250;
    this.time = 1;
    this.state = true;
  }
  play() {
    if (this.cnt < this.n) {
      fill(this.color.r, this.color.g, this.color.b, this.opacity);
      noStroke();
      circle(this.x, this.y, this.d);
      if (this.time % 10 == 0) {
        this.x += 2 * this.d;
        this.cnt++;
        this.opacity = this.opacity - 20;
      }
      this.time++;
      if (this.opacity <= 0) {
        this.state = false;
      }
    }
  }
}

class fourPararellLines {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.i = 0;
    this.h = 100;
    this.s = 50;
    this.posx = 100;
    this.w_max = window.innerWidth - 200;
    this.n = 4;
    this.w = window.innerWidth / 8;
    this.wdif = 0;
    this.easing = 0.01;
    this.posy =
      (window.innerHeight - this.n * this.h - (this.n - 1) * this.s) / 2;
    this.opacity = 250;
    this.state = true;
  }

  play() {
    if (this.w < this.w_max) {
      for (let c = 0; c <= this.n - 1; c++) {
        noStroke();
        fill(this.color.r, this.color.g, this.color.b, this.opacity);
        rect(this.posx, this.posy + (this.h + this.s) * c, this.w, this.h);
        this.wdif = this.w_max - this.w;
        this.w = this.w + this.wdif * this.easing;
        this.i++;
        this.opacity = this.opacity - 2;
      }
    }
    if (this.opacity <= 0) {
      this.state = false;
    }
  }
}
class dynamicBackgroundChange {
  constructor() {
    this.i = 100;
    this.t = 0;
    this.cnt = 0;
    this.state = true;
  }

  play() {
    if (this.cnt < 50) {
      if (this.t < 100) {
        background(3, 7, 30, this.t);
        this.t = this.t + 10;
      }
      if (this.t == 100) {
        background(220);
        this.t = 0;
      }
    } else {
      this.state = false;
    }
    this.cnt++;
  }
}

class smoothTransition {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.y = 0;
    this.x = 0;
    this.w = window.innerWidth / 8;
    this.h = window.innerHeight;
    this.cnt = 0;
    this.state = true;
  }

  play() {
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.x, this.y, this.w, this.h);
    this.w += 55;
    this.cnt++;
    if (this.cnt > 20) {
      this.x += 35;
    }
    if (this.x > width) {
      this.state = false;
    }
  }
}

class expandingPolygon {
  constructor(n, colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.state = true;
    this.n = n;
    this.a = random(100, 200);
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    this.opacity = 255;
    // this.weight = random(1, 3);
  }
  play() {
    // strokeWeight(this.weight);
    // stroke(3, 7, 30, this.opacity);
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.opacity);
    // noFill();
    this.regularPolygon(this.x, this.y, this.n, this.a);
    this.a += 2;
    this.opacity -= 2;
    if (this.opacity <= 0) {
      this.state = false;
    }
  }
  regularPolygon(x, y, n, radius) {
    beginShape();
    for (let i = 0; i < n; i++) {
      vertex(x + cos((i * TAU) / n) * radius, y + sin((i * TAU) / n) * radius);
    }
    endShape(CLOSE);
  }
}

class sineWave {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.xspacing = 5; // Distance between each horizontal location
    this.w = window.innerWidth + 16; // Width of entire wave
    this.theta = 0.0; // Start angle at 0
    this.amplitude = 400; // Height of wave
    this.period = random(30, 100); // How many pixels before the wave repeats
    this.dx = (TWO_PI / this.period) * this.xspacing; // Value for incrementing x
    this.yvalues = new Array(floor(this.w / this.xspacing)); // Using an array to store height values for the wave
    this.cnt = 0;
    this.opacity = 255;
    this.state = true;
  }

  play() {
    // background(0);
    this.calcWave();
    this.renderWave();
    this.opacity = this.opacity - 3;
    if (this.opacity <= 0) {
      this.state = false;
    }
  }

  calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    this.theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x) * this.amplitude;
      x += this.dx;
    }
  }
  renderWave() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.opacity);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < this.yvalues.length; x++) {
      ellipse(
        x * this.xspacing,
        window.innerHeight / 2 + this.yvalues[x],
        16,
        16
      );
    }
  }
}
class multipleSineWaves {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.opacity = 255;
    this.xspacing = 1; // Distance between each horizontal location
    this.w = window.innerWidth + 16; // Width of entire wave
    this.theta = 0.0; // Start angle at 0
    this.amplitude = random(50, 200); // Height of wave
    this.period = random(250, 350); // How many pixels before the wave repeats
    this.dx = (TWO_PI / this.period) * this.xspacing; // Value for incrementing x
    this.yvalues = new Array(floor(this.w / this.xspacing)); // Using an array to store height values for the wave
    this.cnt = 0;
    this.state = true;
  }

  play() {
    this.calcWave();
    this.renderWave();
    this.cnt++;
    this.opacity -= 5;
    if (this.opacity <= 0) {
      this.state = false;
    }
  }

  calcWave() {
    // Increment theta (try different values for
    // 'angular velocity' here)
    this.theta += 0.09;

    // For every x value, calculate a y value with sine function
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x) * this.amplitude;
      x += this.dx;
    }
  }
  renderWave() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b, this.opacity);
    // A simple way to draw the wave with an ellipse at each location
    for (let x = 0; x < this.yvalues.length; x++) {
      ellipse(
        x * this.xspacing,
        window.innerHeight / 4 + this.yvalues[x],
        16,
        16
      );
      ellipse(
        x * this.xspacing,
        window.innerHeight / 2 + this.yvalues[x],
        16,
        16
      );
      ellipse(
        x * this.xspacing,
        (window.innerHeight / 4) * 3 + this.yvalues[x],
        16,
        16
      );
    }
  }
}
class spiral {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.angle = 2.0;
    this.offsetx = random(300, window.innerWidth - 300);
    this.offsety = random(300, window.innerHeight - 300);
    this.scalar = 1;
    this.speed = 7;
    this.cnt = 0;
    this.state = true;
  }

  play() {
    noStroke();
    fill(this.color.r, this.color.g, this.color.b);
    let x = this.offsetx + cos(this.angle) * this.scalar;
    let y = this.offsety + sin(this.angle) * this.scalar;
    if (this.cnt < 50) {
      ellipse(x, y, 50, 50);
    } else {
      this.state = false;
    }
    this.angle += this.speed;
    this.scalar = this.speed + 100;
    this.cnt++;
  }
}
class multipleLines {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {
      this.color = earthColor[Math.floor(Math.random() * earthColor.length)];
    } else if (colorPallete == "water") {
      this.color = waterColor[Math.floor(Math.random() * waterColor.length)];
    }
    this.opacity = 255;
    this.state = true;
  }

  play() {
    for (let n = 0; n < 30; n++) {
      stroke(this.color.r, this.color.g, this.color.b, this.opacity);
      line(
        random(0, window.innerWidth),
        0,
        random(0, window.innerHeight),
        window.innerWidth
      );
    }
    this.opacity = this.opacity - 2.5;
    if (this.opacity <= 0) {
      this.state = false;
    }
  }
}
