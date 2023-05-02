let punch = 0;

class Player {
  constructor(x, y) {
    this.chunk = createVector(worldSize * 0.5, worldSize * 0.5);
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.facing = createVector(1, 0);
    this.armExtensionVel = 0;
    this.armExtensionAmt = 0;
    this.punchingArm = 0;
    this.radius = 150;
  }

  collide(other) {
    // console.log(other);
    // noLoop();
    if (this.position.dist(other.position) < this.radius + other.radius) {
      console.log("BOOM");
    }
  }

  update() {
    this.velocity.set(0, 0);

    if (mouseIsPressed) {
      if (this.armExtensionAmt <= 0) {
        this.punch();
      }
    }

    if (keyIsPressed === true) {
      if (keyIsDown(87)) {
        this.velocity.y += 1;
      }
      if (keyIsDown(83)) {
        this.velocity.y += -1;
      }
      if (keyIsDown(68)) {
        this.velocity.x += -1;
      }
      if (keyIsDown(65)) {
        this.velocity.x += 1;
      }
    }

    this.velocity.setMag(4);

    this.position.add(this.velocity);

    this.chunk.set(floor(worldSize * 0.5 - this.position.x / chunkSize), floor(worldSize * 0.5 - this.position.y / chunkSize));

    if (this.position.x > worldSize * chunkSize * 0.5) {
      this.position.x -= this.position.x - worldSize * chunkSize * 0.5;
    }
    if (this.position.x < worldSize * chunkSize * -0.5) {
      this.position.x -= this.position.x + worldSize * chunkSize * 0.5;
    }
    if (this.position.y > worldSize * chunkSize * 0.5) {
      this.position.y -= this.position.y - worldSize * chunkSize * 0.5;
    }
    if (this.position.y < worldSize * chunkSize * -0.5) {
      this.position.y -= this.position.y + worldSize * chunkSize * 0.5;
    }

    this.facing.set(mouseX - width / 2, mouseY - height / 2);

    this.armExtensionAmt = max(this.armExtensionAmt + this.armExtensionVel, 0);
    this.armExtensionVel -= 0.05;

    // for (let feature of selectedChunk.features) {
      
    // }
  }

  punch() {
    this.armExtensionVel = 0.3;
    this.punchingArm = random([0, 1]);
  }

  display() {
    push();
    translate(width / 2, height / 2);
    stroke(62, 143, 163);
    fill(82, 163, 183);
    circle(0, 0, 30);

    rotate(this.facing.heading());
    stroke(154, 100, 38);
    fill(174, 120, 58);
    circle(lerp(12, 30, this.armExtensionAmt * this.punchingArm), lerp(12, 0, this.armExtensionAmt * this.punchingArm), 10);
    circle(lerp(12, 30, this.armExtensionAmt * !this.punchingArm), lerp(-12, 0, this.armExtensionAmt * !this.punchingArm), 10);
    pop();
  }
}

// function player(w, h) {
//   push();
//   stroke(62, 143, 163);
//   fill(82, 163, 183);
//   circle(w, h, 30);

//   fist = createVector(mouseX - w, mouseY - h);
//   head = createVector(mouseX - w, mouseY - h);

//   fist.normalize();
//   head.normalize();

//   translate(w, h);
//   rotate(fist.heading());
//   stroke(154, 100, 38);
//   fill(174, 120, 58);
//   circle(13, -11, 8);
//   circle(13 + 7 * sin(2 * punch), 11 - 2 * sin(2 * punch), 8);
//   circle(-2, 0, 18);
//   pop();

//   chunkx = floor(size * 0.5 - x / chunkSize);
//   chunky = floor(size * 0.5 - y / chunkSize);

//   // fist movement
//   if (mouseIsPressed === true) {
//     punch += PI / 8;

//     // punch trees and rocks
//     if (sin(2 * punch) == 1) {
//       for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {
//           if (
//             chunkx + i >= 0 &&
//             chunkx + i < size &&
//             chunky + j >= 0 &&
//             chunky + j < size
//           ) {
//             chunks[chunkx + i][chunky + j].punch(w, h, x, y);
//           }
//         }
//       }
//     }
//   } else {
//     if (sin(punch) > -0.1 && sin(punch) < 0.1) {
//       punch = 0;
//     } else {
//       punch += PI / 8;
//     }
//   }

//   for (let i = -1; i <= 1; i++) {
//     for (let j = -1; j <= 1; j++) {
//       if (
//         chunkx + i >= 0 &&
//         chunkx + i < size &&
//         chunky + j >= 0 &&
//         chunky + j < size
//       ) {
//         chunks[chunkx + i][chunky + j].collect(x, y);
//       }
//     }
//   }
// }