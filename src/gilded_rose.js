import { conjured, isConjured } from './conjuredItem';

export const decreaseQuality = item => item.quality > 0 && --item.quality;
export const increaseQuality = item => item.quality < 50 && ++item.quality;
export const decreaseSellin = item => --item.sellIn;
export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    const agedBrie = 'Aged Brie';
    const sulfuras = 'Sulfuras, Hand of Ragnaros';
    const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';

    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];
      if (currentItem.name === sulfuras) {
        continue
      }

      if (isConjured(currentItem)) {
        conjured(currentItem)
        continue
      }

      decreaseSellin(currentItem);
      if (currentItem.name !== agedBrie && currentItem.name !== backstagePass) {
        decreaseQuality(currentItem);
      } else {
          increaseQuality(currentItem)
          if (currentItem.name === backstagePass) {
            if (currentItem.sellIn < 11) {
              increaseQuality(currentItem);
            }
            if (currentItem.sellIn < 6) {
              increaseQuality(currentItem);
            }
          }
      }
      if (currentItem.sellIn < 0) {
        if (currentItem.name !== agedBrie) {
          if (currentItem.name !== backstagePass) {
              decreaseQuality(currentItem);
          } else {
            currentItem.quality = 0
          }
        } else {
            increaseQuality(currentItem)
        }
      }
    }

    return this.items;
  }
}
