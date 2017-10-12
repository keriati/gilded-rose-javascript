import StandardItemUpdater from './StandardItemUpdater';

export default class LegendaryItemUpdater extends StandardItemUpdater {
    static updateQuality(item) {
        return item.quality;
    }
    static updateSellIn(item) {
        return item.sellIn;
    }
    static isMatchingItem(item) {
        return item.name === 'Sulfuras, Hand of Ragnaros';
    }
}