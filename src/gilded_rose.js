const ITEM_AGED_BRIE = "Aged Brie";
const ITEM_BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const ITEM_SULFURAS = "Sulfuras, Hand of Ragnaros";

const QUALITY_TRESHOLD = 50;
export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQualityIfBelowTreshold(item, increment = 1) {
    if (item.quality < QUALITY_TRESHOLD) {
      item.quality += increment;
    }
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name != ITEM_AGED_BRIE && item.name != ITEM_BACKSTAGE_PASS) {
        if (item.quality > 0) {
          if (item.name != ITEM_SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        this.updateQualityIfBelowTreshold(item);

        if (item.name == ITEM_BACKSTAGE_PASS) {
          if (item.sellIn < 11) {
            this.updateQualityIfBelowTreshold(item);
          }
          if (item.sellIn < 6) {
            this.updateQualityIfBelowTreshold(item);
          }
        }
      }
      if (item.name != ITEM_SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != ITEM_AGED_BRIE) {
          if (item.name === ITEM_BACKSTAGE_PASS) {
            item.quality = 0;
          } else {
            if (item.quality > 0) {
              if (item.name != ITEM_SULFURAS) {
                item.quality = item.quality - 1;
              }
            }
          }
        } else {
          this.updateQualityIfBelowTreshold(item);
        }
      }
    }

    return this.items;
  }
}
