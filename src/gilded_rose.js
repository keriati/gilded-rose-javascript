export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE_ITEM = "Aged Brie";
const BACKSTAGE_PASSES_ITEM = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS_ITEM = "Sulfuras, Hand of Ragnaros";

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  equalsToItemName(itemName, name) {
    return itemName === name;
  }

  isAgedBrieItem(itemName) {
    return this.equalsToItemName(itemName, AGED_BRIE_ITEM);
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (
        !this.isAgedBrieItem(this.items[i].name) &&
        this.items[i].name != BACKSTAGE_PASSES_ITEM
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != SULFURAS_ITEM) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == BACKSTAGE_PASSES_ITEM) {
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
      if (this.items[i].name != SULFURAS_ITEM) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AGED_BRIE_ITEM) {
          if (this.items[i].name != BACKSTAGE_PASSES_ITEM) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != SULFURAS_ITEM) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
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
