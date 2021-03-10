import { Item } from "./Item";

export const SULFURAS_ITEM_NAME = "Sulfuras, Hand of Ragnaros";
export const SULFURAS_QUALITY = 80;

export class SulfurasItem extends Item {
  constructor(sellIn) {
    super(SULFURAS_ITEM_NAME, sellIn, SULFURAS_QUALITY);
  }

  onEndOfTheDay() {
    // as special item, it does nothing
  }
}
