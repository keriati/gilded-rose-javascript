export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';
export const CONJURED = 'Conjured';

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
      const { name } = item;
      // if item is SULFURAS, don't degrade the quality and sellIn value
      if (name === SULFURAS) {
        return this.items;
      }

      // if item is CONJURED, degrade the quality twice as compare to normal items
      if (name === CONJURED ) {
        this.items[i] = {
          ...this.items[i],
          quality: item.quality - 2,
          sellIn: item.sellIn - 1

        }
        return this.items;
      }

      if (this.items[i].name !== AGED_BRIE && this.items[i].name !== BACKSTAGE_PASSES) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name === BACKSTAGE_PASSES) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name !== SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== AGED_BRIE) {
          if (this.items[i].name !== BACKSTAGE_PASSES) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== SULFURAS) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
