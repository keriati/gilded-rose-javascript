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
        item.quality += 1;
      }
    },

    updateQualitySpoiled(item) {
      if (item.quality < 50) {
        item.quality += 2;
      }
    },
  },

  'Sulfuras, Hand of Ragnaros': {
    updateQuality() {},

    updateQualitySpoiled() {},

    updateSellIn() {},
  },

  'Backstage passes to a TAFKAL80ETC concert': {
    updateQuality(item) {
      if (item.sellIn <= 5) {
        item.quality += 3;
      } else if (item.sellIn <= 10) {
        item.quality += 2;
      } else {
        item.quality += 1;
      }

      if (item.quality > 50) {
        item.quality = 50;
      }
    },

    updateQualitySpoiled(item) {
      item.quality = 0;
    },
  },

  default: {
    updateQuality(item) {
      if (item.quality >= 1) {
        item.quality -= 1;
      }
    },

    updateQualitySpoiled(item) {
      if (item.quality >= 2) {
        item.quality -= 2;
      }
    },

    updateSellIn(item) {
      item.sellIn -= 1;
    },

    isSpoiled(item) {
      return item.sellIn <= 0;
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
      const updateQualitySpoiled = rule.updateQualitySpoiled || rules.default.updateQualitySpoiled;
      const updateSellIn = rule.updateSellIn || rules.default.updateSellIn;
      const isSpoiled = rule.isSpoiled || rules.default.isSpoiled;

      if (isSpoiled(item)) {
        updateQualitySpoiled(item);
      } else {
        updateQuality(item);
      }

      updateSellIn(item);
    });

    return this.items;
  }
}
