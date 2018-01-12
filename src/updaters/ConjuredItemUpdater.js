import { StandardItemUpdater } from "./StandardItemUpdater";

export class ConjuredItemUpdater extends StandardItemUpdater{
    matchesType(item) {
        return item.name.indexOf('Conjured') !== -1;
    }

    updateQuality(item) {
        return this.calculateQuality(item, item.sellIn > 0 ? -2 : -4);
    }
}