import { MAX_QUALITY, MIN_QUALITY } from "./constants";

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
    increaseQuality(item);
    decreaseSellIn(item);
    if (isExpired(item)) {
      increaseQuality(item);
    }
    return;
  }

  if (isBackstagePasses(name)) {
    increaseQuality(item);
    if (item.sellIn < 11) {
      increaseQuality(item);
    }
    if (item.sellIn < 6) {
      increaseQuality(item);
    }

    decreaseSellIn(item);
    if (isExpired(item)) {
      setZeroQuality(item);
    }
    return;
  }

  decreaseQuality(item);

  decreaseSellIn(item);
  if (isExpired(item)) {
    decreaseQuality(item);
  }
};
const isSulfuras = name => name === "Sulfuras, Hand of Ragnaros";
const isBrie = name => name === "Aged Brie";
const isBackstagePasses = name =>
  name === "Backstage passes to a TAFKAL80ETC concert";
const increaseQuality = item => {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
};
function isExpired(item) {
  return item.sellIn < 0;
}

function decreaseSellIn(item) {
  item.sellIn = item.sellIn - 1;
}

function decreaseQuality(item) {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1;
  }
}

function setZeroQuality(item) {
  item.quality = item.quality - item.quality;
}
