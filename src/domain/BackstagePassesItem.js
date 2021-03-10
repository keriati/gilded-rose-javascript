import { Item } from "./Item";

export const BACKSTAGE_PASSES_ITEM_NAME =
  "Backstage passes to a TAFKAL80ETC concert";

export class BackstagePassesItem extends Item {
  constructor(sellIn, quality) {
    super(BACKSTAGE_PASSES_ITEM_NAME, sellIn, quality);
  }
}
