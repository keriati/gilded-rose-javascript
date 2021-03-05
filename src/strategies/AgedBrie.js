import { decreaseSellin, increaseQualityIfPossible } from "../shopUpdateUtils";

class AgedBrie {
  constructor() {
    this.itemName = "Aged Brie";
  }

  update(item) {
    decreaseSellin(item);

    increaseQualityIfPossible(item);

    if (item.sellIn < 0) {
      increaseQualityIfPossible(item);
    }
  }
}

export default AgedBrie;
