import { decreaseQualityIfPossible } from "../shopUpdateUtils";

class Conjured {
  constructor() {
    this.itemName = "Conjured";
  }
  update(item) {
    decreaseQualityIfPossible(item);
    decreaseQualityIfPossible(item);
  }
}

export default Conjured;
