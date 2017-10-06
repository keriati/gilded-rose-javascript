export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';
export const SULFURAS = 'Sulfuras, Hand of Ragnaros';
export const CONJURED = 'Conjured Mana Cake';
export const MIN_QUALITY = 0;
export const MAX_QUALITY = 50;

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

    updateQuality() {
        this.items.forEach(mutateItem);

        return this.items;
    }
}

function isAgedBrieItem(item) {
    return item.name === AGED_BRIE;
}

function isBackstageItem(item) {
    return item.name === BACKSTAGE;
}

function isSulfurasItem(item) {
    return item.name === SULFURAS;
}

function isConjuredItem(item) {
    return item.name === CONJURED;
}

function mutateItem(item) {
    if (isAgedBrieItem(item)) {
        mutateAgedBrieItem(item);
        return;
    }

    if (isBackstageItem(item)) {
        mutateBackstageItem(item);
        return;
    }

    if (isConjuredItem(item)) {
        mutateConjuredItem(item);
        return;
    }

    if (!isSulfurasItem(item)) {
        mutateDefaultItem(item);
    }
}

function mutateAgedBrieItem(item) {
    incrementItemQuality(item);

    if (item.sellIn < 0) {
        incrementItemQuality(item);
    }

    decrementItemSellIn(item);
}

function mutateBackstageItem(item) {
    const TEN_DAYS_BORDER = 10;
    const FIVE_DAYS_BORDER = 5;

    incrementItemQuality(item);

    if (item.sellIn <= TEN_DAYS_BORDER) {
        incrementItemQuality(item);
    }

    if (item.sellIn <= FIVE_DAYS_BORDER) {
        incrementItemQuality(item);
    }

    if (isSellInOutdated(item)) {
        resetItemQuality(item);
    }

    decrementItemSellIn(item);
}

function mutateConjuredItem(item) {
    decrementItemQuality(item);
    decrementItemQuality(item);

    if (isSellInOutdated(item)) {
        decrementItemQuality(item);
        decrementItemQuality(item);
    }

    decrementItemSellIn(item);
}

function mutateDefaultItem(item) {
    decrementItemQuality(item);

    if (isSellInOutdated(item)) {
        decrementItemQuality(item);
    }

    decrementItemSellIn(item);
}

function incrementItemQuality(item) {
    item.quality = limitItemQuality(item.quality + 1);
}

function decrementItemQuality(item) {
    item.quality = limitItemQuality(item.quality - 1);
}

function limitItemQuality(quality) {
    const limitedToMax = Math.min(quality, MAX_QUALITY);

    // TODO: Discuss with Attila redundant variables when they increase readability.
    const limitedToMin = Math.max(limitedToMax, MIN_QUALITY);

    return limitedToMin;
}

function resetItemQuality(item) {
    item.quality = 0;
}

function decrementItemSellIn(item) {
    item.sellIn -= 1;
}

function isSellInOutdated(item) {
    return item.sellIn <= 0;
}


