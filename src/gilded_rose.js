const AGED_BRIE = "Aged Brie";
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const DOUBLE_DECREMENT_LIMIT = 0;
const BACKSTAGE_DOUBLE_INCREMENT_LIMIT = 11;
const BACKSTAGE_TRIPLE_INCREMENT_LIMIT = 6;

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  isAgedBrie() {
    return this.name === AGED_BRIE;
  }

  isBackstagePass() {
    return this.name === BACKSTAGE;
  }

  isSulfuras() {
    return this.name === SULFURAS;
  }

  incrementQuality() {
    if (this.quality < MAX_QUALITY) {
      this.quality++;
    }
  }

  decrementQuality() {
    if (this.quality > MIN_QUALITY) {
      this.quality--;
    }
  }

  progressSellin() {
    this.sellIn--;
  }

  zeroQuality() {
    this.quality = 0;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const notBrieOrBackstage = !item.isAgedBrie() && !item.isBackstagePass();

      if (notBrieOrBackstage && !item.isSulfuras()) {
        //default decrement
        item.decrementQuality();
      }
      if (!notBrieOrBackstage) {
        // backstage + agedbrie increment
        item.incrementQuality();

        // backstage day specific increment
        if (item.isBackstagePass()) {
          if (item.sellIn < BACKSTAGE_DOUBLE_INCREMENT_LIMIT) {
            item.incrementQuality();
          }
          if (item.sellIn < BACKSTAGE_TRIPLE_INCREMENT_LIMIT) {
            item.incrementQuality();
          }
        }
      }

      // sellin progress
      if (!item.isSulfuras()) {
        item.progressSellin();
      }

      if (item.sellIn < DOUBLE_DECREMENT_LIMIT) {
        if (!item.isAgedBrie()) {
          if (!item.isBackstagePass()) {
            if (item.quality > MIN_QUALITY) {
              if (!item.isSulfuras()) {
                // default item, double decrement.
                item.decrementQuality();
              }
            }
          } else {
            // backstage zero out
            item.zeroQuality();
          }
        } else {
          // brie double increment
          item.incrementQuality();
        }
      }
    });

    return this.items;
  }
}
