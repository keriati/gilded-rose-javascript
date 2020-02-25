import {decreaseSellIn, increaseQuality, isExpired} from "../utils/helpers";

export const isPass = item => item.name === 'Backstage passes to a TAFKAL80ETC concert';
export const updatePass = item => {
    decreaseSellIn(item);
    increaseQuality(item);
    if (item.sellIn < 10) {
        increaseQuality(item);
    }
    if (item.sellIn < 5) {
        increaseQuality(item);
    }
    if (isExpired(item)) {
        item.quality -= item.quality;
    }
};