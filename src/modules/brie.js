import {decreaseSellIn, increaseQuality, isExpired} from "../utils/helpers";

export const isBrie = item => item.name === 'Aged Brie';
export const updateBrie = item => {
    decreaseSellIn(item);
    increaseQuality(item);
    if (isExpired(item)) {
        if (isBrie(item)) {
            increaseQuality(item);
        }
    }
};