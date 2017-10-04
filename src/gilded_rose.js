const AGED_BRIE = 'Aged Brie';
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const FIVE_DAYS = 5;
const TEN_DAYS = 10;

export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (Shop.isNormalItem(item)) {
        Shop.reduceItemQuality(item);
      }

      if (Shop.isSpecialItem(item)) {
        Shop.riseItemQuality(item);
      }

      if (Shop.isBackstageItem(item) && item.sellIn <= TEN_DAYS) {
        Shop.riseItemQuality(item);
      }

      if (Shop.isBackstageItem(item) && item.sellIn <= FIVE_DAYS) {
        Shop.riseItemQuality(item);
      }

      if (!Shop.isSulfurasItem(item)) {
        item.sellIn--;
      }

      if (Shop.isNormalItem(item) && item.sellIn < 0) {
        Shop.reduceItemQuality(item);
      }

      if (!Shop.isNormalItem(item) && item.sellIn < 0) {
        item.quality = MIN_QUALITY;
      }
    }

    return this.items;
  }

  static isSulfurasItem(item) {
    return item.name === SULFURAS;
  }

  static isAgedBrieItem(item) {
    return item.name === AGED_BRIE;
  }

  static isBackstageItem(item) {
    return item.name === BACKSTAGE;
  }

  static isSpecialItem(item) {
    return Shop.isAgedBrieItem(item) || Shop.isBackstageItem(item);
  }

  static isNormalItem(item) {
    return !(Shop.isSpecialItem(item) || Shop.isSulfurasItem(item));
  }

  static reduceItemQuality(item) {
    if (item.quality > MIN_QUALITY) {
      item.quality--;
    }
  }

  static riseItemQuality(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality++;
    }
  }
}
