let socket = io(); // opens and connect to socket

//listen for confirmation
socket.on("connect", () => {
  roomId = window.location.pathname;
  roomId = roomId.substring(1, roomId.length - 1);
//   emit room event with the data from address bar
  socket.emit("room", roomId);
});

// define base visuals
let visuals = "earth";
let audio = "base";


window.addEventListener("load", () => {
//   add event listeners to the buttons for selecting audio and video
  visualsButtons = document.querySelectorAll('input[name="visuals"]');
  for (let i = 0; i < visualsButtons.length; i++) {
    visualsButtons[i].addEventListener("click", (e) => {
      visuals = e.target.value;
      socket.emit("changeVisuals", e.target.value);
    });
  }
  audioButtons = document.querySelectorAll('input[name="audio"]');

  for (let i = 0; i < audioButtons.length; i++) {
    audioButtons[i].addEventListener("click", (e) => {
      audio = e.target.value;
      socket.emit("changeAudio", e.target.value);
    });
  }
//   this is in try block because some times the visuals value loads after the elements load
  try {
    document.querySelector(
      `input[name="visuals"][value=${visuals}]`
    ).checked = true;
    document.querySelector(
      `input[name="audio"][value=${audio}]`
    ).checked = true;
  } catch (err) {
    console.log(err);
  }
});
socket.on("changeVisuals", (dataVisuals) => {
  document.querySelector(
    `input[name="visuals"][value=${dataVisuals}]`
  ).checked = true;
  visuals = dataVisuals;
});
socket.on("changeAudio", (dataAudio) => {
  document.querySelector(
    `input[name="audio"][value=${dataAudio}]`
  ).checked = true;
  audio = dataAudio;
});

socket.on("roomInfo", (data) => {
  visuals = data.visuals;
  audio = data.audio;
  try {
    document.querySelector(
      `input[name="visuals"][value=${visuals}]`
    ).checked = true;
    document.querySelector(
      `input[name="audio"][value=${audio}]`
    ).checked = true;
  } catch (err) {
    console.log(err);
  }
});
socket.on("invalidRoom", () => {
  document.getElementsByTagName("body")[0].innerHTML =
    "You have entered an invalid room";
});
let clientRole;
socket.on("role", (role) => {
  console.log(role);
  clientRole = role;
});
let edmSounds = [];
let lofiSounds = [];
let orchestralSounds = [];

function preload() {
  console.log(audio, visuals);
  for (let i = 0; i < 6; i++) {
    edmSounds[i] = loadSound(`assets/sound/edm/${i}.wav`);
  }
  for (let i = 0; i < 6; i++) {
    lofiSounds[i] = loadSound(`assets/sound/lofi/${i}.wav`);
  }
  for (let i = 0; i < 6; i++) {
    orchestralSounds[i] = loadSound(`assets/sound/orchestral/${i}.wav`);
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let effects = [];
function draw() {
  background(0, 0, 0);
  if (visuals == "fire") {
    background(122, 1, 3);
  }
  if (visuals == "earth") {
    background(107, 112, 92);
  }
  if (visuals == "water") {
    background(2, 62, 138);
  }
  for (let i = effects.length - 1; i >= 0; i--) {
    effects[i].play();
//     remove effect from list if it's state becomes false -> faster code
    if (!effects[i].state) {
      effects.splice(i, 1);
    }
  }
}
socket.on("keyPressed", (data) => {
  if (visuals == "fire") {
    switch (data) {
      case 81:
        effects.push(new expandingCirle(visuals));
        break;
      case 87:
        effects.push(new dynamicBackgroundChange());
        break;
      case 69:
        effects.push(new spiral(visuals));
        break;
      case 82:
        effects.push(new expandingPolygon(4, visuals));
        break;
      case 84:
        effects.push(new expandingPolygon(5, visuals));
        break;
      case 89:
        effects.push(new multipleLines(visuals));

        break;
    }
  }
  if (visuals == "earth") {
    switch (data) {
      case 81:
        effects.push(new expandingCirle(visuals));
        break;
      case 87:
        effects.push(new fourPararellLines(visuals));
        break;
      case 69:
        effects.push(new expandingPolygon(3, visuals));
        break;
      case 82:
        effects.push(new expandingPolygon(4, visuals));
        break;
      case 84:
        effects.push(new smoothTransition(visuals));
        break;
      case 89:
        effects.push(new fourCircle(visuals));
        break;
    }
  }
  if (visuals == "water") {
    switch (data) {
      case 81:
        effects.push(new sineWave(visuals));
        break;
      case 87:
        effects.push(new multipleSineWaves(visuals));
        break;
      case 69:
        effects.push(new spiral(visuals));
        break;
      case 82:
        effects.push(new multipleLines(visuals));
        break;
      case 84:
        effects.push(new expandingPolygon(3, visuals));
        break;
      case 89:
        effects.push(new fourCircle(visuals));
        break;
    }
  }
  if (audio == "edm") {
    switch (data) {
      case 81:
        edmSounds[0].play();
        break;
      case 87:
        edmSounds[1].play();
        break;
      case 69:
        edmSounds[2].play();
        break;
      case 82:
        edmSounds[3].play();
        break;
      case 84:
        edmSounds[4].play();
        break;
      case 89:
        edmSounds[5].play();
        break;
    }
  }
  if (audio == "lofi") {
    switch (data) {
      case 81:
        lofiSounds[0].play();
        break;
      case 87:
        lofiSounds[1].play();
        break;
      case 69:
        lofiSounds[2].play();
        break;
      case 82:
        lofiSounds[3].play();
        break;
      case 84:
        lofiSounds[4].play();
        break;
      case 89:
        lofiSounds[5].play();
        break;
    }}
  if (audio == "orchestral") {
    switch (data) {
      case 81:
        orchestralSounds[0].play();
        break;
      case 87:
        orchestralSounds[1].play();
        break;
      case 69:
        orchestralSounds[2].play();
        break;
      case 82:
        orchestralSounds[3].play();
        break;
      case 84:
        orchestralSounds[4].play();
        break;
      case 89:
        orchestralSounds[5].play();
        break;
    
  }}
});

function keyPressed() {
  if (clientRole == "player") {
    socket.emit("keyPressed", keyCode);
  }
}
