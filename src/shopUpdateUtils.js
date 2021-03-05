export const decreaseSellin = (item) => {
  item.sellIn = item.sellIn - 1;
};

export const decreaseQualityIfPossible = (item) => {
  const MIN_QUALITY = 0;
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1;
  }
};

export const increaseQualityIfPossible = (item) => {
  const MAX_QUALITY = 50;
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
};
