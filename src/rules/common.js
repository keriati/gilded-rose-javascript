import {
  mutateQuality,
} from '../item';
import {
  decBy,
} from '../utils';


export default {
  name: 'default',
  rule: {
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
