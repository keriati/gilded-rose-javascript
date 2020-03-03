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

  descreaseQuality(item) {
    if (
      item.quality > 0 &&
      item.name !== ITEM_TYPES.AGED_BRIE &&
      item.name !== ITEM_TYPES.BACKSTAGE_PASSES
    )
      item.quality -= 1;
  }

  increaseQuality(item) {
    if (item.quality < 50) item.quality += 1;
  }

  increaseBrieQuality(item) {
    if (item.name === ITEM_TYPES.AGED_BRIE) {
      this.increaseQuality(item);
      if (item.sellIn < 0) this.increaseQuality(item);
    }
  }

  increaseBackstagePassesQuality(item) {
    const { name, sellIn } = item;
    if (name === ITEM_TYPES.BACKSTAGE_PASSES) {
      this.increaseQuality(item);
      if (sellIn < BACKSTAGE_PASSES_SELL_IN_1ST_BOUNDARY)
        this.increaseQuality(item);
      if (sellIn < BACKSTAGE_PASSES_SELL_IN_2ND_BOUNDARY)
        this.increaseQuality(item);
    }
  }

  decreaseSellIn(item) {
    item.sellIn -= 1;
  }

  resetQualityToZero(item) {
    if (item.name === ITEM_TYPES.BACKSTAGE_PASSES && item.sellIn < 0)
      item.quality = 0;
  }

  updateQuality() {
    return this.items.map(item => {
      if (item.name === ITEM_TYPES.SULFURAS) return item;
      this.decreaseSellIn(item);
      this.descreaseQuality(item);
      this.increaseBrieQuality(item);
      this.increaseBackstagePassesQuality(item);
      this.resetQualityToZero(item);
      if (item.sellIn < 0) this.descreaseQuality(item);
    });
  }
}
