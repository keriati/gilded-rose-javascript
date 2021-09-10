const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES_TAFKAL80ETC = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const HIGHEST_QUALITY = 50;
const BACKSTAGE_PASSES_SELL_IN_QUALITY_TWO = 11;
const BACKSTAGE_PASSES_SELL_IN_QUALITY_THREE = 6;


export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  decreaseQuality(item) {
    --item.quality;
  }

  decreaseSellIn(item) {
    --item.sellIn;
  }

  increaseQuality(item) {
    ++item.quality;
  }

  shouldQualityIncrease(item) {
    return item.quality < HIGHEST_QUALITY;
  }

  increaseQualityIfPossible(item) {
    if (this.shouldQualityIncrease(item)) {
      this.increaseQuality(item);
    }
  }

  shouldDecreaseQuality(item) {
    return item.name != SULFURAS && item.quality > 0;
  }

  decreaseQualityIfPossible(item) {
    if (this.shouldDecreaseQuality(item)) {
      if (this.shouldDecreaseQuality(item)) {
        this.decreaseQuality(item);
      }
    }
  }

  updateQuality() {
    //
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.name != AGED_BRIE && item.name != BACKSTAGE_PASSES_TAFKAL80ETC) {
        this.decreaseQualityIfPossible(item);
      } else {
        if (this.shouldQualityIncrease(item)) {
            this.increaseQuality(item);
          if (item.name == BACKSTAGE_PASSES_TAFKAL80ETC) {
            if (item.sellIn < BACKSTAGE_PASSES_SELL_IN_QUALITY_TWO) {
              this.increaseQualityIfPossible(item);
            }
            if (item.sellIn < BACKSTAGE_PASSES_SELL_IN_QUALITY_THREE) {
              this.increaseQualityIfPossible(item);
            }
          }
        }
      }
      if (item.name != SULFURAS) {
        this.decreaseSellIn(item);
      }
      if (item.sellIn < 0) {
        if (item.name != AGED_BRIE) {
          if (item.name != BACKSTAGE_PASSES_TAFKAL80ETC) {
            this.decreaseQualityIfPossible(item);
          } else {
            item.quality = 0;
          }
        } else {
          this.increaseQualityIfPossible(item);
        }
      }
    }

    return this.items;
  }
}
