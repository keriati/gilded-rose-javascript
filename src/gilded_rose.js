export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

/*
"Sulfuras, Hand of Ragnaros
Backstage passes to a TAFKAL80ETC concert
Aged Brie
*/

const ITEM_TYPES = {
    SULFURAS: "Sulfuras, Hand of Ragnaros",
    BACKSTAGE: "Backstage passes to a TAFKAL80ETC concert",
    AGED_BRIE: "Aged Brie",
};

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    decreaseQuality(item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1;
        }
    }

    increaseQuality(item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    decreaseSellIn(item) {
        item.sellIn = item.sellIn - 1;
    }

    increaseQualityForBackstage(item) {
        if (item.sellIn < 11) {
            this.increaseQuality(item);
        }
        if (item.sellIn < 6) {
            this.increaseQuality(item);
        }
    }

    updateBackStageItem(item) {
        this.increaseQualityForBackstage(item);

        this.increaseQuality(item);

        this.decreaseSellIn(item);

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    updateAgedBrie(item) {
        this.increaseQuality(item);

        this.decreaseSellIn(item);

        if (item.sellIn < 0) {
            this.increaseQuality(item);
        }
    }

    updateGeneralItem(item) {
        this.decreaseQuality(item);

        this.decreaseSellIn(item);

        if (item.sellIn < 0) {
            this.decreaseQuality(item);
        }
    }

    updateShopItems() {
        this.items.forEach((item) => {
            const name = item.name;
            if (name === ITEM_TYPES.SULFURAS) {
                return;
            }

            if (name === ITEM_TYPES.BACKSTAGE) {
                this.updateBackStageItem(item);
                return;
            }

            if (name === ITEM_TYPES.AGED_BRIE) {
                this.updateAgedBrie(item);
                return;
            }

            this.updateGeneralItem(item);
        });

        return this.items;
    }
}
