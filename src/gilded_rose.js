import {getItemUpdaterFor} from "./updaters/updateFactory";

export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const MIN_QUALITY = 0;
export const MAX_QUALITY = 50;

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach((item) => {
            const itemUpdater = getItemUpdaterFor(item);
            itemUpdater.update(item);
        });
    }
}
