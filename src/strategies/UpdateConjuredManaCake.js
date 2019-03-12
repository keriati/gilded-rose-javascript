import { decreaseQuality } from "../utilities/ItemModifiers";

const UpdateConjuredManaCake = item => {
  decreaseQuality(item);
  decreaseQuality(item);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQuality(item);
    decreaseQuality(item);
  }
};
export default UpdateConjuredManaCake;
