export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = 'Aged Brie';
const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const CONJURED = 'Conjured';

export class Shop {
  constructor(items=[]){
    this.items = items;
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  descreaseQuality(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
  }

  updateQuality() {

    this.items.forEach(item => {
      
      if (item.name === SULFURAS) {
        return item;
      }

      if (item.name === AGED_BRIE) {
        this.increaseQuality(item);
        item.sellIn -= 1;
        if (item.sellIn < 0) {
          this.increaseQuality(item);
        }
        return item;
      }

      if (item.name === BACKSTAGE_PASSES) {
        this.increaseQuality(item);

        if (item.sellIn < 11) {
          this.increaseQuality(item);
        }
        if (item.sellIn < 6) {
          this.increaseQuality(item);
        }
        item.sellIn -= 1;
        if (item.sellIn < 0) {
          item.quality = 0;
        }

        return item;
      }

      if (item.name === CONJURED) {
        
      }

      
      this.descreaseQuality(item);
      item.sellIn -= 1;
      
      if (item.sellIn < 0) {
        this.descreaseQuality(item);
      }

    });

    return this.items;
  }
}
