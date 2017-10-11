import {decreaseQuality, isExpired, decreaseSellIn} from "../itemMutators";

export const isUsableFor = function (item) {
    return item.name === 'Conjured Mana Cake';
};
export const update = function (item) {
    decreaseSellIn(item);
    decreaseQuality(item);
    decreaseQuality(item);

    if (isExpired(item)) {
        decreaseQuality(item);
        decreaseQuality(item);
    }
};
