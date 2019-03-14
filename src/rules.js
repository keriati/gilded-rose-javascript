import {
  mutateQuality,
} from './item';

import {
  incBy,
  decBy,
  always,
} from './utils';


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

export default rules;
