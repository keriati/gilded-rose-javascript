import {
  updateBrie,
  updateBackstagePasses,
  updateNormalItem,
  updateConjured
} from "./updater";
import { isSulfuras, isBackstagePasses, isBrie, isConjured } from "./helpers";

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItemQuality);
    return this.items;
  }
}

const updateItemQuality = item => {
  const { name } = item;

  if (isSulfuras(name)) {
    return;
  }

  if (isBrie(name)) {
    return updateBrie(item);
  }

  if (isBackstagePasses(name)) {
    return updateBackstagePasses(item);
  }

  if (isConjured(name)) {
    return updateConjured(item);
  }

  return updateNormalItem(item);
};
