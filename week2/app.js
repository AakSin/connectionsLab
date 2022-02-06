window.addEventListener("load", () => {
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play-button");
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");
  const volumeBar = document.getElementById("volume-bar");
  const volumeContainer = document.getElementById("volume-container");

  audio.volume = 0.5;
  //   Play/pause of song
  function play() {
    if (playButton.classList.contains("fa-play-circle")) {
      audio.play();
    } else {
      audio.pause();
    }
    playButton.classList.toggle("fa-play-circle");
    playButton.classList.toggle("fa-pause-circle");
  }
  playButton.addEventListener("click", play);

  audio.addEventListener("timeupdate", (e) => {
    // increase progress bar width with time
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    //   loop song if it ends
    if (audio.currentTime >= audio.duration) {
      audio.currentTime = 0;
      console.log("hello");
    }
  });

  //   update on clicking progress bar
  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.offsetWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  });
  //   increase volume bar with volume change
  audio.addEventListener("volumechange", () => {
    volumeBar.style.width = `${audio.volume * 100}%`;
  });
  // update on clicking volume bar
  volumeContainer.addEventListener("click", (e) => {
    const width = volumeContainer.offsetWidth;
    const clickX = e.offsetX;
    audio.volume = clickX / width;
  });

  //   keyboard shortcuts

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "Space":
        play();
        break;
      case "ArrowUp":
        audio.volume += 0.1;
        break;
      case "ArrowDown":
        audio.volume -= 0.1;
        break;
    }
  });
});
