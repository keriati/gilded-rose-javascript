export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const AGED_BRIE = 'Aged Brie';

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const increaseQuality = (item, value = 1) => {
  item.quality += value;
  return item;
};

const decreaseQuality = (item, value = 1) => {
  item.quality -= value;
  return item;
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != AGED_BRIE && this.items[i].name != BACKSTAGE) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != SULFURAS) {
            this.items[i] = decreaseQuality(this.items[i]);
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i] = increaseQuality(this.items[i]);
          if (this.items[i].name == BACKSTAGE) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i] = increaseQuality(this.items[i]);
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i] = increaseQuality(this.items[i]);
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
          if (this.items[i].name != BACKSTAGE) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != SULFURAS) {
                this.items[i] = decreaseQuality(this.items[i]);
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i] = increaseQuality(this.items[i]);
          }
        }
      }
    }

    return this.items;
  }
}
