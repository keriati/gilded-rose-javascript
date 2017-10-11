import {increaseQuality, isExpired, decreaseSellIn} from "../itemMutators";
import {MIN_QUALITY} from "../gilded_rose";

export const isUsableFor = function (item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
};
export const update = function (item) {
    decreaseSellIn(item);
    increaseQuality(item);

    if (item.sellIn < 10) {
        increaseQuality(item);
    }

    if (item.sellIn < 5) {
        increaseQuality(item);
    }

    if (isExpired(item)) {
        item.quality = MIN_QUALITY;
    }
};
