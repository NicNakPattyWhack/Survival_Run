class Backpack {
  constructor(count) {
    this.slots = [];
    for (let i = 0; i < count; i++) {
      this.slots.push({ item: null, count: null });
    }
  }

  addItem(item) {
    for (let slot of this.slot) {
      if (this.slot.item == null) {
        this.slot.item = item;
        return true;
      }
    }

    return false;
  }

  display() {
    for (let slot of this.slots) {
      switch (slot.item) {
        case "wood" : displayWoodItem();
        case "stone" : displayStoneItem();
      }
    }
  }
}
class Slot {
  constructor() {
    this.item = 0;
    this.count = 0;
  }

  show(x) {
    push();
    rectMode(CENTER);
    textAlign(CENTER);

    translate(width / 2 - 161 + 46 * x, height - 23);
    stroke(44, 120);
    strokeWeight(3);
    noFill();
    rect(0, 0, 43, 43);
    noStroke();
    fill(64, 120);
    rect(0, 0, 40, 40);

    if (this.item === "wood") {
      wood(0, 0, 1);
    }
    if (this.item === "stone") {
      stone(0, 0, 1);
    }

    if (this.count > 0) {
      noStroke();
      fill(200);
      textSize(12);
      text(this.count, 8, 14);
    }
    pop();
  }
}
