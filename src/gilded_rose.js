export const BackstagePasses = "Backstage passes to a TAFKAL80ETC concert";
export const AgedBrie = "Aged Brie";
export const Sulfuras = "Sulfuras, Hand of Ragnaros";

const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function decreaseItemQualityByOne(item) {
  if (item.quality > MIN_ITEM_QUALITY) {
    return (item.quality = item.quality - 1);
  }
  return item.quality;
}

function increaseIteemQualityByOne(item) {
  if (item.quality < MAX_ITEM_QUALITY) {
    return (item.quality = item.quality + 1);
  }

  return item.quality;
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
        decreaseItemQualityByOne(item);
      } else {
        increaseIteemQualityByOne(item);
        if (item.name == BackstagePasses) {
          if (item.sellIn < 11) {
            increaseIteemQualityByOne(item);
          }
          if (item.sellIn < 6) {
            increaseIteemQualityByOne(item);
          }
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < MIN_ITEM_QUALITY) {
        if (item.name != AgedBrie) {
          item.name != BackstagePasses
            ? decreaseItemQualityByOne(item)
            : (item.quality = MIN_ITEM_QUALITY);
        } else {
          increaseIteemQualityByOne(item);
        }
      }
    });

    return this.items;
  }
}
