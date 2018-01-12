const MIN_QUALITY = 0;
const MAX_QUALITY = 50;

export class StandardItemUpdater {
    matchesType(item) {
        return true;
    }

    updateItem(item) {
        this.updateQuality(item);
        this.updateSellIn(item);
    }
    
    updateQuality(item) {
        this.changeQuality(item, item.sellIn > 0 ? -1 : -2);
    }

    updateSellIn(item) {
        item.sellIn = item.sellIn - 1;
    }

    changeQuality(item, qualityChange) {
        item.quality += qualityChange;
        if (item.quality > MAX_QUALITY) {
            item.quality = MAX_QUALITY;
        }
        if (item.quality < MIN_QUALITY) {
            item.quality = MIN_QUALITY;
        }
    }
}