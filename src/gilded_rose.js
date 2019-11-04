const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED_CAKE = 'Conjured Mana Cake';

const DEFAULT_QUALITY_CHANGE = 1;
const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const DAY_CHANGE = 1;
const SELL_PERIOD_BREAK = 0;
const BACKSTAGE_LEVEL1 = 11;
const BACKSTAGE_LEVEL2 = 6;

export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class AgedBrieItem extends Item {
  update() {
    this.increaseQuality();
    this.decreseDay();

    if (this.isExpired()) {
      this.increaseQuality();
    }
  }

  increaseQuality() {
    if (this.quality < MAX_QUALITY) {
      this.quality += DEFAULT_QUALITY_CHANGE;
    }
  }
  
  decreaseQuality() {
    if (this.quality > MIN_QUALITY) {
      this.quality -= DEFAULT_QUALITY_CHANGE;
    }
  }

  isExpired() {
    return this.sellIn < SELL_PERIOD_BREAK;
  }

  decreseDay() {
    this.sellIn -= DAY_CHANGE;
  }
}

export class BackstagePassItem extends Item {
  update() {

    this.increaseQuality();

    if (this.sellIn < BACKSTAGE_LEVEL1) {
      this.increaseQuality();
    }

    if (this.sellIn < BACKSTAGE_LEVEL2) {
      this.increaseQuality();
    }

    this.decreseDay();

    if (this.isExpired()) {
      this.resetQualityToMin();
    }

  }

  increaseQuality() {
    if (this.quality < MAX_QUALITY) {
      this.quality += DEFAULT_QUALITY_CHANGE;
    }
  }
  
  decreaseQuality() {
    if (this.quality > MIN_QUALITY) {
      this.quality -= DEFAULT_QUALITY_CHANGE;
    }
  }

  isExpired() {
    return this.sellIn < SELL_PERIOD_BREAK;
  }

  decreseDay() {
    this.sellIn -= DAY_CHANGE;
  }

  resetQualityToMin() {
    this.quality = MIN_QUALITY;
  }
}

export class SulfurasItem extends Item {
  update() {

  }
}

export class ConjuredManaCakeItem extends Item {
  update() {

    this.decreaseQuality();
    this.decreaseQuality();

    this.decreseDay();

    if (this.isExpired()) {
      this.decreaseQuality();
      this.decreaseQuality();
    }

  }

  increaseQuality() {
    if (this.quality < MAX_QUALITY) {
      this.quality += DEFAULT_QUALITY_CHANGE;
    }
  }
  
  decreaseQuality() {
    if (this.quality > MIN_QUALITY) {
      this.quality -= DEFAULT_QUALITY_CHANGE;
    }
  }

  isExpired() {
    return this.sellIn < SELL_PERIOD_BREAK;
  }

  decreseDay() {
    this.sellIn -= DAY_CHANGE;
  }

  resetQualityToMin() {
    this.quality = MIN_QUALITY;
  }
}

export class DefaultItem extends Item {
  update() {
    this.decreaseQuality();
    this.decreseDay();

    if (this.isExpired()) {
      this.decreaseQuality();
    }
  }

  increaseQuality() {
    if (this.quality < MAX_QUALITY) {
      this.quality += DEFAULT_QUALITY_CHANGE;
    }
  }
  
  decreaseQuality() {
    if (this.quality > MIN_QUALITY) {
      this.quality -= DEFAULT_QUALITY_CHANGE;
    }
  }

  isExpired() {
    return this.sellIn < SELL_PERIOD_BREAK;
  }

  decreseDay() {
    this.sellIn -= DAY_CHANGE;
  }

}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {

    for (let item of this.items) {

      item.update();

    }

    return this.items;
  }


}
