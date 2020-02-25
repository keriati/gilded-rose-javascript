import {decreaseQuality, decreaseSellIn, isExpired} from "../utils/helpers";

export const updateRegular = item => {
    decreaseSellIn(item);
    decreaseQuality(item);
    if (isExpired(item)) {
        decreaseQuality(item);
    }
};