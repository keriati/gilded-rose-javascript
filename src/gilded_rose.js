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


const increaseQuality = (item, amount = 1) => {
  if (item.quality + amount < MAX_QUALITY) {
    item.quality += amount;
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

const updateBackstagePass = (item) => {
  let addedQualityAmount = 1;
  if (item.sellIn < BACKSTAGE_PASS_SELL_IN_FIRST_THRESHOLD) {
    addedQualityAmount++;
  }
  if (item.sellIn < BACKSTAGE_PASS_SELL_IN_SECOND_THRESHOLD) {
    addedQualityAmount++;
  }
  increaseQuality(item, addedQualityAmount);
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

      item.sellIn -= DAILY_SELLIN_DECREASE;

      if (isAgedBrie(item)) {
        increaseQuality(item);
      } else if (isBackstagePass(item)) {
        updateBackstagePass(item);
      } else {
        decreaseQuality(item);
      }

      if (hasItemExpired(item)) {
        updateExpiredItem(item);
      }
    }

    return this.items;
  }
}
