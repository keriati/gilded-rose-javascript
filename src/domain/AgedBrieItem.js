import { Item } from "./Item";
import { BackstagePassesItem } from "./BackstagePassesItem";

export const AGED_BRIE_ITEM_NAME = "Aged Brie";

export class AgedBrieItem extends Item {
  constructor(sellIn, quality) {
    super(AGED_BRIE_ITEM_NAME, sellIn, quality);
  }

  calculateSellIn() {
    this.sellIn--;
  }

  calculateQuality() {
    if (this.quality < 50) {
      this.quality++;
    }

    if (this.sellIn < 0) {
      if (this.quality < 50) {
        this.quality++;
      }
    }
  }
}
