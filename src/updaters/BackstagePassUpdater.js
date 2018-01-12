import { StandardItemUpdater } from "./StandardItemUpdater";

const BACKSTAGE_PRICE_1_DEADLINE = 10;
const BACKSTAGE_PRICE_2_DEADLINE = 5;

export class BackstagePassUpdater extends StandardItemUpdater {
    matchesType(item) {
        return item.name === 'Backstage passes to a TAFKAL80ETC concert';
    }

    updateQuality(item) {
        if (item.sellIn > BACKSTAGE_PRICE_1_DEADLINE) {
            return this.calculateQuality(item, 1);
        } else if (item.sellIn > BACKSTAGE_PRICE_2_DEADLINE) {
            return this.calculateQuality(item, 2);
        } else if (item.sellIn > 0) {
            return this.calculateQuality(item, 3);
        } else {
            return 0;
        }
    }
}