import StandardItemUpdater from './StandardItemUpdater';

export default class BackstagePassUpdater extends StandardItemUpdater {
    static updateQuality(item) {
        const sellIn = item.sellIn;
        const quality = item.quality;
        if (sellIn > 10) {
            return StandardItemUpdater.changeQuality(quality, 1);
        }
        if (sellIn > 5) {
            return StandardItemUpdater.changeQuality(quality, 2);
        }
        if (sellIn > 0) {
            return StandardItemUpdater.changeQuality(quality, 3);
        }
        //after concert
        return 0;
    }
    static isMatchingItem(item) {
        return item.name.indexOf('Backstage passes') === 0;
    }
}