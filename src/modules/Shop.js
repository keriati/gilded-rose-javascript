class Shop {
  constructor(items = []) {
    this.items = items;
  }

  isRegularItem(name) {
    if (
      name !== "Aged Brie" &&
      name !== "Backstage passes to a TAFKAL80ETC concert"
    )
      return true;
    return false;
  }

  isBackStagePass(name) {
    if (name === "Backstage passes to a TAFKAL80ETC concert") return true;
    return false;
  }

  isSulfurasItem(name) {
    if (name === "Sulfuras, Hand of Ragnaros") return true;
    return false;
  }
  increaseQuality(item) {
    item.quality++;
  }
  decreaseQuality(item) {
    item.quality--;
  }
  updateQuality() {
    this.items.forEach((item, key) => {
      if (this.isSulfurasItem(item.name)) return;

      if (this.isRegularItem(item.name)) {
        if (item.quality > 0) {
          this.decreaseQuality(item);
        }
      } else {
        if (item.quality < 50) {
          this.increaseQuality(item);
          if (this.isBackStagePass(item.name)) {
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
        }
      }
      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (!this.isBackStagePass(item.name)) {
            if (item.quality > 0) {
              this.decreaseQuality(item);
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            this.increaseQuality(item);
          }
        }
      }
    });

    return this.items;
  }
}
export default Shop;
