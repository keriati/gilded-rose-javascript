import {decreaseSellIn, increaseQuality, isExpired, Item, QUALITY_MIN} from "./item";

const BACKSTAGE_PASS = 'Backstage passes to a TAFKAL80ETC concert';

export class BackstagePass extends Item {
    update() {
        increaseQuality(this);
        if (this.sellIn < 11) {
            increaseQuality(this);
        }
        if (this.sellIn < 6) {
            increaseQuality(this);
        }
        decreaseSellIn(this);
        if (isExpired(this)) {
            this.quality = QUALITY_MIN;
        }
    }
    static isUsable(name) {
        return name === BACKSTAGE_PASS;
    }
}
