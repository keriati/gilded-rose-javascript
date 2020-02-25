import {decreaseQuality, decreaseSellIn, isExpired} from "../utils/helpers";

export const check = item => {
    return true;
}
export const update = item => {
    decreaseSellIn(item);
    decreaseQuality(item);
    if (isExpired(item)) {
        decreaseQuality(item);
    }
};