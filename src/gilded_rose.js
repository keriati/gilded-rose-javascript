import {
  isBackstagePass, 
  isAgedBrie, 
  isSulfuras, 
  isConjured,
  increaseItemQuality,
  decreaseItemQuality,
  decreaseQuality, 
  increaseQuality, 
  floorQuality,
  isQualityAboveMin,
  isQualityBelowMax } from './js/itemService';
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
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (!isAgedBrie(item.name) && !isBackstagePass(item.name)) {
        
        if (isQualityAboveMin(item.quality)) { 
          if (!isSulfuras(item.name)) {
            item.quality = decreaseQuality(item.quality);
          }
        }

      } else {
        if (isQualityBelowMax(item.quality)) {
          item.quality = increaseQuality(item.quality);
          if (isBackstagePass(item.name)) {
            if (item.sellIn < 11) {
              increaseItemQuality(item);
            }
            if (item.sellIn < 6) {
              increaseItemQuality(item);
            }
          }
        }
      }


      if (!isSulfuras(item.name)) {
        item.sellIn = item.sellIn - 1;
      }

      if (item.sellIn < 0) {
        if (!isAgedBrie(item.name)) {
          if (!isBackstagePass(item.name)) {
            if (isQualityAboveMin(item.quality)) {
              if (!isSulfuras(item.name)) {
                item.quality = decreaseQuality(item.quality);
              }
            }
          } else {
            item.quality = floorQuality();
          }
        } else {
          increaseItemQuality(item);
        }
      }

    }

    return this.items;
  }
}
