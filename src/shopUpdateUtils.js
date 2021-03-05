export const checkIfSpecialItem = (name) => {
  if (
    name === "Aged Brie" ||
    name === "Backstage passes to a TAFKAL80ETC concert" ||
    name === "Sulfuras, Hand of Ragnaros"
  ) {
    return true;
  }
  return false;
};

export const decreaseQualityIfPossible = (item) => {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
};

export const increaseQualityIfPossible = (item) => {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
};

export const modifyConcert = (item) => {
  if (item.sellIn < 11) {
    increaseQualityIfPossible(item);
  }
  if (item.sellIn < 6) {
    increaseQualityIfPossible(item);
  }

  if (item.sellIn < 0) {
    item.quality = 0;
  }
};
