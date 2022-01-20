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

function increaseItemQualityByOne(item) {
  if (item.quality < MAX_ITEM_QUALITY) {
    return (item.quality = item.quality + 1);
  }

  return item.quality;
}

function decreaseItemSellInByOne(item) {
  return item.sellIn--;
}

const itemOption = {
  name: "Whatever",
  rules: [],
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.name === Sulfuras) {
        return;
      }

      if (item.name === AgedBrie) {
        increaseItemQualityByOne(item);
        decreaseItemSellInByOne(item);
        if (item.sellIn < MIN_ITEM_QUALITY) {
          increaseItemQualityByOne(item);
        }
        return;
      }

      // if(item.name === BackstagePasses) {
      //   increaseItemQualityByOne(item);
      //   if (item.name == BackstagePasses) {
      //     if (item.sellIn < 11) {
      //       increaseItemQualityByOne(item);
      //     }
      //     if (item.sellIn < 6) {
      //       increaseItemQualityByOne(item);
      //     }
      //   }
      // }

      if (item.name != BackstagePasses) {
        decreaseItemQualityByOne(item);
      } else {
        increaseItemQualityByOne(item);
        if (item.name == BackstagePasses) {
          if (item.sellIn < 11) {
            increaseItemQualityByOne(item);
          }
          if (item.sellIn < 6) {
            increaseItemQualityByOne(item);
          }
        }
      }

      decreaseItemSellInByOne(item);

      if (item.sellIn < MIN_ITEM_QUALITY) {
        item.name != BackstagePasses
          ? decreaseItemQualityByOne(item)
          : (item.quality = MIN_ITEM_QUALITY);
      }
    });

    return this.items;
  }
}
