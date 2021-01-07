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
const MIN_SELL_IN = 0;

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

  isLowerThanMinSellIn(sellIn) {
    return this.isLower(sellIn, MIN_SELL_IN);
  }

  isLowerThan6SellIn(sellIn) {
    return this.isLower(sellIn, SELL_IN_6);
  }

  isLowerThan11SellIn(sellIn) {
    return this.isLower(sellIn, SELL_IN_11);
  }

  increaseQualityByOne(item) {
    if (this.isLowerThanMaxQuality(item.quality)) {
      item.quality += 1;
    }
  }

  decreaseQualityByOne(item) {
    if (this.isHigherThanMinQuality(item.quality)) {
      item.quality -= 1;
    }
  }

  decreaseSellInByOne(item) {
    item.sellIn -= 1;
  }

  setQualityToMin(item) {
    item.quality = MIN_QUALITY;
  }

  increaseQualityByOneForBackstageItems(item) {
    if (this.isLowerThan11SellIn(item.sellIn)) {
      this.increaseQualityByOne(item);
    }
    if (this.isLowerThan6SellIn(item.sellIn)) {
      this.increaseQualityByOne(item);
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        this.isAgedBrieItem(this.items[i].name) ||
        this.isBackstagePassesItem(this.items[i].name)
      ) {
        this.increaseQualityByOne(this.items[i]);
        if (this.isBackstagePassesItem(this.items[i].name)) {
          this.increaseQualityByOneForBackstageItems(this.items[i]);
        }
      } else {
        if (!this.isSulfurasItem(this.items[i].name)) {
          this.decreaseQualityByOne(this.items[i]);
        }
      }

      if (!this.isSulfurasItem(this.items[i].name)) {
        this.decreaseSellInByOne(this.items[i]);
      }
      if (this.isLowerThanMinSellIn(this.items[i].sellIn)) {
        if (!this.isAgedBrieItem(this.items[i].name)) {
          if (!this.isBackstagePassesItem(this.items[i].name)) {
            if (!this.isSulfurasItem(this.items[i].name)) {
              this.decreaseQualityByOne(this.items[i]);
            }
          } else {
            this.setQualityToMin(this.items[i]);
          }
        } else {
          this.increaseQualityByOne(this.items[i]);
        }
      }
    }

    return this.items;
  }
}
