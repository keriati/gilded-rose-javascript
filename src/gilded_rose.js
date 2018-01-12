const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

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
    if (!this.isAgingItem(item) && !this.isBackstagePass(item)) {
      if (!this.isLegendaryItem(item)) {
        this.updateItemQuality(item, -1);
      }
    } else {
      this.updateItemQuality(item, 1);
      if (this.isBackstagePass(item)) {
        if (item.sellIn < 11) {
          this.updateItemQuality(item, 1);
        }
        if (item.sellIn < 6) {
          this.updateItemQuality(item, 1);
        }
      }
    }
    this.updateSellIn(item);
    if (item.sellIn < 0) {
      if (!this.isAgingItem(item)) {
        if (!this.isBackstagePass(item)) {
            if (!this.isLegendaryItem(item)) {
              this.updateItemQuality(item, -1);
            }
        } else {
          item.quality = 0;
        }
      } else {
        this.updateItemQuality(item, 1);
      }
    }
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
    if (!this.isLegendaryItem(item)) {
      item.sellIn = item.sellIn - 1;
    }
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
