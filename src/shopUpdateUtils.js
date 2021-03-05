export const decreaseSellinIfNeeded = (item) => {
  if (item.name != "Sulfuras, Hand of Ragnaros") {
    item.sellIn = item.sellIn - 1;
  }
};

export const checkIfSpecialItem = (name) => {
  if (
    name === "Aged Brie" ||
    name === "Backstage passes to a TAFKAL80ETC concert" ||
    name === "Sulfuras, Hand of Ragnaros" ||
    name === "Conjured"
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
  const MAX_QUALITY = 50;
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
};

export const modifyConcert = (item) => {
  increaseQualityIfPossible(item);
  if (item.sellIn < 10) {
    increaseQualityIfPossible(item);
  }
  if (item.sellIn < 5) {
    increaseQualityIfPossible(item);
  }

  if (item.sellIn < 0) {
    item.quality = 0;
  }
};

export const modifyNonSpecialItem = (item) => {
  //not special item
  if (!checkIfSpecialItem(item.name)) {
    decreaseQualityIfPossible(item);

    if (item.sellIn < 0) {
      decreaseQualityIfPossible(item);
    }
  }
};

export const modifyBrie = (item) => {
  increaseQualityIfPossible(item);

  if (item.sellIn < 0) {
    increaseQualityIfPossible(item);
  }
};
