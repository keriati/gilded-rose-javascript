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
  item.quality += value;
  return item;
};

const decreaseQuality = (item, value = 1) => {
  item.quality -= value;
  return item;
};

const decreaseSellIn = (item, value = 1) => {
  item.sellIn -= value;
  return item;
};

const isSulfuras = (item) => item.name === SULFURAS;
const isAgedBrie = (item) => item.name === AGED_BRIE;
const isBackstage = (item) => item.name === BACKSTAGE;

const MAXIMUM_QUALITY = 50;

const isNotDegraded = (item) => item.quality < MAXIMUM_QUALITY;

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      if (!isAgedBrie(item) && !isBackstage(item)) {
        if (item.quality > 0) {
          if (!isSulfuras(item)) {
            item = decreaseQuality(item);
          }
        }
      } else {
        if (isNotDegraded(item)) {
          item = increaseQuality(item);
          if (isBackstage(item)) {
            if (item.sellIn < 11) {
              if (isNotDegraded(item)) {
                item = increaseQuality(item);
              }
            }
            if (item.sellIn < 6) {
              if (isNotDegraded(item)) {
                item = increaseQuality(item);
              }
            }
          }
        }
      }
      if (!isSulfuras(item)) {
        item = decreaseSellIn(item, 1);
      }
      if (item.sellIn < 0) {
        if (!isAgedBrie(item)) {
          if (!isBackstage(item)) {
            if (item.quality > 0) {
              if (!isSulfuras(item)) {
                item = decreaseQuality(item);
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (isNotDegraded(item)) {
            item = increaseQuality(item);
          }
        }
      }
    }

    return this.items;
  }
}
