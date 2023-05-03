var w;
var h;
var seed;
var worldSize = 64;
var chunkSize = 256;
var viewDist = 2;
var maxStack = 200;
var player;
var features = [];
var chunks = [];
var chunksSelected = [];
var slots = [];
var plusone = [];
var vignette;
var showVignette = false;
var displayDebug = false;
var fs = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  // frameRate(60);
  noCursor();

  w = width;
  h = height;

  // seed = floor(random(1000));
  seed = 25;
  noiseDetail(8, 0.5);
  randomSeed(seed);
  noiseSeed(seed);

  player = new Player(0, 0);

  for (let i = 0; i < worldSize; i++) {
    chunks[i] = [];
    for (let j = 0; j < worldSize; j++) {
      chunks[i].push(new Chunk(i, j));
    }
  }
  for (let i = 0; i < 8; i++) {
    slots.push(new Slot());
  }

  vignette = createImage(w, h);
  vignette.loadPixels();
  // for (let i = 0; i < w * 0.1 + 1; i++) {
  //   for (let j = 0; j < h * 0.1 + 1; j++) {
  //     let d = dist(i, j, w * 0.05, h * 0.05);
  //     vignette.set(i, j, color(0, 0, 0, d * 7));
  //   }
  // }
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let x = map(i, 0, w, -1, 1);
      let y = map(j, 0, h, -1, 1);
      let d = dist(x, y, 0, 0);
      vignette.set(i, j, color(0, 0, 0, d * 255));
    }
  }
  vignette.updatePixels();
}

//=====================================================

function draw() {
  background(82, 148, 44);
  strokeWeight(4);

  chunksSelected = [];
  chunksSelected.push(chunks[floor(player.chunk.x - 0.5)][floor(player.chunk.y - 0.5)]);
  chunksSelected.push(chunks[floor(player.chunk.x - 0.5)][floor(player.chunk.y + 0.5)]);
  chunksSelected.push(chunks[floor(player.chunk.x + 0.5)][floor(player.chunk.y - 0.5)]);
  chunksSelected.push(chunks[floor(player.chunk.x + 0.5)][floor(player.chunk.y + 0.5)]);

  for (let chunk of chunksSelected) {
    for (let feature of chunk.features) {
      player.collide(feature);
    }
  }

  player.update();

  push();
  translate(-player.position.x + w * 0.5, -player.position.y + h * 0.5);
  for (let i = -viewDist; i <= viewDist; i++) {
    for (let j = -viewDist; j <= viewDist; j++) {
      if (
        player.chunk.x + i >= 0 &&
        player.chunk.x + i < worldSize &&
        player.chunk.y + j >= 0 &&
        player.chunk.y + j < worldSize
      ) {
        chunks[player.chunk.x + i][player.chunk.y + j].generate();
        chunks[player.chunk.x + i][player.chunk.y + j].load0();
        chunks[player.chunk.x + i][player.chunk.y + j].load1();
      }
    }
  }
  pop();

  player.display();

  push();
  translate(-player.position.x + w * 0.5, -player.position.y + h * 0.5);
  for (let i = -viewDist; i <= viewDist; i++) {
    for (let j = -viewDist; j <= viewDist; j++) {
      if (
        player.chunk.x + i >= 0 &&
        player.chunk.x + i < worldSize &&
        player.chunk.y + j >= 0 &&
        player.chunk.y + j < worldSize
      ) {
        chunks[player.chunk.x + i][player.chunk.y + j].load2();
      }
    }
  }
  pop();

  for (let i = 0; i < plusone.length; i++) {
    plusone[i].show();
    if (plusone[i].t > 80) {
      plusone.splice(i, 1);
    }
  }

  if (showVignette) {
    image(vignette, 0, 0);
  }

  for (let i = 0; i < 8; i++) {
    slots[i].show(i);
  }

  noStroke();
  fill(200, 50);
  circle(mouseX, mouseY, 20);
  stroke(175, 50);
  noFill();
  circle(mouseX, mouseY, 24);

  if (displayDebug) {
    push();
    noStroke();
    fill(0, 100);
    rect(0, 0, 204, 84);
    noStroke();
    fill(255);
    textSize(15);
    text(`Position: ${nfs(-player.position.x, 0, 2)}, ${nfs(-player.position.y, 0, 2)}`, 4, 16);
    text(`Chunk: ${player.chunk.x - worldSize * 0.5}, ${player.chunk.y - worldSize * 0.5}`, 4, 32);
    text(`Velocity: ${nfs(player.velocity.x, 0, 2)}, ${nfs(player.velocity.y, 0, 2)}`, 4, 48);
    text("Time:  " + frameCount, 4, 64);
    text("FPS:  " + round(frameRate(), 1), 4, 80);
    pop();
  }

  // push();
  // translate(200, 200);
  // scale(5);
  // stroke(255);
  // strokeWeight(3);
  // noFill();
  // rect(-20, -20, 40, 40)
  // wood(0, 0, 1);
  // stone(0, 0, 1);
  // pop();
}

