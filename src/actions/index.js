import { MAX_QUALITY, MIN_QUALITY } from "../constants";

export const decreaseSellIn = item => {
  item.sellIn = item.sellIn - 1;
};

export const decreaseQuality = item => {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1;
  }
};

export const increaseQuality = item => {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
};

export const setZeroQuality = item => {
  item.quality = item.quality - item.quality;
};
