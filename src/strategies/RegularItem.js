import { decreaseQuality } from "../utilities/ItemModifiers";

const RegularItem = {
  updateRegularItem(item) {
    decreaseQuality(item);
    item.sellIn = item.sellIn - 1;
    if (item.sellIn < 0) {
      decreaseQuality(item);
    }
  }
};

export default RegularItem;
