import {
  modifyConcert,
  modifyNonSpecialItem,
  modifyBrie,
  decreaseSellinIfNeeded,
  decreaseQualityIfPossible,
} from "./shopUpdateUtils";

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  // we run this at the end of the day
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      decreaseSellinIfNeeded(item);

      modifyNonSpecialItem(item);

      if (item.name === "Conjured") {
        decreaseQualityIfPossible(item);
        decreaseQualityIfPossible(item);
      }

      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        modifyConcert(item);
      }

      if (item.name === "Aged Brie") {
        modifyBrie(item);
      }
    }
    return this.items;
  }
}
