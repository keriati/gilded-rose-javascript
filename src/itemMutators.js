import {MAX_QUALITY, MIN_QUALITY} from "./gilded_rose";

export const increaseQuality = function (item) {
    if (item.quality < MAX_QUALITY) {
        item.quality += 1;
    }
};
export const decreaseQuality = function (item) {
    if (item.quality > MIN_QUALITY) {
        item.quality -= 1;
    }
};
export const decreaseSellIn = function (item) {
    item.sellIn -= 1;
};
export const isExpired = function (item) {
    return item.sellIn < 0;
};
