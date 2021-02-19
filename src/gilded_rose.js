import { itemNames, TRIPLE_QUALITY_LIMIT, DOUBLE_QUALITY_LIMIT, MAX_QUALITY, MIN_QUALITY } from "./constants";

export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}


const decreaseQuality = (item) =>  {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1;
  }
}

const increaseQuality = (item) => {
  if(item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
}

export class Shop {
  constructor(items=[]) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.name != itemNames.AGED_BRIE && item.name != itemNames.BACKSTAGE_PASS) {
          if (item.name != itemNames.SULFURAS) {
            decreaseQuality(item);
          }
      } else {
        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1;
          if (item.name == itemNames.BACKSTAGE_PASS) {
            if (item.sellIn < DOUBLE_QUALITY_LIMIT) {
                increaseQuality(item);
            }
            if (item.sellIn < TRIPLE_QUALITY_LIMIT) {
              increaseQuality(item);
            }
          }
        }
      }
      if (item.name != itemNames.SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != itemNames.AGED_BRIE) {
          if (item.name != itemNames.BACKSTAGE_PASS) {
            if (item.name != itemNames.SULFURAS) {
              decreaseQuality(item);
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          increaseQuality(item);
        }
      }
    }

    return this.items;
  }
}
