export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

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

    handleNegativeSellIn(item) {
        if (item.name === "Aged Brie") {
            this.increaseQuality(item);
        } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
            item.quality = item.quality - item.quality;
        } else {
            this.decreaseQuality(item);
        }
    }

    updateQuality() {
        for (var i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const name = item.name;

            if (name === "Sulfuras, Hand of Ragnaros") {
                break;
            }

            if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
                this.increaseQualityForBackstage(item);
                if (item.sellIn < 0) {
                    item.quality = item.quality - item.quality;
                }
            }

            if (
                name === "Aged Brie" ||
                name === "Backstage passes to a TAFKAL80ETC concert"
            ) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
            } else {
                this.decreaseQuality(item);
            }

            this.decreaseSellIn(item);

            if (item.sellIn < 0) {
                this.handleNegativeSellIn(item);
            }
        }

        return this.items;
    }
}
