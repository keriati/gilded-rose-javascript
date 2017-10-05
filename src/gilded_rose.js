export const AGED_BRIE = 'Aged Brie';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

const TICKET_QUALITY_DOUBLE_DAYS_LIMIT = 10;
const TICKET_QUALITY_TRIPLE_DAYS_LIMIT = 5;

export const LEGENDARY_ITEMS = [
  SULFURAS,
];

export const CHEESE_ITEMS = [
  AGED_BRIE,
];

export const TICKET_ITEMS = [
  BACKSTAGE_PASSES,
];

export const CONJURED_PREFIX = 'Conjured';

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const isConjured = function (item) {
  return item.name.startsWith(CONJURED_PREFIX);
};

const isPastSellInDate = function (item) {
  return item.sellIn <= 0;
};

const isLegendary = function (item) {
  return LEGENDARY_ITEMS.includes(item.name);
};

const isCheese = function (item) {
  return CHEESE_ITEMS.includes(item.name);
};

const isTicket = function (item) {
  return TICKET_ITEMS.includes(item.name);
};

const isNormal = function (item) {
  return !isLegendary(item) && !isCheese(item) && !isTicket(item);
};

const decreaseSellIn = function (item, amount = 1) {
  item.sellIn -= amount;
};

const decreaseQuality = function (item, amount = 1) {
  item.quality -= amount;
};

const increaseQuality = function (item, amount = 1) {
  item.quality += amount;
};

const resetQueality = function (item) {
  item.quality = 0;
};

const applyQualityLimits = function (item) {
  item.quality = Math.min(item.quality, 50);
  item.quality = Math.max(item.quality, 0);
};

const applySellInLimits = function (item) {
  item.sellIn = Math.max(item.sellIn, 0);
};

const getTicketQualityIncreaseAmount = function (item) {
  const daysLeft = item.sellIn;
  let qualityRate = 1;

  if (daysLeft <= TICKET_QUALITY_TRIPLE_DAYS_LIMIT) {
    qualityRate += 1;
  }
  if (daysLeft <= TICKET_QUALITY_DOUBLE_DAYS_LIMIT) {
    qualityRate += 1;
  }
  return qualityRate;
};

const updateSellIn = function (item) {
  if (isLegendary(item)) {
    return;
  }
  decreaseSellIn(item);
  applySellInLimits(item);
};

const updateQuality = function (item) {
  if (isLegendary(item)) {
    return;
  }

  if (isCheese(item)) {
    increaseQuality(item, 2);
    applyQualityLimits(item);
  }

  if (isTicket(item)) {
    if (isPastSellInDate(item)) {
      resetQueality(item);
    } else {
      const qualityIncrease = getTicketQualityIncreaseAmount(item);
      increaseQuality(item, qualityIncrease);
    }
    applyQualityLimits(item);
  }

  if (isNormal(item)) {
    const qualityDecreaseRate = isConjured(item) ? 2 : 1;
    const qualityDecrease = isPastSellInDate(item) ? 2 : 1;
    decreaseQuality(item, qualityDecrease * qualityDecreaseRate);
    applyQualityLimits(item);
  }
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      updateSellIn(item);
      updateQuality(item);
    });
    return this.items;
  }
}
