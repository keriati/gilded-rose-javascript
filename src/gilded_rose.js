export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const CONJURED = 'Conjured Mana Cake';
export const MAX_QUALITY = 50;
export const MIN_QUALITY = 0;
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
      Shop.ensureItemQualityBoundary(item);

      if (Shop.isNormalItem(item)) {
        Shop.reduceItemQuality(item);
      }

      if (Shop.isAgedBrieOrBackstageItem(item)) {
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

      if (Shop.isConjuredItem(item)) {
        Shop.reduceItemQuality(item);
      }

      if (Shop.isConjuredItem(item) && item.sellIn < 0) {
        Shop.reduceItemQuality(item);
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

  static isConjuredItem(item) {
    return item.name === CONJURED;
  }

  static isAgedBrieOrBackstageItem(item) {
    return Shop.isAgedBrieItem(item) || Shop.isBackstageItem(item);
  }

  static isNormalItem(item) {
    return !(Shop.isAgedBrieOrBackstageItem(item) || Shop.isSulfurasItem(item));
  }

  static reduceItemQuality(item) {
    item.quality = Math.max(MIN_QUALITY, item.quality - 1);
  }

  static riseItemQuality(item) {
    item.quality = Math.min(MAX_QUALITY, item.quality + 1);
  }

  static ensureItemQualityBoundary(item) {
    item.quality = Math.max(MIN_QUALITY, item.quality);
    item.quality = Math.min(MAX_QUALITY, item.quality);
  }
}