//=====================================================

function mousePressed() {
  player.punch();

  // for (let )
}

function keyPressed() {
  if (key == "f") {
    if (fs === false) {
      fullscreen(true);
      fs = true;
      resizeCanvas(dw, dh);
      w = dw;
      h = dh;
    } else {
      fullscreen(false);
      fs = false;
      resizeCanvas(ww, wh);
      w = ww;
      h = wh;
    }
  }

  if (key == "i") {
    displayDebug = !displayDebug;
  }
}

//=====================================================

function calculateCollision(p1, p2) {
  let d = p5.Vector.sub(p1, p2);
  return d;
}

//=====================================================

function nooverlap() {
  for (let i = trees.length - 1; i >= 0; i--) {
    // remove trees overlapping trees
    for (let j = trees.length - 1; j >= i; j--) {
      if (trees[i].intersects(trees[j]) && i != j) {
        trees.splice(j, 1);
      }
    }
    // remove rocks overlapping trees
    for (let j = rocks.length - 1; j >= 0; j--) {
      if (trees[i].intersects(rocks[j])) {
        if (trees[i].s > rocks[j].s * 0.5) {
          rocks.splice(j, 1);
        }
      }
    }
  }
  // remove rocks overlapping rocks
  for (let i = rocks.length - 1; i >= 0; i--) {
    for (let j = rocks.length - 1; j >= i; j--) {
      if (rocks[i].intersects(rocks[j]) && i != j) {
        rocks.splice(j, 1);
      }
    }
    // remove trees overlapping rocks
    for (let j = trees.length - 1; j >= 0; j--) {
      if (rocks[i].intersects(trees[j])) {
        if (rocks[i].s * 0.5 > trees[j].s) {
          trees.splice(j, 1);
        }
      }
    }
  }
}

//=====================================================

class PlusOne {
  constructor(item) {
    this.item = item;
    this.t = 0;
    this.off = p5.Vector.random2D();
    this.off.mult(10);
  }
  show() {
    push();
    translate(w * 0.5 - x + this.off.x, h * 0.5 - this.t - 30 - y + this.off.y);
    textAlign(CENTER);
    noStroke();
    fill(0, 240, 0, 80 - this.t);
    text("+1 " + this.item, x, y);
    pop();

    this.t++;
  }
}

//==================================================

function Noise(x, y, n) {
  let sum = 0;
  let maximum = 0;
  let scale = 1;
  for (let i = 0; i < n; i++) {
    scale *= 0.5;
    maximum += scale;
    sum += noise(x / scale + 65535, y / scale + 655365) * scale;
  }
  return map(sum, 0, maximum, 0, 1);
}

function colorMult(col, n) {
  return color(red(col) * n, green(col) * n, blue(col) * n);
}
