const AGED_BRIE = "Aged Brie";
const BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const CONJURED = "Conjured Mana Cake";

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;
const DOUBLE_DECREMENT_LIMIT = 0;
const BACKSTAGE_DOUBLE_INCREMENT_LIMIT = 11;
const BACKSTAGE_TRIPLE_INCREMENT_LIMIT = 6;

function handleSulfuras(item) {
  return;
}

function handleAgedBrie(item) {
  item.incrementQuality();
  if (item.sellIn < DOUBLE_DECREMENT_LIMIT) {
    item.incrementQuality();
  }
  item.progressSellin();
}

function handleBackstage(item) {
  item.incrementQuality();
  if (item.sellIn < BACKSTAGE_DOUBLE_INCREMENT_LIMIT) {
    item.incrementQuality();
  }
  if (item.sellIn < BACKSTAGE_TRIPLE_INCREMENT_LIMIT) {
    item.incrementQuality();
  }
  item.progressSellin();

  if (item.sellIn < DOUBLE_DECREMENT_LIMIT) {
    item.zeroQuality();
  }
}

function handleNormal(item) {
  //default decrement
  item.decrementQuality();
  // sellin progress
  item.progressSellin();

  if (item.sellIn < DOUBLE_DECREMENT_LIMIT) {
    // default item, double decrement.
    item.decrementQuality();
  }
}

function handleConjuredManaCake(item) {
  item.decrementQuality();
  item.decrementQuality();
  // sellin progress
  item.progressSellin();
  if (item.sellIn < DOUBLE_DECREMENT_LIMIT) {
    // default item, double decrement.
    item.decrementQuality();
    item.decrementQuality();
  }
}

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  isAgedBrie() {
    return this.name === AGED_BRIE;
  }

  isBackstagePass() {
    return this.name === BACKSTAGE;
  }

  isSulfuras() {
    return this.name === SULFURAS;
  }

  isConjuredManaCake() {
    return this.name == CONJURED;
  }

  incrementQuality() {
    if (this.quality < MAX_QUALITY) {
      this.quality++;
    }
  }

  decrementQuality() {
    if (this.quality > MIN_QUALITY) {
      this.quality--;
    }
  }

  progressSellin() {
    this.sellIn--;
  }

  zeroQuality() {
    this.quality = 0;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      if (item.isSulfuras()) {
        handleSulfuras(item);
        return;
      }

      if (item.isAgedBrie()) {
        handleAgedBrie(item);
        return;
      }

      if (item.isBackstagePass()) {
        handleBackstage(item);
        return;
      }

      if (item.isConjuredManaCake()) {
        handleConjuredManaCake(item);
        return;
      }

      handleNormal(item);
    });

    return this.items;
  }
}
