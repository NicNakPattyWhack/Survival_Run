class Item {
  constructor(type, x, y, chunkX, chunkY, v) {
    this.x = x;
    this.y = y;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.position = createVector(chunkX + this.x, chunkY + this.y);
    this.velocity = v.copy();
    this.type = type;
    this.time = 0;
  }

  update() {
    if (this.vel.mag() > 0.1) {
      this.pos.add(this.vel);
      this.vel.mult(0.9);
    }

    this.time++;
  }

  display() {
    displayItem(this.type);
  }
}

function displayItem(type) {
  switch (type) {
    case "wood": displayWoodItem(); break;
    case "stone": displayStoneItem(); break;
  }
}

function displayWoodItem() {
  const woodx = [-5, 0, 5];
  const woody = [5, -5, 5];

  push();
  for (let i = 0; i < woodx.length; i++) {
    push();
    rectMode(CENTER);
    translate(woodx[i], woody[i]);

    noStroke();
    fill(105, 70, 27);
    rect(0, 0, 14, 10);
    stroke(85, 50, 7);
    strokeWeight(3);
    arc(7, 0, 10, 10, -PI / 2, PI / 2);
    line(-7, -5, 7, -5);
    line(-7, 5, 7, 5);
    line(3, 0, 7, 0);
    fill(163, 118, 62);
    circle(-7, 0, 10);
    stroke(143, 98, 42);
    point(-7, 0);
    pop();
  }
  pop();
}

function displayStoneItem() {
  push();
  stroke(125);
  strokeWeight(3);
  fill(145);
  circle(0, 0, 20);
  noStroke();
  fill(160);
  circle(3, -3, 7);

  stroke(125);
  strokeWeight(3);
  fill(145);
  circle(8, 5, 10);
  noStroke();
  fill(160);
  circle(9, 4, 3);
  pop();
}
