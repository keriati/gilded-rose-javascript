export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const AGED_BRIE = 'Aged Brie';

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const increaseQuality = (item, value = 1) => {
  item.quality = Math.min(item.quality + value, MAXIMUM_QUALITY);
  return item;
};

const decreaseQuality = (item, value = 1) => {
  item.quality = Math.max(item.quality - value, MINIMUM_QUALITY);
  return item;
};

const decreaseSellIn = (item, value = 1) => {
  item.sellIn -= value;
  return item;
};

const isSulfuras = (item) => item.name === SULFURAS;
const isAgedBrie = (item) => item.name === AGED_BRIE;
const isBackstage = (item) => item.name === BACKSTAGE;
const isConjured = (item) => item.name.startsWith('Conjured');
const isNormal = (item) =>
  !isSulfuras(item) &&
  !isAgedBrie(item) &&
  !isBackstage(item) &&
  !isConjured(item);

const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;

const BACKSTAGE_THRESHOLD_1 = 11;
const BACKSTAGE_THRESHOLD_2 = 6;

const isExpired = (item) => item.sellIn < 0;

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (isSulfuras(item)) {
        continue;
      }

      if (isNormal(item)) {
        item = decreaseQuality(item);
      }

      if (isAgedBrie(item)) {
        item = increaseQuality(item);
      }

      if (isBackstage(item)) {
        item = increaseQuality(item);
        if (item.sellIn < BACKSTAGE_THRESHOLD_1) {
          item = increaseQuality(item);
        }
        if (item.sellIn < BACKSTAGE_THRESHOLD_2) {
          item = increaseQuality(item);
        }
      }

      item = decreaseSellIn(item, 1);

      if (isExpired(item)) {
        if (!isAgedBrie(item)) {
          if (!isBackstage(item)) {
            item = decreaseQuality(item);
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          item = increaseQuality(item);
        }
      }
    }

    return this.items;
  }
}
