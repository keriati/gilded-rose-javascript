export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const agedBrieName = 'Aged Brie';
const backstagePassesName = 'Backstage passes to a TAFKAL80ETC concert';
const sulfurasHandOfRagnarosName = 'Sulfuras, Hand of Ragnaros';

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;
const DAILY_QUALITY_INCREASE = 1;
const DAILY_SELLIN_DECREASE = 1;
const BACKSTAGE_PASS_SELL_IN_FIRST_THRESHOLD = 10;
const BACKSTAGE_PASS_SELL_IN_SECOND_THRESHOLD = 5;

const isLessThanMaxQuality = (item) => {
  return item.quality < MAX_QUALITY;
}

const increaseQuality = (item) => {
  if (isLessThanMaxQuality(item)) {
    item.quality += 1;
  }
}
const decreaseQuality = (item) => {
  if (isMoreThanMinQuality(item)) {
    item.quality -= DAILY_QUALITY_INCREASE;
  }
}

const isAgedBrie = (item) => {
  return item.name === agedBrieName;
}

const isBackstagePass = (item) => {
  return item.name === backstagePassesName;
}

const isSulfuras = (item) => {
  return item.name === sulfurasHandOfRagnarosName;
}

const isMoreThanMinQuality = (item) => {
  return item.quality > MIN_QUALITY;
}

const hasItemExpired = item => {
  return item.sellIn < 0;
};

const updateExpiredItem = item => {
  if (!isBackstagePass(item)) {
    decreaseQuality(item);
  }
  if (isBackstagePass(item)) {
    item.quality = MIN_QUALITY;
  }
  if (isAgedBrie(item)) {
    increaseQuality(item);
  }
};

const updateBackstagePass = item => {
  increaseQuality(item);
  if (item.sellIn <= BACKSTAGE_PASS_SELL_IN_FIRST_THRESHOLD) {
    increaseQuality(item);
  }
  if (item.sellIn <= BACKSTAGE_PASS_SELL_IN_SECOND_THRESHOLD) {
    increaseQuality(item);
  }
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (isSulfuras(item)) {
        continue;
      }

      if (isAgedBrie(item)) {
        increaseQuality(item);
      } else if (isBackstagePass(item)) {
        updateBackstagePass(item);
      } else {
        decreaseQuality(item);
      }

      item.sellIn -= DAILY_SELLIN_DECREASE;

      if (hasItemExpired(item)) {
        updateExpiredItem(item);
      }
    }

    return this.items;
  }
}
