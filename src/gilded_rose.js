export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const mutateQuality = (op, item) => {
  item.quality = op(item.quality);

  if (item.quality < 0) {
    item.quality = 0;
  }

  if (item.quality > 50) {
    item.quality = 50;
  }
};


const incBy = by => x => x + by;
const decBy = by => x => x - by;
const always = value => x => value;


const rules = {
  'Aged Brie': {
    updateQuality(item) {
      mutateQuality(incBy(1), item);
    },

    updateQualitySpoiled(item) {
      mutateQuality(incBy(2), item);
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
        mutateQuality(incBy(3), item);
      } else if (item.sellIn <= 10) {
        mutateQuality(incBy(2), item);
      } else {
        mutateQuality(incBy(1), item);
      }
    },

    updateQualitySpoiled(item) {
      mutateQuality(always(0), item);
    },
  },

  'Conjured Mana Cake': {
    updateQuality(item) {
      mutateQuality(decBy(2), item);
    },

    updateQualitySpoiled(item) {
      mutateQuality(decBy(4), item);
    },
  },

  default: {
    updateQuality(item) {
      mutateQuality(decBy(1), item);
    },

    updateQualitySpoiled(item) {
      mutateQuality(decBy(2), item);
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

export {
  rules,
};
