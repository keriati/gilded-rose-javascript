import {isAgedBrie, isBackstagePassesToATafkalConcert, isSulfuras, isConjured, increaseQuality, decreaseQuality} from './utils';

export class Shop {
    constructor(items=[]){
      this.items = items;
    }
    updateQuality() {
      for (var i = 0; i < this.items.length; i++) {
        
        const item = this.items[i];
        
        if (isSulfuras(item)) {
          continue;
        }
        
        if (isConjured(item)) {
          decreaseQuality(item, 2);
        } else if (isAgedBrie(item)) {
          increaseQuality(item);
        }

        else if (!isAgedBrie(item) && !isBackstagePassesToATafkalConcert(item)) {
          decreaseQuality(item);
        } else {
         
          if (isBackstagePassesToATafkalConcert(item)) {
            increaseQuality(item);

            if (item.sellIn < 11) {
              increaseQuality(item);
            }
            if (item.sellIn < 6) {
              increaseQuality(item);
            }
          }
        }

        item.sellIn = item.sellIn - 1;
      
        if (item.sellIn < 0) {
          if (isAgedBrie(item)) {
             increaseQuality(item);
          } else if (isBackstagePassesToATafkalConcert(item)) {
            item.quality = 0;
          } else {
            decreaseQuality(item);
          }
        }

      }
  
      return this.items;
    }
  }
  