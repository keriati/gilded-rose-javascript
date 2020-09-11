export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const SULFURAS_TYPE = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_TYPE = 'Backstage passes to a TAFKAL80ETC concert'
const CONJURED_TYPE = 'Conjured'
const AGED_BRIE_TYPE = 'Aged Brie'

export class Shop {
    constructor(items = []) {
        this.items = items;

        this.updateQualityHandlerMap = {
            [SULFURAS_TYPE]: () => {
                // nothing to do here
            },
            [CONJURED_TYPE]: (item) => this.handleQualityUpdate(item, -2),
            [BACKSTAGE_TYPE]: (item) => this.updatePassQualityValue(item),
            [AGED_BRIE_TYPE]: (item) => this.handleQualityUpdate(item, 1)
        }

        this.defaultQualityHandler = (item) => this.handleQualityUpdate(item, -1)
    }

    updatePassQualityValue(item) {
        if (item.sellIn <= 0) {
            item.sellIn--;
            // back stage passes go to zero after concert
            item.quality = 0;
            return;
        }

        this.updateQualityValueSafely(item, 1);

        if (item.sellIn < 11) {
            this.updateQualityValueSafely(item, 1);
        }

        if (item.sellIn < 6) {
            this.updateQualityValueSafely(item, 1);
        }

        item.sellIn--;
    }

    handleQualityUpdate(item, valueToAdd) {
        this.updateQualityValueSafely(item, valueToAdd);
        item.sellIn--;
        if (item.sellIn < 0) {
            this.updateQualityValueSafely(item, valueToAdd);
        }
    }

    updateQualityValueSafely(item, valueToAdd) {
        item.quality = item.quality + valueToAdd;

        if (item.quality > 50) {
            item.quality = 50;
            return;
        }

        if (item.quality < 0) {
            item.quality = 0;
        }
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            const handler = this.updateQualityHandlerMap[item.name]

            if (handler) {
                handler(item)
                continue;
            }

            this.defaultQualityHandler(item);
        }

        return this.items;
    }
}
