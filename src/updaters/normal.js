import {
    decreaseQuality, decreaseSellIn, isExpired
} from "../itemMutators";

export const update = function (item) {
    decreaseSellIn(item);
    decreaseQuality(item);

    if (isExpired(item)) {
        decreaseQuality(item);
    }
};
