import { decreaseQuality } from "../utilities/ItemModifiers";

const UpdateConjuredManaCake = item => {
  if (item.name !== "Conjured Mana Cake") return false;
  decreaseQuality(item);
  decreaseQuality(item);
  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    decreaseQuality(item);
    decreaseQuality(item);
  }
  return true;
};
export default UpdateConjuredManaCake;
