export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const rules = {
  'Aged Brie': {
    updateQuality(item) {
      if (item.quality < 50) {
        if (item.sellIn <= 0) {
          item.quality += 2;
        } else {
          item.quality += 1;
        }
      }
    },
  },

  'Sulfuras, Hand of Ragnaros': {
    updateQuality() {},

    updateSellIn() {},
  },

  'Backstage passes to a TAFKAL80ETC concert': {
    updateQuality(item) {
      if (item.sellIn > 0) {
        if (item.sellIn <= 5) {
          item.quality += 3;
        } else if (item.sellIn <= 10) {
          item.quality += 2;
        } else {
          item.quality += 1;
        }
      } else {
        debugger;

        item.quality = 0;
      }

      if (item.quality > 50) {
        item.quality = 50;
      }
    },
  },

  default: {
    updateQuality(item) {
      if (item.quality) {
        if (item.sellIn > 0) {
          item.quality -= 1;
        } else if (item.sellIn <= 0) {
          item.quality -= 2;
        }
      }
    },

    updateSellIn(item) {
      item.sellIn -= 1;
    },
  },
};

export class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const rule = rules[item.name] || {};

      const updateQuality = rule.updateQuality || rules.default.updateQuality;
      const updateSellIn = rule.updateSellIn || rules.default.updateSellIn;

      updateQuality(item);
      updateSellIn(item);
    });

    return this.items;
  }
}
