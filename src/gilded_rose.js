export const NAME_AGED_BRIE = 'Aged Brie';
export const NAME_SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const NAME_BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

export const CONJURED_PREFIX = 'Conjured';

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const isConjured = function(item) {
  return item.name.startsWith(CONJURED_PREFIX);
};

const updateSellIn = function(item) {
  if (item.name === NAME_SULFURAS) return;
  item.sellIn = item.sellIn - 1;
  item.sellIn = Math.max(item.sellIn, 0);
};

const updateQuality = function (item) {
  if (item.name === NAME_SULFURAS) return;

  const rate = isConjured(item) ? 2 : 1;

  if (item.name === NAME_AGED_BRIE) {
    item.quality = item.quality + 2;
  } else if (item.name === NAME_BACKSTAGE_PASSES) {
    if (item.sellIn === 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality = item.quality + 3;
    } else if (item.sellIn <= 10) {
      item.quality = item.quality + 2;
    } else {
      item.quality = item.quality + 1;
    }
  } else {
    const qualityDecrease = item.sellIn === 0 ? 2 : 1;
    item.quality = item.quality - qualityDecrease * rate;
  }
  item.quality = Math.min(item.quality, 50);
  item.quality = Math.max(item.quality, 0);
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  endOfDay() {
    this.items.forEach((item) => {
      updateSellIn(item);
      updateQuality(item);
    });
    return this.items;
  }
}
