import { decreaseQuality } from "../utilities/ItemModifiers";

const UpdateRegularItem = item => {
  decreaseQuality(item);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQuality(item);
  }
};

export default UpdateRegularItem;
