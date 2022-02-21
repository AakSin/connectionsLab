let user1 = [];
let user2 = [];
let finalBubbles = [];
let mutualArtists = [];
let user1length;
let user2length;
let imageArray = [];
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

      for (let i = 0; i < user1.length; i++) {
        for (let j = 0; j < user2.length; j++) {
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
      user1length = Math.ceil((totalBubbles - mutualArtists.length) / 2);
      user2length = Math.floor((totalBubbles - mutualArtists.length) / 2);
      // let counter = 0;
      // let index = 0;
      // while (counter < user1length) {
      //   debugger;
      //   if (!mutualArtists.includes(user1[index])) {
      //     debugger;
      //     finalBubbles.push(user1[index]);
      //     counter += 1;
      //   }
      //   index += 1;
      // }
      // counter = 0;
      // index = 0;
      // while (counter < user2length) {
      //   debugger;
      //   if (!mutualArtists.includes(user2[index])) {
      //     debugger;
      //     finalBubbles.push(user2[index]);
      //     counter += 1;
      //   }
      //   index += 1;
      // }
      let counter = 0;
      for (let i = 0; i < user1.length; i++) {
        let occursIn = false;
        for (let j = 0; j < mutualArtists.length; j++) {
          if (user1[i].id == mutualArtists[j].id) {
            occursIn = true;
            break;
          }
        }
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

      for (let i = 0; i < finalBubbles.length; i++) {
        let img = loadImage(finalBubbles[i].images[0].url);
        imageArray.push(img);
      }
      console.log(imageArray);
    });
}

let artistBubbleArray = [];

let counterM = 0;
let counter1 = 0;
let counter2 = 0;

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
    ellipse(this.x, this.y, this.r * 2);
    // let photo = this.img;
    // let maskImage = createGraphics(photo.width, photo.height);
    // maskImage.ellipse(this.x, this.y, this.r * 2);
    // photo.mask(maskImage);
    // image(photo, 300, 0);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // let counter = 0;
  // const protection = 100000;
  // let tries = 0;

  // while (counter < 20) {
  //   let overlapping = false;
  //   r = noise(20 - counter) * 100;
  //   x = random(0 + r, width - r);
  //   y = random(0 + r, height - r);
  //   for (let i = 0; i < artistBubbleArray.length; i++) {
  //     if (
  //       dist(artistBubbleArray[i].x, artistBubbleArray[i].y, x, y) <=
  //       artistBubbleArray[i].r + r
  //     ) {
  //       overlapping = true;
  //       break;
  //     }
  //   }
  //   if (!overlapping) {
  //     artistBubbleArray.push(new artistBubble(x, y, r));
  //     artistBubbleArray[counter].draw();
  //     counter += 1;
  //   }
  //   tries += 1;
  //   if (tries > protection) {
  //     break;
  //   }
  // }
  // console.log(counter);
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
        console.log(index - mutualArtists.length);
        proposalBubble = new artistBubble(
          75 / (1 + index - mutualArtists.length),
          finalBubbles[index].belonging,
          imageArray[index]
        );
      } else {
        console.log(index - (mutualArtists.length + user1length));
        proposalBubble = new artistBubble(
          75 / (1 + index - (mutualArtists.length + user1length)),
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
        if (d < proposalBubble.r + existingBubble.r) {
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
    // console.log(mutualArtists);
    //   while (artistBubbleArray.length < mutualArtists.length) {
    //     let overlapping = false;
    //     let proposalBubble = new artistBubble(75, "mutual");
    //     for (let j = 0; j < artistBubbleArray.length; j++) {
    //       let existingBubble = artistBubbleArray[j];
    //       let d = dist(
    //         proposalBubble.x,
    //         proposalBubble.y,
    //         existingBubble.x,
    //         existingBubble.y
    //       );
    //       if (d < proposalBubble.r + existingBubble.r) {
    //         overlapping = true;
    //         break;
    //       }
    //     }

    //     if (!overlapping) {
    //       real += 1;
    //       console.log(real);
    //       artistBubbleArray.push(proposalBubble);
    //       proposalBubble.draw();
    //     }

    //     counterM++;
    //     if (counterM > 100000) {
    //       break;
    //     }
    //   }
    //   let index1 = 0;
    //   while (artistBubbleArray.length < mutualArtists.length + user1length) {
    //     let overlapping = false;
    //     let proposalBubble = new artistBubble(75 - index1 * 10, "user1");
    //     for (let j = 0; j < artistBubbleArray.length; j++) {
    //       let existingBubble = artistBubbleArray[j];
    //       let d = dist(
    //         proposalBubble.x,
    //         proposalBubble.y,
    //         existingBubble.x,
    //         existingBubble.y
    //       );
    //       if (d < proposalBubble.r + existingBubble.r) {
    //         overlapping = true;
    //         break;
    //       }
    //     }

    //     if (!overlapping) {
    //       index1 += 1;

    //       artistBubbleArray.push(proposalBubble);
    //       proposalBubble.draw();
    //     }

    //     counter1++;
    //     if (counter1 > 100000) {
    //       break;
    //     }
    //   }
    // }
    // let index2 = 0;
    // while (
    //   artistBubbleArray.length <
    //   mutualArtists.length + user1length + user2length
    // ) {
    //   let overlapping = false;
    //   let proposalBubble = new artistBubble(75 - index2 * 10, "user2");
    //   for (let j = 0; j < artistBubbleArray.length; j++) {
    //     let existingBubble = artistBubbleArray[j];
    //     let d = dist(
    //       proposalBubble.x,
    //       proposalBubble.y,
    //       existingBubble.x,
    //       existingBubble.y
    //     );
    //     if (d < proposalBubble.r + existingBubble.r) {
    //       overlapping = true;
    //       break;
    //     }
    //   }

    //   if (!overlapping) {
    //     index2 += 1;

    //     artistBubbleArray.push(proposalBubble);
    //     proposalBubble.draw();
    //   }

    //   counter2++;
    //   if (counter2 > 100000) {
    //     break;
    //   }
  }
}
