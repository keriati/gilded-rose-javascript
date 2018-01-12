import { updaters } from './updaters/';

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
    this.items = this.items.map(this.updateItem);
    return this.items;
  }

  updateItem(item) {
    const updater = updaters.find((updater) => {
      return updater.matchesType(item);
    });
    return updater.updateItem(item);
  }
}
