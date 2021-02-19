import { itemNames, TRIPLE_QUALITY_LIMIT, DOUBLE_QUALITY_LIMIT, MAX_QUALITY, MIN_QUALITY } from "./constants";

export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const decreaseQuality = (item) =>  {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1;
  }
}

const increaseQuality = (item) => {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
}

const decreaseSellIn = (item) => {
    item.sellIn = item.sellIn - 1;
}


const handleSulfuras = (item) => {}

const handleBackstage = (item) => {
  increaseQuality(item);
  if (item.sellIn < DOUBLE_QUALITY_LIMIT) {
    increaseQuality(item);
  }
  if (item.sellIn < TRIPLE_QUALITY_LIMIT) {
    increaseQuality(item);
  }
  if (item.sellIn < 0) {
    item.quality = 0;
  }
  decreaseSellIn(item);
}

const handleAgedBrie = (item) => {
  increaseQuality(item);
  decreaseSellIn(item);
  if (item.sellIn < 0) {
    increaseQuality(item);
  }
}

const handleNormalItem = (item) => {
  decreaseQuality(item);
  decreaseSellIn(item);
  if (item.sellIn < 0) {
      decreaseQuality(item);
  }
}

const STRATEGIES = {
  [itemNames.SULFURAS]: handleSulfuras,
  [itemNames.BACKSTAGE_PASS]: handleBackstage,
  [itemNames.AGED_BRIE]: handleAgedBrie,
}

const handleItem = (item, strategies) => {
  const handle = strategies[item.name];
  if (handle) {
    handle(item);
    return
  }
  handleNormalItem(item);
  return;
}


export class Shop {
  constructor(items=[], strategies = STRATEGIES) {
    this.items = items;
    this.strategies = strategies
  }
  updateQuality() {
    this.items.forEach((item) => handleItem(item, this.strategies));
    return this.items;
  }
}
