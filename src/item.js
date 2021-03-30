export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export const QUALITY_MIN = 0;
export const QUALITY_MAX = 50;
export const SELLIN_EXPIRED = 0;

export function decreaseQuality(item) {
    if (item.quality > QUALITY_MIN) {
        item.quality -= 1;
    }
}

export function increaseQuality(item) {
    if (item.quality < QUALITY_MAX) {
        item.quality += 1;
    }
}

export function isExpired(item) {
    return item.sellIn < SELLIN_EXPIRED;
}

export function decreaseSellIn(item) {
    item.sellIn -= 1;
}