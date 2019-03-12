import UpdateRegularItem from "../strategies/UpdateRegularItem";
import UpdateBackstagePass from "../strategies/UpdateBackstagePass";
import UpdateAgedBrie from "../strategies/UpdateAgedBrie";
import UpdateConjuredManaCake from "../strategies/UpdateConjuredManaCake";
import UpdateSulfuras from "../strategies/UpdateSulfuras";

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item, key) => {
      UpdateAgedBrie(item) ||
        UpdateBackstagePass(item) ||
        UpdateConjuredManaCake(item) ||
        UpdateSulfuras(item) ||
        UpdateRegularItem(item);
    });

    return this.items;
  }
}
export default Shop;
