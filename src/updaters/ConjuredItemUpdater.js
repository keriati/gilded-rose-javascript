import { StandardItemUpdater } from "./StandardItemUpdater";

export class ConjuredItemUpdater extends StandardItemUpdater{
    matchesType(item) {
        return item.name.indexOf('Conjured') !== -1;
    }

    updateQuality(item) {
        this.changeQuality(item, item.sellIn > 0 ? -2 : -4);
    }
}