import {
  mutateQuality,
} from '../item';
import {
  incBy,
  always,
} from '../utils';


export default {
  name: 'Backstage passes to a TAFKAL80ETC concert',
  rule: {
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
};
