import {
  mutateQuality,
} from '../item';
import {
  incBy,
} from '../utils';


export default {
  name: 'Aged Brie',
  rule: {
    updateQuality(item) {
      mutateQuality(incBy(1), item);
    },

    updateQualitySpoiled(item) {
      mutateQuality(incBy(2), item);
    },
  },
};
