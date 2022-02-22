let user1 = [];
let user2 = [];
let finalBubbles = [];
let mutualArtists = [];
let user1length;
let user2length;
let imageArray = [];
let artistBubbleArray = [];
const totalBubbles = 15;

function preload() {
  fetch("./user1.json")
    .then((response) => response.json())
    .then((data) => {
      user1 = data.items;
    });
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
            artist["belonging"] = "mutual";
            finalBubbles.push(artist);
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
          finalBubbles.push(artist);
        }
      }
      // same as above but for user 2 now
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
          finalBubbles.push(artist);
        }
      }
      console.log(finalBubbles);

      // pre load images
      for (let i = 0; i < finalBubbles.length; i++) {
        let img = loadImage(finalBubbles[i].images[0].url);
        imageArray.push(img);
      }
      console.log(imageArray);
    });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#191414");
}

let index = 0;
let counter = 0;

function draw() {
  if (finalBubbles.length == totalBubbles) {
    while (artistBubbleArray.length < finalBubbles.length) {
      let overlapping = false;
      let proposalBubble;
      if (finalBubbles[index].belonging == "mutual") {
        proposalBubble = new artistBubble(
          75,
          finalBubbles[index].belonging,
          imageArray[index]
        );
      } else if (finalBubbles[index].belonging == "user1") {
        console.log(75 - (index - mutualArtists.length) * 4);
        proposalBubble = new artistBubble(
          75 - (index - mutualArtists.length) * 4,
          finalBubbles[index].belonging,
          imageArray[index]
        );
      } else {
        console.log(75 - (index - (mutualArtists.length + user1length)) * 4);
        proposalBubble = new artistBubble(
          75 - (index - (mutualArtists.length + user1length)) * 4,
          finalBubbles[index].belonging,
          imageArray[index]
        );
      }
      for (let j = 0; j < artistBubbleArray.length; j++) {
        let existingBubble = artistBubbleArray[j];
        let d = dist(
          proposalBubble.x,
          proposalBubble.y,
          existingBubble.x,
          existingBubble.y
        );
        if (d - 10 < proposalBubble.r + existingBubble.r) {
          overlapping = true;
          break;
        }
      }

      if (!overlapping) {
        index += 1;
        artistBubbleArray.push(proposalBubble);
        proposalBubble.draw();
      }

      counter++;
      if (counter > 100000) {
        break;
      }
    }
  }
}

class artistBubble {
  constructor(
    _r,
    _belonging,
    _img
    // _name, _link
  ) {
    this.x = random(_r, width - _r);
    this.y = random(_r, height - _r);
    this.r = _r;
    this.belonging = _belonging;
    // this.name = this._name;
    this.img = _img;
    // this.link = _link;
  }
  draw() {
    if (this.belonging == "user1") {
      stroke(255, 138, 138);
    } else if (this.belonging == "user2") {
      stroke(97, 194, 236);
    } else {
      stroke(193, 130, 243);
    }
    strokeWeight(this.r / 12);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
    // let photo = this.img;
    // let maskImage = createGraphics(photo.width, photo.height);
    // maskImage.ellipse(this.x, this.y, this.r * 2);
    // photo.mask(maskImage);
    // image(photo, 300, 0, this.r * 2, this.r * 2);
  }
}
