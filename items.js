class Item {
  constructor(type, x, y, chunkX, chunkY, v) {
    this.x = x;
    this.y = y;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.position = createVector(chunkX + x, chunkY + y);
    this.velocity = v.copy();
    this.data = itemData[type];
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
    push();
    translate(this.position);
    this.data.display();
    pop();
  }
}

function displayItem(type) {
  switch (type) {
    case "wood": displayWoodItem(); break;
    case "stone": displayStoneItem(); break;
  }
}