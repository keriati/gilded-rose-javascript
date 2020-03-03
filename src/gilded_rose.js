export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEM_TYPES = {
  AGED_BRIE: 'Aged Brie',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert'
};

const BACKSTAGE_PASSES_SELL_IN_1ST_BOUNDARY = 10;
const BACKSTAGE_PASSES_SELL_IN_2ND_BOUNDARY = 5;

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  decreaseItemQuality(itemIndex) {
    this.items[itemIndex].quality = this.items[itemIndex].quality - 1;
  }

  descreaseQuality(item) {
    if (item.quality > 0) item.quality -= 1;
  }

  increaseQuality(item) {
    if (item.quality < 50) item.quality += 1;
  }

  increaseBrieQuality(item) {
    if (item.name === ITEM_TYPES.AGED_BRIE) this.increaseQuality(item);
  }

  decreaseSellIn(itemIndex) {
    this.items[itemIndex].sellIn = this.items[itemIndex].sellIn - 1;
  }

  resetQualityToZero(item) {
    item.quality = 0;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === ITEM_TYPES.SULFURAS) continue;
      this.decreaseSellIn(i);

      if (
        this.items[i].name != ITEM_TYPES.AGED_BRIE &&
        this.items[i].name != ITEM_TYPES.BACKSTAGE_PASSES
      ) {
        this.descreaseQuality(this.items[i]);
      }

      this.increaseBrieQuality(this.items[i]);

      if (this.items[i].name === ITEM_TYPES.BACKSTAGE_PASSES) {
        this.increaseQuality(this.items[i]);
        if (this.items[i].name == ITEM_TYPES.BACKSTAGE_PASSES) {
          if (this.items[i].sellIn < BACKSTAGE_PASSES_SELL_IN_1ST_BOUNDARY) {
            this.increaseQuality(this.items[i]);
          }
          if (this.items[i].sellIn < BACKSTAGE_PASSES_SELL_IN_2ND_BOUNDARY) {
            this.increaseQuality(this.items[i]);
          }
        }
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name === ITEM_TYPES.AGED_BRIE) {
          this.increaseQuality(this.items[i]);
          continue;
        }
        if (this.items[i].name === ITEM_TYPES.BACKSTAGE_PASSES) {
          this.resetQualityToZero(this.items[i]);
          continue;
        }

        this.descreaseQuality(this.items[i]);
      }
    }

    return this.items;
  }
}
