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

      if (item.name.startsWith('Sulfuras')) {
        continue;
      }

      if (item.name.startsWith('Backstage passes')) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
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
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0) {
          item.quality = item.quality - item.quality;
        }
        continue;
      }

      if (item.name.startsWith('Aged Brie')) {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }

        item.sellIn = item.sellIn - 1;
        
        if (item.sellIn < 0 && item.quality < 50) {
          item.quality = item.quality + 1;
        }
        continue;
      }

      if (item.name.startsWith('Conjured')) {
        if (item.quality > 0) {
          item.quality = item.quality - 2;
        }
        item.sellIn = item.sellIn - 1;
        if (item.sellIn < 0 && item.quality > 0) {
          item.quality = item.quality - 2;
        }
        if (item.quality < 0) {
          item.quality = 0;
        }
        continue;
      }

      if (item.quality > 0) {
        item.quality = item.quality - 1;
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0 && item.quality > 0) {
        item.quality = item.quality - 1;
      }
    }

    return this.items;
  }
}
