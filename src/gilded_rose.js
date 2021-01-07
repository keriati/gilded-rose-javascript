export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE_ITEM = "Aged Brie";
const BACKSTAGE_PASSES_ITEM = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS_ITEM = "Sulfuras, Hand of Ragnaros";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const SELL_IN_11 = 11;
const SELL_IN_6 = 6;

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  equalsTo(a, b) {
    return a === b;
  }

  isHigher(a, b) {
    return a > b;
  }

  isLower(a, b) {
    return a < b;
  }

  isAgedBrieItem(itemName) {
    return this.equalsTo(itemName, AGED_BRIE_ITEM);
  }

  isBackstagePassesItem(itemName) {
    return this.equalsTo(itemName, BACKSTAGE_PASSES_ITEM);
  }

  isSulfurasItem(itemName) {
    return this.equalsTo(itemName, SULFURAS_ITEM);
  }

  isHigherThanMinQuality(quality) {
    return this.isHigher(quality, MIN_QUALITY);
  }

  isLowerThanMaxQuality(quality) {
    return this.isLower(quality, MAX_QUALITY);
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        !this.isAgedBrieItem(this.items[i].name) &&
        !this.isBackstagePassesItem(this.items[i].name)
      ) {
        if (this.isHigherThanMinQuality(this.items[i].quality)) {
          if (!this.isSulfurasItem(this.items[i].name)) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.isLowerThanMaxQuality(this.items[i].quality)) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.isBackstagePassesItem(this.items[i].name)) {
            if (this.items[i].sellIn < SELL_IN_11) {
              if (this.isLowerThanMaxQuality(this.items[i].quality)) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < SELL_IN_6) {
              if (this.isLowerThanMaxQuality(this.items[i].quality)) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (!this.isSulfurasItem(this.items[i].name)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < MIN_QUALITY) {
        if (!this.isAgedBrieItem(this.items[i].name)) {
          if (!this.isBackstagePassesItem(this.items[i].name)) {
            if (this.isHigherThanMinQuality(this.items[i].quality)) {
              if (!this.isSulfurasItem(this.items[i].name)) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.isLowerThanMaxQuality(this.items[i].quality)) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
