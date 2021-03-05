import { decreaseSellin, decreaseQualityIfPossible } from "../shopUpdateUtils";

class NonSpecial {
  constructor() {
    this.itemName = "Nonspecial";
  }
  update(item) {
    decreaseSellin(item);

    decreaseQualityIfPossible(item);

    if (item.sellIn < 0) {
      decreaseQualityIfPossible(item);
    }
  }
}

export default NonSpecial;
