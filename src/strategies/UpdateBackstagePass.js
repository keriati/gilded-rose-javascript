import { increaseQuality } from "../utilities/ItemModifiers";

const UpdateBackstagePass = item => {
  increaseQuality(item);
  if (item.sellIn < 11) {
    increaseQuality(item);
  }
  if (item.sellIn < 6) {
    increaseQuality(item);
  }

  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    item.quality = item.quality - item.quality;
  }
};
export default UpdateBackstagePass;
