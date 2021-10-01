const ITEM_AGED_BRIE = "Aged Brie";
const ITEM_BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
const ITEM_SULFURAS = "Sulfuras, Hand of Ragnaros";
const ITEM_CONJURED = "Conjured Mana Cake";

const QUALITY_TRESHOLD = 50;
const STANDARD_RATE_OF_QUALITY_DECREASE = 1;
export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(item, increment = 1) {
    if (item.quality < QUALITY_TRESHOLD) {
      item.quality += increment;
    }
  }

  decreaseQuality(item, decreaseBy = 1) {
    item.quality -= decreaseBy;
  }

  handleConjuredItem(item) {
    this.decreaseQuality(item, STANDARD_RATE_OF_QUALITY_DECREASE * 2);

    if(item.sellIn <= 0) {
      this.decreaseQuality(item, STANDARD_RATE_OF_QUALITY_DECREASE * 2);
    }
  }



  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name != ITEM_SULFURAS) {
        item.sellIn = item.sellIn - 1;
      }
      
      if(item.name === ITEM_CONJURED) {
        this.handleConjuredItem(item);
        continue;
      }

      if (item.name != ITEM_AGED_BRIE && item.name != ITEM_BACKSTAGE_PASS) {
        if (item.quality > 0) {
          if (item.name != ITEM_SULFURAS) {
            this.decreaseQuality(item);
          }
        }
      } else {
        this.increaseQuality(item);

        if (item.name == ITEM_BACKSTAGE_PASS) {
          if (item.sellIn < 11) {
            this.increaseQuality(item);
          }
          if (item.sellIn < 6) {
            this.increaseQuality(item);
          }
        }
      }

      if (item.sellIn < 0) {
        if (item.name === ITEM_AGED_BRIE) {
          this.increaseQuality(item);
        } else {
          if (item.name === ITEM_BACKSTAGE_PASS) {
            item.quality = 0;
          } else {
            if (item.quality > 0) {
              if (item.name != ITEM_SULFURAS) {
                this.decreaseQuality(item); 
              }
            }
          }
        }
      }
    }

    return this.items;
  }
}
