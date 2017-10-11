import {increaseQuality, isExpired, decreaseSellIn} from "../itemMutators";

export const isUsableFor = function (item) {
    return item.name === 'Aged Brie';
};
export const update = function (item) {
    decreaseSellIn(item);
    increaseQuality(item);

    if (isExpired(item)) {
        increaseQuality(item);
    }
};
