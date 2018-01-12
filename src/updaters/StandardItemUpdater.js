import { Item } from "../gilded_rose";

const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

export class StandardItemUpdater {
    matchesType(item) {
        return true;
    }

    updateItem(item) {
        const quality = this.updateQuality(item);
        const sellIn = this.updateSellIn(item);

        return new Item(item.name, sellIn, quality);
    }
    
    updateQuality(item) {
        return this.calculateQuality(item, item.sellIn > 0 ? -1 : -2);
    }

    updateSellIn(item) {
        return item.sellIn - 1;
    }

    calculateQuality(item, qualityChange) {
        let quality = item.quality + qualityChange;
        if (quality > MAX_QUALITY) {
            quality = MAX_QUALITY;
        }
        if (quality < MIN_QUALITY) {
            quality = MIN_QUALITY;
        }
        return quality;
    }
}