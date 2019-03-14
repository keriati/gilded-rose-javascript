import {
  mutateQuality,
} from '../item';
import {
  decBy,
} from '../utils';


export default {
  name: 'Conjured Mana Cake',
  rule: {
    updateQuality(item) {
      mutateQuality(decBy(2), item);
    },

    updateQualitySpoiled(item) {
      mutateQuality(decBy(4), item);
    },
  },
};
