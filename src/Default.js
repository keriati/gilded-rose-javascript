import {decreaseQuality, decreaseSellIn, isExpired, Item} from "./item";

export class Default extends Item {
    update() {
        decreaseQuality(this);
        decreaseSellIn(this);

        if (isExpired(this)) {
            decreaseQuality(this);
        }
    }
    static isUsable(name) {
        return true;
    }
}
