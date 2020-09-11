export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const SULFURAS_TYPE = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE_TYPE = 'Backstage passes to a TAFKAL80ETC concert'

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateBasicItemQualityValue(item) {
        if (item.quality > 0) {
            if (item.name === SULFURAS_TYPE) {
                // sulfuras does not change in value
                return;
            }
            this.updateQualityValueSafely(item, -1);
        }
    }

    updatePassQualityValue(item) {
        this.updateQualityValueSafely(item, 1);

        if (item.sellIn < 11) {
            this.updateQualityValueSafely(item, 1);
        }

        if (item.sellIn < 6) {
            this.updateQualityValueSafely(item, 1);
        }
    }

    updateConjuredQualityValueSafely(item) {
        this.updateQualityValueSafely(item, -2);
    }

    /**
     *
     * @param item
     * @param valueToAdd
     */
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

            if (item.name === SULFURAS_TYPE) {
                continue;
            }
            if (item.name === "Conjured") {
                this.updateConjuredQualityValueSafely(item);
                item.sellIn--;
                if (item.sellIn < 0) {
                    this.updateConjuredQualityValueSafely(item);
                }
                continue;
            }
            if (item.name === BACKSTAGE_TYPE) {
                this.updatePassQualityValue(item)
                item.sellIn = item.sellIn - 1;
                if (item.sellIn < 0) {
                    // back stage passes go to zero after concert
                    item.quality = 0;
                }
                continue;
            }

            /**
             * Does quality decrease without taking sellIn value in account
             */
            if (item.name === 'Aged Brie') {
                this.updateQualityValueSafely(item, 1);
            } else {
                this.updateBasicItemQualityValue(item);
            }

            /**
             * Day passes
             */
            item.sellIn = item.sellIn - 1;

            if (item.sellIn < 0) {
                if (item.name === 'Aged Brie') {
                    this.updateQualityValueSafely(item, 1);
                } else {
                    this.updateBasicItemQualityValue(item);
                }
            }
        }

        return this.items;
    }
}
