import {decreaseSellIn, increaseQuality, isExpired} from "../utils/helpers";

export const check = item => item.name === 'Aged Brie';
export const update = item => {
    decreaseSellIn(item);
    increaseQuality(item);
    if (isExpired(item)) {
        increaseQuality(item);
    }
};