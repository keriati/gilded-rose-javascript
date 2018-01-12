const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const BACKSTAGE_PRICE_1_DEADLINE = 10;
const BACKSTAGE_PRICE_2_DEADLINE = 5;

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
  updateQuality() {
    this.items.forEach(this.updateItem, this);

    return this.items;
  }

  updateItem(item) {
    if (this.isBackstagePass(item)) {
      this.updateBackstagePass(item);
      return;
    }

    if (this.isLegendaryItem(item)) {
      this.updateLegendaryItem(item);
      return;
    }

    if (this.isAgingItem(item)) {
      this.updateAgingItem(item);
      return;
    }

    this.updateItemQuality(item, item.sellIn > 0 ? -1 : -2);
    this.updateSellIn(item);
  }

  updateAgingItem(item) {
    this.updateItemQuality(item, 1);
    this.updateSellIn(item);
    if (item.sellIn < 0) {
      this.updateItemQuality(item, 1);
    }
  }

  updateLegendaryItem(item) {
    //do nothing
  }

  updateBackstagePass(item) {
    if (item.sellIn > BACKSTAGE_PRICE_1_DEADLINE) {
      this.updateItemQuality(item, 1);
    } else if (item.sellIn > BACKSTAGE_PRICE_2_DEADLINE) {
      this.updateItemQuality(item, 2);
    } else if (item.sellIn > 0) {
      this.updateItemQuality(item, 3);
    } else {
      item.quality = 0;
    }
    this.updateSellIn(item);
  }

  isAgingItem(item) {
    return item.name === 'Aged Brie';
  }

  isLegendaryItem(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  isBackstagePass(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert'
  }

  updateSellIn(item) {
    item.sellIn = item.sellIn - 1;
  }

  updateItemQuality(item, qualityChange) {
    item.quality += qualityChange;
    if (item.quality > MAX_QUALITY) {
      item.quality = MAX_QUALITY;
    }
    if (item.quality < MIN_QUALITY) {
      item.quality = MIN_QUALITY;
    }
  }
}
