class BassistCam extends Cam {
  constructor(video,p5l) {
    super(video);
    this.p5l = p5l;
    
    this.height = height;
    this.width = (width * 2) / 3;
    // this.video.size(this.height, this.width);

    this.poseNet = ml5.poseNet(video, () => {
      console.log("model ready");
    });

    this.pose;
    this.poseNet.on("pose", (poses) => {
      if (poses.length > 0) {
        this.pose = poses[0].pose;
      }
    });
    this.oldLWrist = { x: 0, y: 0 };
    this.oldRWrist = { x: 0, y: 0 };
    this.newLWrist = { x: 0, y: 0 };
    this.newRWrist = { x: 0, y: 0 };
    this.widthMultiplier;
    this.heightMultiplier;
  }

  draw(x, y) {
    this.widthMultiplier = (width * 2) / 3 / this.video.width;
    this.heightMultiplier = height / this.video.height;
    push();
    // move image by the width of image to the left
    translate(this.width, 0);
    // then scale it by -1 in the x-axis
    // to flip the image
    scale(-1 * this.widthMultiplier, 1 * this.heightMultiplier);
    image(this.video, x, y);
    // image(this.video, x, y);

    if (this.pose) {
      if (this.pose.leftWrist.confidence > 0.1) {
        this.oldLWrist.x = this.newLWrist.x;
        this.oldLWrist.y = this.newLWrist.y;

        // console.log(this.pose.leftWrist.confidence);
        this.newLWrist.x = this.pose.leftWrist.x;
        this.newLWrist.y = this.pose.leftWrist.y;
        // console.log(abs(this.newLWrist.y - this.oldLWrist.y));
        ellipse(this.newLWrist.x, this.newLWrist.y, 10, 10);

        // console.log(this.newLWrist.y - this.oldLWrist.y);
        if (this.oldLWrist.x - this.newLWrist.x > 100) {
          this.playSound(this.newLWrist.y);
        }
      }
      if (this.pose.rightWrist.confidence > 0.1) {
        this.oldRWrist.x = this.newRWrist.x;
        this.oldRWrist.y = this.newRWrist.y;

        // console.log(this.pose.rightWrist.confidence);
        this.newRWrist.x = this.pose.rightWrist.x;
        this.newRWrist.y = this.pose.rightWrist.y;
        // console.log(abs(this.newLWrist.y - this.oldLWrist.y));
        ellipse(this.newRWrist.x, this.newRWrist.y, 10, 10);

        if (this.newRWrist.x - this.oldRWrist.x > 100) {
          this.playSound(this.newRWrist.y);
        }
      }
    }

    pop();
  }

  playSound(yValue) {
    if (yValue < (this.video.height / 5) * 1) {
      print("bass1");
      bass1.play();
      this.p5l.send(JSON.stringify("bass1"));
    } else if (yValue < (this.video.height / 5) * 2) {
      print("bass2");

      bass2.play();
      this.p5l.send(JSON.stringify("bass2"));
    } else if (yValue < (this.video.height / 5) * 3) {
      print("bass3");

      bass3.play();
      this.p5l.send(JSON.stringify("bass3"));
    } else if (yValue < (this.video.height / 5) * 4) {
      print("bass4");

      bass4.play();
      this.p5l.send(JSON.stringify("bass4"));
    } else if (yValue < (this.video.height / 5) * 5) {
      print("bass5");

      bass5.play();
      this.p5l.send(JSON.stringify("bass5"));
    }
  }
}
