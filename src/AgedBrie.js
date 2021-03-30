import {decreaseSellIn, increaseQuality, isExpired, Item} from "./item";

const AGED_BRIE = 'Aged Brie';

export class AgedBrie extends Item {
    update() {
        increaseQuality(this);
        decreaseSellIn(this);

        if (isExpired(this)) {
            increaseQuality(this);
        }
    }
    static isUsable(name) {
        return name === AGED_BRIE;
    }
}
