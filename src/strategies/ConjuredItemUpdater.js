import StandardItemUpdater from './StandardItemUpdater';

export default class ConjuredItemUpdater extends StandardItemUpdater {
    static updateQuality(item) {
        return item.sellIn > 0 ?
            StandardItemUpdater.changeQuality(item.quality, -2)
            : StandardItemUpdater.changeQuality(item.quality, -4);
    }

    static isMatchingItem(item) {
        return item.name.indexOf('Conjured') === 0;
    }
}