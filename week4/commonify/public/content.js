function preload() {
  async function populateData(filePath, userNumber) {
    let response = await fetch(filePath);
    response = response.json();

    response.then((data) => {
      for (let i = 0; i < data.items.length; i++) {
        // create elements
        const userDiv = document.getElementById(userNumber);
        const listItem = document.createElement("li");
        const name = document.createElement("p");
        const image = document.createElement("img");
        const imageArray = data.items[i].images;

        // add data to elements
        name.textContent = data.items[i].name;
        image.src = imageArray[imageArray.length - 1].url;

        // append elements
        userDiv.appendChild(listItem);
        listItem.appendChild(name);
        listItem.appendChild(image);
      }
    });
  }

  populateData("user1.json", "user1");
  populateData("user2.json", "user2");
}
let artistBubbleArray = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  let counter = 0;
  const protection = 100000;
  let tries = 0;

  while (counter < 20) {
    let overlapping = false;
    r = noise(20 - counter) * 100;
    x = random(0 + r, width - r);
    y = random(0 + r, height - r);
    for (let i = 0; i < artistBubbleArray.length; i++) {
      if (
        dist(artistBubbleArray[i].x, artistBubbleArray[i].y, x, y) <=
        artistBubbleArray[i].r + r
      ) {
        overlapping = true;
        break;
      }
    }
    if (!overlapping) {
      artistBubbleArray.push(new artistBubble(x, y, r));
      artistBubbleArray[counter].draw();
      counter += 1;
    }
    tries += 1;
    if (tries > protection) {
      break;
    }
  }
  console.log(counter);
}

function draw() {}

class artistBubble {
  constructor(_x, _y, _r, _id, _name, _img, _link) {
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.id = _id;
    this.name = this._name;
    this.img = _img;
    this.link = _link;
  }
  draw() {
    ellipse(this.x, this.y, this.r);
  }
}
