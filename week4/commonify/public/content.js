// setup
let user1 = [];
let user2 = [];
let mutualArtists = [];
let user1length;
let user2length;
let finalArtists = [];
let imageArray = [];
let artistBubblesArray = [];
const totalBubbles = 20;

// flags
let dataFetched = false;
let imagesCreated = false;
let bubblesCreated = false;

// fetches
fetch("./user1.json")
  .then((response) => response.json())
  .then((data) => {
    user1 = data.items;

    fetch("./user2.json")
      .then((response) => response.json())
      .then((data) => {
        user2 = data.items;

        // loop for finding mutual artists among 2 users
        for (let i = 0; i < user1.length; i++) {
          for (let j = 0; j < user2.length; j++) {
            // if it reaches total number of bubbles then break
            if (mutualArtists.length == totalBubbles) {
              break;
            }
            if (user1[i].id == user2[j].id) {
              mutualArtists.push(user1[i]);
              artist = user1[i];
              // belonging basically means which category of bubble is it - mutual, user A or user B
              artist["belonging"] = "mutual";
              finalArtists.push(artist);
            }
          }
        }

        // split the remaining bubbles in 2 for the users
        user1length = Math.ceil((totalBubbles - mutualArtists.length) / 2);
        user2length = Math.floor((totalBubbles - mutualArtists.length) / 2);

        let counter = 0;
        for (let i = 0; i < user1.length; i++) {
          let occursIn = false;
          // if artist is already in mutual break
          for (let j = 0; j < mutualArtists.length; j++) {
            if (user1[i].id == mutualArtists[j].id) {
              occursIn = true;
              break;
            }
          }
          // break it when it reaches the required length
          if (counter == user1length) {
            break;
          }
          if (!occursIn) {
            counter += 1;
            artist = user1[i];
            artist["belonging"] = "user1";
            finalArtists.push(artist);
          }
        }
        // same as above but for user 2 now [TODO: turn this into a function]
        counter = 0;
        for (let i = 0; i < user2.length; i++) {
          let occursIn = false;
          for (let j = 0; j < mutualArtists.length; j++) {
            if (user2[i].id == mutualArtists[j].id) {
              occursIn = true;
              break;
            }
          }
          if (counter == user2length) {
            break;
          }
          if (!occursIn) {
            counter += 1;
            artist = user2[i];
            artist["belonging"] = "user2";
            finalArtists.push(artist);
          }
        }

        const mutualP = document.getElementById("legend-ul");
        mutualP.innerHTML = `<li class="legend-li" id="user1-li">${user1length} User A</li>
          <li class="legend-li" id="user2-li">${user2length} User B</li>
          <li class="legend-li" id="mutual-li">${mutualArtists.length} Common</li>`;
        dataFetched = true;
      });
  });

function preload() {
  font = loadFont("./assets/Montserrat-SemiBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let index = 0;
let counter = 0;

function draw() {
  background("#191414");
  if (dataFetched) {
    // pre load images
    for (let i = 0; i < finalArtists.length; i++) {
      let img = loadImage(finalArtists[i].images[0].url);
      imageArray.push(img);
    }
    dataFetched = false;
    imagesCreated = true;
  }
  if (imagesCreated) {
    // bubble packing algo
    while (artistBubblesArray.length < finalArtists.length) {
      let overlapping = false;
      let radius;
      if (finalArtists[index].belonging == "mutual") {
        radius = 75;
      } else if (finalArtists[index].belonging == "user1") {
        radius = 75 - (index - mutualArtists.length) * 4;
      } else {
        radius = 75 - (index - (mutualArtists.length + user1length)) * 4;
      }
      let proposalBubble = new artistBubble(
        radius,
        finalArtists[index].belonging,
        imageArray[index],
        finalArtists[index].name,
        finalArtists[index].external_urls.spotify
      );
      for (let j = 0; j < artistBubblesArray.length; j++) {
        let existingBubble = artistBubblesArray[j];
        let d = dist(
          proposalBubble.x,
          proposalBubble.y,
          existingBubble.x,
          existingBubble.y
        );
        // if the distance between the bubbles + stroke is less than their readius then discard this proposal bubble
        if (d - 20 < proposalBubble.r + existingBubble.r) {
          overlapping = true;
          break;
        }
      }
      //  if proposal bubble didn't overlap with any previous bubbles then include it in the tally
      if (!overlapping) {
        index += 1;
        artistBubblesArray.push(proposalBubble);
      }
      // this 200000 is an arbitrary protection number, basically if we don't get a bubble after 100000 tries then just skip this
      counter++;
      if (counter > 20000) {
        break;
      }
    }
    imagesCreated = false;
    bubblesCreated = true;
  }
  if (bubblesCreated) {
    for (let i = 0; i < artistBubblesArray.length; i++) {
      artistBubblesArray[i].draw();
      artistBubblesArray[i].hover();
    }
  }
}

class artistBubble {
  constructor(_r, _belonging, _img, _name, _link) {
    this.x = random(_r + 10, width - _r - 10);
    this.y = random(_r + 10, height - _r - 10);
    this.r = _r;
    this.belonging = _belonging;
    this.img = _img;
    this.name = _name;
    this.link = _link;
    this.label = new Label(_name);
  }
  draw() {
    // outline circle color depending on belonging
    if (this.belonging == "user1") {
      fill(255, 138, 138);
    } else if (this.belonging == "user2") {
      fill(97, 194, 236);
    } else {
      fill(193, 130, 243);
    }
    circle(this.x, this.y, this.r * 2 + 10);
    // masking processs
    let circleMask = createGraphics(this.r * 2, this.r * 2);
    circleMask.fill("rgba(0,0,0,1)");
    circleMask.circle(this.r, this.r, this.r * 2);
    let artistImg = this.img;
    artistImg.mask(circleMask);
    image(artistImg, this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
  }
  hover() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.r) {
      cursor(HAND);
      // draw a label at mouse position
      this.label.draw(mouseX, mouseY);
    }
  }
  click() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.r) {
      window.open(this.link);
    }
  }
}
class Label {
  constructor(_name) {
    (this.name = _name),
      // fsize is fontSize
      (this.fSize = 30);
  }
  draw(_x, _y) {
    let x = _x - 10;
    let y = _y - 10;
    // procedures for drawing box + text for label
    let bbox = font.textBounds(this.name, 0, 0, this.fSize);
    noStroke();
    fill(0, 0, 0, (255 * 3) / 4);
    rect(x, y, bbox.w, bbox.h, 5);
    fill("white");
    textSize(this.fSize / 2);
    textFont(font);
    text(this.name, x + bbox.w / 4, y + (bbox.h * 3) / 4);
  }
}

function mousePressed() {
  for (let i = 0; i < artistBubblesArray.length; i++) {
    artistBubblesArray[i].click();
  }
}
