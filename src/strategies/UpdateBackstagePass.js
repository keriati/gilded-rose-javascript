import { increaseQuality } from "../utilities/ItemModifiers";

const UpdateBackstagePass = item => {
  if (item.name !== "Backstage passes to a TAFKAL80ETC concert") return false;
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
  return true;
};
export default UpdateBackstagePass;
