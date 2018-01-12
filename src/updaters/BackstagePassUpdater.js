import { StandardItemUpdater } from "./StandardItemUpdater";

const BACKSTAGE_PRICE_1_DEADLINE = 10;
const BACKSTAGE_PRICE_2_DEADLINE = 5;

export class BackstagePassUpdater extends StandardItemUpdater {
    matchesType(item) {
        return item.name === 'Backstage passes to a TAFKAL80ETC concert';
    }

    updateQuality(item) {
        if (item.sellIn > BACKSTAGE_PRICE_1_DEADLINE) {
            this.changeQuality(item, 1);
        } else if (item.sellIn > BACKSTAGE_PRICE_2_DEADLINE) {
            this.changeQuality(item, 2);
        } else if (item.sellIn > 0) {
            this.changeQuality(item, 3);
        } else {
            item.quality = 0;
        }
    }
}