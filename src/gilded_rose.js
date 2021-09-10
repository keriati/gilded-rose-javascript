const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES_TAFKAL80ETC = 'Backstage passes to a TAFKAL80ETC concert';
const SULFURAS = 'Sulfuras, Hand of Ragnaros';
const HIGHEST_QUALITY = 50;
const BACKSTAGE_PASSES_SELL_IN_QUALITY_TWO = 11;
const BACKSTAGE_PASSES_SELL_IN_QUALITY_THREE = 6;


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
    //
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE_PASSES_TAFKAL80ETC) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != SULFURAS) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < HIGHEST_QUALITY) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == BACKSTAGE_PASSES_TAFKAL80ETC) {
            if (this.items[i].sellIn < BACKSTAGE_PASSES_SELL_IN_QUALITY_TWO) {
              if (this.items[i].quality < HIGHEST_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < BACKSTAGE_PASSES_SELL_IN_QUALITY_THREE) {
              if (this.items[i].quality < HIGHEST_QUALITY) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AGED_BRIE) {
          if (this.items[i].name != BACKSTAGE_PASSES_TAFKAL80ETC) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != SULFURAS) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < HIGHEST_QUALITY) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
