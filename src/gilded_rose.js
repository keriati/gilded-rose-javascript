export const SULFURAS = "Sulfuras, Hand of Ragnaros";
export const AGED_BRIE = "Aged Brie";
export const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
export const CONJURED = "Conjured";

export function updateBackstagePassesQuality(item) {
  if (item.quality < 50 && item.sellIn > 0) {
    if (item.sellIn <= 5 && item.quality < 48) {
      item.quality += 3;
      return item;
    }
    if (item.sellIn <= 10 && item.quality < 49) {
      item.quality += 2;
      return item;
    }
    item.quality += 1;
    return item;
  }
  if (item.sellIn <= 0) {
    item.quality = 0;
    return item;
  }
}

function updateItemQuality(item) {
  // if item is SULFURAS, don't degrade the quality and sellIn value
  if (item.name === SULFURAS) {
    return item;
  }

  // if item is CONJURED, degrade the quality twice as compare to normal items
  if (item.name === CONJURED) {
    item.quality = item.quality - 2;
    item.sellIn = item.sellIn - 1;
    return item;
  }

  // if item is BACKSTAGE_PASSES
  if (item.name === BACKSTAGE_PASSES) {
    item = updateBackstagePassesQuality(item);
    item.sellIn -= 1;
    return item;
  }

  if (item.name !== AGED_BRIE && item.name !== BACKSTAGE_PASSES) {
    if (item.quality > 0) {
      if (item.name !== SULFURAS) {
        item.quality = item.quality - 1;
      }
    }
  } else {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name === BACKSTAGE_PASSES) {
        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }
  if (item.name !== SULFURAS) {
    item.sellIn = item.sellIn - 1;
  }
  if (item.sellIn < 0) {
    if (item.name !== AGED_BRIE) {
      if (item.name !== BACKSTAGE_PASSES) {
        if (item.quality > 0) {
          if (item.name !== SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItemQuality);
    return this.items;
  }
}
