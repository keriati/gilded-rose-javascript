import {
  checkIfSpecialItem,
  decreaseQualityIfPossible,
  increaseQualityIfPossible,
  modifyConcert,
} from "./shopUpdateUtils";

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  // we run this at the end of the day
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      //not special item
      if (!checkIfSpecialItem(this.items[i].name)) {
        decreaseQualityIfPossible(this.items[i]);

        this.items[i].sellIn = this.items[i].sellIn - 1;

        if (this.items[i].sellIn < 0 && this.items[i].quality > 0) {
          decreaseQualityIfPossible(this.items[i]);
        }
      } else {
        if (this.items[i].quality < 50) {
          increaseQualityIfPossible(this.items[i]);

          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            modifyConcert(this.items[i]);
          }
        }
      }

      if (
        checkIfSpecialItem(this.items[i]) &&
        this.items[i].name != "Sulfuras, Hand of Ragnaros"
      ) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (
          this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
        ) {
          modifyConcert(this.items[i]);
        }
        if (this.items[i].name === "Aged Brie") {
          increaseQualityIfPossible(this.items[i]);
        }
      }
    }

    return this.items;
  }
}
