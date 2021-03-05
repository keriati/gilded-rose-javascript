import { decreaseSellin, increaseQualityIfPossible } from "../shopUpdateUtils";

class BackstagePass {
  constructor() {
    this.itemName = "Backstage passes to a TAFKAL80ETC concert";
  }
  update(item) {
    decreaseSellin(item);

    increaseQualityIfPossible(item);
    if (item.sellIn < 10) {
      increaseQualityIfPossible(item);
    }
    if (item.sellIn < 5) {
      increaseQualityIfPossible(item);
    }

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }
}

export default BackstagePass;
