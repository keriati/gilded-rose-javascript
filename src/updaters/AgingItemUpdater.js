import { StandardItemUpdater } from "./StandardItemUpdater";

export class AgingItemUpdater extends StandardItemUpdater{
    matchesType(item) {
        return item.name === 'Aged Brie';
    }

    updateQuality(item) {
        this.changeQuality(item, item.sellIn > 0 ? 1 : 2);
    }
}