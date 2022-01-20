export const BackstagePasses = "Backstage passes to a TAFKAL80ETC concert";
export const AgedBrie = "Aged Brie";
export const Sulfuras = "Sulfuras, Hand of Ragnaros";
export const Conjured = "Conjured";

const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function decreaseItemQualityByCount(item, count) {
  if (item.quality > MIN_ITEM_QUALITY) {
    return (item.quality = item.quality - count);
  }
  return item.quality;
}

function increaseItemQualityByOne(item) {
  if (item.quality < MAX_ITEM_QUALITY) {
    return (item.quality = item.quality + 1);
  }

  return item.quality;
}

function decreaseItemSellInByOne(item) {
  return item.sellIn--;
}

function updateAgedBrieItem(item) {
  increaseItemQualityByOne(item);
  decreaseItemSellInByOne(item);
  if (item.sellIn < MIN_ITEM_QUALITY) {
    increaseItemQualityByOne(item);
  }
  return;
}

function updateupdateBackstagePassesItem(item) {
  increaseItemQualityByOne(item);
  if (item.name == BackstagePasses) {
    if (item.sellIn < 11) {
      increaseItemQualityByOne(item);
    }
    if (item.sellIn < 6) {
      increaseItemQualityByOne(item);
    }
  }
  decreaseItemSellInByOne(item);

  if (item.sellIn < MIN_ITEM_QUALITY) {
    item.quality = MIN_ITEM_QUALITY;
  }
  return;
}

function updateSulfurasItem(item) {
  return;
}

function updateConjuredItem(item) {
  decreaseItemQualityByCount(item, 2);
  decreaseItemSellInByOne(item);

  if (item.sellIn < MIN_ITEM_QUALITY) {
    decreaseItemQualityByCount(item, 2);
  }

  return;
}

function updateStandartItem(item) {
  decreaseItemQualityByCount(item, 1);
  decreaseItemSellInByOne(item);

  if (item.sellIn < MIN_ITEM_QUALITY) {
    decreaseItemQualityByCount(item, 1);
  }
  return;
}

const itemsOptions = [
  { name: Sulfuras, action: updateSulfurasItem },
  { name: AgedBrie, action: updateAgedBrieItem },
  { name: BackstagePasses, action: updateupdateBackstagePassesItem },
  { name: Conjured, action: updateConjuredItem },
];

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      const option = itemsOptions.find((option) => option.name === item.name);
      return Boolean(option) ? option.action(item) : updateStandartItem(item);
    });

    return this.items;
  }
}
