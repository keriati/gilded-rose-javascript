class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(item) {
    item.quality++;
  }
  decreaseQuality(item) {
    item.quality--;
  }
  updateBackstagePass(item) {
    if (item.quality < 50) {
      this.increaseQuality(item);
      if (item.sellIn < 11) {
        if (item.quality < 50) {
          this.increaseQuality(item);
        }
      }
      if (item.sellIn < 6) {
        if (item.quality < 50) {
          this.increaseQuality(item);
        }
      }
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }
  updateAgedBrie(item) {
    if (item.quality < 50) {
      this.increaseQuality(item);
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      if (item.quality < 50) {
        this.increaseQuality(item);
      }
    }
  }
  updateRegularItem(item) {
    if (item.quality > 0) {
      this.decreaseQuality(item);
    }
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      if (item.quality > 0) {
        this.decreaseQuality(item);
      }
    }
  }
  updateQuality() {
    this.items.forEach((item, key) => {
      switch (item.name) {
        case "Aged Brie":
          this.updateAgedBrie(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePass(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        default:
          this.updateRegularItem(item);
          break;
      }
    });

    return this.items;
  }
}
export default Shop;
