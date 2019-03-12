import { increaseQuality } from "../utilities/ItemModifiers";

const UpdateAgedBrie = item => {
  increaseQuality(item);

  item.sellIn = item.sellIn - 1;
  if (item.sellIn < 0) {
    increaseQuality(item);
  }
};
export default UpdateAgedBrie;
