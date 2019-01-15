export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function increaseQuality(updatedItem) {
  if (updatedItem.quality < 50) {
    updatedItem.quality = updatedItem.quality + 1;
  }
}

function decreaseQuality(updatedItem) {
  if (updatedItem.quality > 0) {
    updatedItem.quality = updatedItem.quality - 1;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map(item => {
      const updatedItem = { ...item };
      const name = item.name;

      if (name === "Sulfuras, Hand of Ragnaros") {
        return updatedItem;
      }

      updatedItem.sellIn = updatedItem.sellIn - 1;

      if (name === "Aged Brie") {
        increaseQuality(updatedItem);

        if (updatedItem.sellIn < 0) {
          increaseQuality(updatedItem);
        }
      } else if (name === "Backstage passes to a TAFKAL80ETC concert") {
        increaseQuality(updatedItem);

        if (updatedItem.sellIn < 10) {
          increaseQuality(updatedItem);
        }

        if (updatedItem.sellIn < 5) {
          increaseQuality(updatedItem);
        }

        if (updatedItem.sellIn < 0) {
          updatedItem.quality = updatedItem.quality - updatedItem.quality;
        }
      } else if (name === "Conjured") {
        decreaseQuality(updatedItem);
        decreaseQuality(updatedItem);

        if (updatedItem.sellIn < 0) {
          decreaseQuality(updatedItem);
          decreaseQuality(updatedItem);
        }
      } else {
        decreaseQuality(updatedItem);

        if (updatedItem.sellIn < 0) {
          decreaseQuality(updatedItem);
        }
      }

      return updatedItem;
    });
  }
}
