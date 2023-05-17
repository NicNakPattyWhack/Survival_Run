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
      itemData[this.slot.item].display();
    }
  }
}