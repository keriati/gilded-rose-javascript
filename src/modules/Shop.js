class Shop {
  constructor(items = []) {
    this.items = items;
  }

  increaseQuality(item) {
    if (item.quality === 50) return;
    item.quality++;
  }
  decreaseQuality(item) {
    if (item.quality === 0) return;
    item.quality--;
  }
  updateBackstagePass(item) {
    this.increaseQuality(item);
    if (item.sellIn < 11) {
      this.increaseQuality(item);
    }
    if (item.sellIn < 6) {
      this.increaseQuality(item);
    }

    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }
  updateAgedBrie(item) {
    this.increaseQuality(item);

    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      this.increaseQuality(item);
    }
  }
  updateRegularItem(item) {
    this.decreaseQuality(item);
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
    }
  }
  updateConjuredManaCake(item) {
    this.decreaseQuality(item);
    this.decreaseQuality(item);
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      this.decreaseQuality(item);
      this.decreaseQuality(item);
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
        case "Conjured Mana Cake":
          this.updateConjuredManaCake(item);
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
