import StandardItemUpdater from './strategies/StandardItemUpdater';
import AgingItemUpdater from './strategies/AgingItemUpdater';
import LegendaryItemUpdater from './strategies/LegendaryItemUpdater';
import ConjuredItemUpdater from './strategies/ConjuredItemUpdater';
import BackstagePassUpdater from './strategies/BackstagePassUpdater';

const strategies = [
  AgingItemUpdater,
  LegendaryItemUpdater,
  ConjuredItemUpdater,
  BackstagePassUpdater,
  StandardItemUpdater
];

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const itemUpdater = getItemUpdater(item);
      item.quality = itemUpdater.updateQuality(item);
      item.sellIn = itemUpdater.updateSellIn(item);
    });
    return this.items;
  }
}

function getItemUpdater(item) {
  return strategies.find((strategy) => {
    return strategy.isMatchingItem(item);
  });
}

