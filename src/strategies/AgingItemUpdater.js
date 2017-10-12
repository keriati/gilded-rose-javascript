import StandardItemUpdater from './StandardItemUpdater';

export default class AgingItemUpdater extends StandardItemUpdater {
    static updateQuality(item) {
        return item.sellIn > 0 ? StandardItemUpdater.changeQuality(item.quality, 1) : StandardItemUpdater.changeQuality(item.quality, 2);
    }

    static isMatchingItem(item) {
        return item.name == 'Aged Brie';
    }
}