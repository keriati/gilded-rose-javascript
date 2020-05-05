// for more cleaner way, I would seperate two classes to two files

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURA = 'Sulfuras, Hand of Ragnaros';

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  // there are a lot of if/else, maybe use switch statement?

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name === SULFURA) {
        continue;
      }

      if (item.name === AGED_BRIE || item.name === BACKSTAGE_PASSES) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == BACKSTAGE_PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if ((item.sellIn < 6) & (item.quality < 50)) {
              item.quality = item.quality + 1;
            }
          }
        }
      } else {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name != AGED_BRIE) {
          if (item.name != BACKSTAGE_PASSES) {
            if (item.quality > 0) {
              item.quality = item.quality - 1;
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
