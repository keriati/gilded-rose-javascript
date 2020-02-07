export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function decreaseSellIn(item, changeValue) {
  item.sellIn = item.sellIn - changeValue; 
}

function decreaseQuality(item, changeValue) {
  item.quality = item.quality - changeValue;
  if (item.quality < 0) {
    item.quality = 0
  }
}

function increaseQuality(item, changeValue) {
  item.quality = item.quality + changeValue;
  if (item.quality > 50) {
    item.quality = 50
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      // Conjured
      if (this.items[i].name === 'Conjured') {
        decreaseSellIn(this.items[i], 1)
        decreaseQuality(this.items[i], 2)        
        continue
      }
      // Backstage passes to a TAFKAL80ETC concert
      if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        decreaseSellIn(this.items[i], 1);
        increaseQuality(this.items[i], 1);
        if (this.items[i].sellIn < 11) { 
          increaseQuality(this.items[i], 1);              
        }
        if (this.items[i].sellIn < 6) {
          increaseQuality(this.items[i], 1);
        }
        if (this.items[i].sellIn < 0) {
          this.items[i].quality = 0;
        }
        continue
      }
      // Sulfuras, Hand of Ragnaros
      // Aged Brie
      // Gilded Rose items
      if (this.items[i].name != 'Aged Brie') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            decreaseQuality(this.items[i], 1)
          }
        }
      } else {
          increaseQuality(this.items[i], 1);
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        decreaseSellIn(this.items[i], 1)
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                decreaseQuality(this.items[i], 1);
              }
            }
        } else {
            increaseQuality(this.items[i], 1);
        }
      }
    }

    return this.items;
  }
}
