import { increaseQuality } from "../utilities/ItemModifiers";

const UpdateAgedBrie = item => {
  if (item.name !== "Aged Brie") return false;
  increaseQuality(item);

  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    increaseQuality(item);
  }
  return true;
};
export default UpdateAgedBrie;
