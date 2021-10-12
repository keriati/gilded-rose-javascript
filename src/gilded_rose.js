const AGED_BRIE = "Aged Brie";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured";
export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const increaseQuality = (item, increaseValue = 1) => {
  const updatedValue = item.quality + increaseValue;

  if (updatedValue > 50) {
    return;
  }

  item.quality = updatedValue;
};

const decreaseQuality = (item, decreaseValue = 1) => {
  const updatedValue = item.quality - decreaseValue;

  item.quality = updatedValue < 0 ? 0 : updatedValue;
};

const decreaseConjuredItemQuality = (item) => {
  const decreaseValue = item.sellIn > 0 ? 2 : 4;
  decreaseQuality(item, decreaseValue);
};

const decreaseSellIn = (item, decreaseSellInValue = 1) => {
  item.sellIn = item.sellIn - decreaseSellInValue;
};
export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];

      if (item.name === SULFURAS) {
        continue;
      }

      if (item.name === CONJURED) {
        decreaseConjuredItemQuality(item);
        decreaseSellIn(item);
        continue;
      }

      if (item.name != AGED_BRIE && item.name != BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      } else {
        increaseQuality(item);
        if (item.name == BACKSTAGE_PASSES) {
          if (item.sellIn < 11) {
            increaseQuality(item);
          }
          if (item.sellIn < 6) {
            increaseQuality(item);
          }
        }
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.name != AGED_BRIE) {
          if (item.name != BACKSTAGE_PASSES) {
            if (item.quality > 0) {
              item.quality = item.quality - 1;
            }
          } else {
            item.quality = 0;
          }
        } else {
          increaseQuality(item);
        }
      }
    }

    return this.items;
  }
}
