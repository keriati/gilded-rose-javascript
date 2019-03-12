import RegularItem from "../strategies/RegularItem";
import UpdateBackstagePass from "../strategies/UpdateBackstagePass";
import UpdateAgedBrie from "../strategies/UpdateAgedBrie";
import UpdateConjuredManaCake from "../strategies/UpdateConjuredManaCake";

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item, key) => {
      switch (item.name) {
        case "Aged Brie":
          UpdateAgedBrie(item);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          UpdateBackstagePass(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Conjured Mana Cake":
          UpdateConjuredManaCake(item);
          break;

        default:
          RegularItem.updateRegularItem(item);
          break;
      }
    });

    return this.items;
  }
}
export default Shop;
