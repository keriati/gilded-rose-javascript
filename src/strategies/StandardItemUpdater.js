const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

export default class StandardItemUpdater {

    static updateQuality(item) {
        return item.sellIn > 0 ?
            StandardItemUpdater.changeQuality(item.quality, -1)
            : StandardItemUpdater.changeQuality(item.quality, -2);
    }

    static updateSellIn(item) {
        return item.sellIn - 1;
    }

    static isMatchingItem() {
        return true
    }

    static changeQuality(quality, difference) {
        var retVal = quality + difference;
        if (retVal > MAX_QUALITY) {
            return MAX_QUALITY;
        }
        if (retVal < MIN_QUALITY) {
            return MIN_QUALITY;
        }
        return retVal;
    }
}