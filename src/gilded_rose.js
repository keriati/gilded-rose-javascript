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

      if (isSulfuras(item.name)) {
        continue;
      }

      if(isBackstagePass(item.name)){
        if (isQualityBelowMax(item.quality)) {
          item.quality = increaseQuality(item.quality);
          
          if (item.sellIn < 11) {
            increaseItemQuality(item);
          }
          if (item.sellIn < 6) {
            increaseItemQuality(item);
          }
        }

        item.sellIn = item.sellIn - 1;
   
        if (item.sellIn < 0) {
          item.quality = floorQuality();
        }
        
        continue;
      }

      if(isAgedBrie(item.name)){
        if (isQualityBelowMax(item.quality)) {
          item.quality = increaseQuality(item.quality);
        }

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
          increaseItemQuality(item);
        }
        
        continue;
      }

      if(isConjured(item.name)){

        decreaseItemQuality(item);
        decreaseItemQuality(item);

        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
          decreaseItemQuality(item);
        }

        continue;
      }

      decreaseItemQuality(item);
      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        decreaseItemQuality(item);
      }
    }

    return this.items;
  }
}

