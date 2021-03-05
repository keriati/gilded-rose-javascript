import AgedBrie from "./strategies/AgedBrie";
import BackstagePass from "./strategies/BackstagePass";
import NonSpecial from "./strategies/NonSpecial";
import Conjured from "./strategies/Conjured";
import Sulfuras from "./strategies/Sulfuras";

class UpdateManager {
  constructor() {
    this.name = "";
    this.item = {
      name: "",
      quality: 0,
      sellIn: 0,
    };
  }

  setStrategy(name) {
    this.name = name;
  }

  setItem(item) {
    this.item = {
      name: item.name,
      quality: item.quality,
      sellIn: item.sellIn,
    };
  }

  update(item) {
    return this.name.update(item);
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  // we run this at the end of the day
  updateQuality() {
    // add here if there is a new strategy, and in the strategies folder
    const strategies = {
      nonSpecial: new NonSpecial(),
      updateManager: new UpdateManager(),
      conjured: new Conjured(),
      backstagePass: new BackstagePass(),
      agedBrie: new AgedBrie(),
      sulfuras: new Sulfuras(),
    };
    let updateManager = new UpdateManager();

    for (var i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      updateManager.setItem(item);
      updateManager.setStrategy(strategies["nonSpecial"]); //default

      for (const [key] of Object.entries(strategies)) {
        if (item.name === strategies[key].itemName) {
          updateManager.setStrategy(strategies[key]);
        }
      }

      updateManager.update(item);
    }
    return this.items;
  }
}
