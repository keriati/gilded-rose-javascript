import { Item } from "./Item";

export const NORMAL_ITEM_NAME = "NormalItem";

export class NormalItem extends Item {
  constructor(sellIn, quality) {
    super(NORMAL_ITEM_NAME, sellIn, quality);
  }
}
