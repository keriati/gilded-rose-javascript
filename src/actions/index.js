import { MAX_QUALITY, MIN_QUALITY } from "../constants";

export const decreaseSellIn = item => {
  --item.sellIn;
};

export const decreaseQuality = (item, decrement = 1) => {
  item.quality = item.quality - decrement;
  if (item.quality < MIN_QUALITY) {
    setZeroQuality(item);
  }
};

export const increaseQuality = item => {
  if (item.quality < MAX_QUALITY) {
    ++item.quality;
  }
};

export const setZeroQuality = item => {
  item.quality = MIN_QUALITY;
};
