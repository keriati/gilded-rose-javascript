export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  calculateQuality() {
    throw new Error("calculateQuality should be implemented in a subclass");
  }

  calculateSellIn() {
    throw new Error("calculateSellIn should be implemented in a subclass");
  }

  onEndOfTheDay() {
    this.calculateQuality();
    this.calculateSellIn();
  }
}
