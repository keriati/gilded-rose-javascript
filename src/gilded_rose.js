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

export class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {

    for (let item of this.items) {
      if (!this.isAgedBrie(item) && !this.isBackstagePass(item)) {

        if (!this.isSulfuras(item)) {
          this.decreaseQuality(item);

          if (this.isConjuredCake(item)) {
            this.decreaseQuality(item);
          }
        }

      } else {

        this.increaseQuality(item);

        if (this.isBackstagePass(item)) {
          if (item.sellIn < BACKSTAGE_LEVEL1) {
            this.increaseQuality(item);
          }
          if (item.sellIn < BACKSTAGE_LEVEL2) {
            this.increaseQuality(item);
          }
        }

      }

      if (!this.isSulfuras(item)) {
        this.decreseDay(item);
      }

      if (item.sellIn < SELL_PERIOD_BREAK) {
        if (!this.isAgedBrie(item)) {
          if (!this.isBackstagePass(item)) {

            if (!this.isSulfuras(item)) {
              this.decreaseQuality(item);

              if (this.isConjuredCake(item)) {
                this.decreaseQuality(item);
              }
            }

          } else {
            this.resetQualityToMin(item);
          }
        } else {
          this.increaseQuality(item);
        }
      }
    }

    return this.items;
  }

  increaseQuality(item) {
    if (item.quality < MAX_QUALITY) {
      item.quality += DEFAULT_QUALITY_CHANGE;
    }
  }
  
  decreaseQuality(item) {
    if (item.quality > MIN_QUALITY) {
      item.quality -= DEFAULT_QUALITY_CHANGE;
    }
  }

  resetQualityToMin(item) {
      item.quality = MIN_QUALITY;
  }

  isAgedBrie(item) {
    return item.name === AGED_BRIE;
  }

  isSulfuras(item) {
    return item.name === SULFURAS; 
  }

  isConjuredCake(item) {
    return item.name === CONJURED_CAKE; 
  }

  isBackstagePass(item) {
    return item.name === BACKSTAGE_PASS;
  }

  decreseDay(item) {
    item.sellIn -= DAY_CHANGE;
  }
}
