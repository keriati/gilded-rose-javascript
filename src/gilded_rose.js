export const BackstagePasses = "Backstage passes to a TAFKAL80ETC concert";
export const AgedBrie = "Aged Brie";
export const Sulfuras = "Sulfuras, Hand of Ragnaros";

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
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === Sulfuras) {
        return this.items;
      }

      if (item.name != AgedBrie && item.name != BackstagePasses) {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == BackstagePasses) {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name != AgedBrie) {
          if (item.name != BackstagePasses) {
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
    });

    return this.items;
  }
}
