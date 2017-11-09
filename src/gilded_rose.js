import {
    lensProp,
    over,
    subtract,
    inc,
    propEq,
    dec,
    clamp,
    cond,
    always,
    compose,
    allPass,
    ifElse,
    identity,
} from 'ramda'

export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}


export const TICKET_NAME = 'Backstage passes to a TAFKAL80ETC concert'
export const CHEESE_NAME = 'Aged Brie'
export const SULFURAS = 'Sulfuras, Hand of Ragnaros'
export const CONJURED = 'Conjured Mana Cake'

export const QUALITY = 'quality'
export const SELL_IN = 'sellIn'
export const NAME = 'name'

// helpers, utils
export const nameEqual = propEq(NAME)
export const isCheese = nameEqual(CHEESE_NAME)
export const isTicket = nameEqual(TICKET_NAME)
export const isSulfuras = nameEqual(SULFURAS)
export const isConjured = nameEqual(CONJURED)
export const isCommonItem = (item) => !allPass[isConjured, isSulfuras, isCheese, isTicket]

export const qualityLens = lensProp(QUALITY)
export const overQuality = over(qualityLens)

export const qualityBoundaries = clamp(0, 50)
export const increaseQuality = overQuality(inc)
export const decreaseQuality = overQuality(dec)
export const decreaseQualityBy2 = over(qualityLens, subtract(2))
export const boundQuality = overQuality(qualityBoundaries)

export const sellInLens = lensProp(SELL_IN)
export const decreaseSellIn = over(sellInLens, dec)

export const increaseQualityAfterSellDate = (item) => {
    return item.sellIn < 0 ? increaseQuality(item) : item
}
export const decreaseQualityAfterSellDate = (item) => {
    return item.sellIn < 0 ? decreaseQuality(item) : item
}
export const increaseQualityFor10DaysBeforeSellDate = (item) => {
    return item.sellIn < 11 ? increaseQuality(item) : item
}
export const increaseQualityFor6DaysBeforeSellDate = (item) => {
    return item.sellIn < 6 ? increaseQuality(item) : item
}
export const dropQualityToZeroAfterSellDate = (item) => {
    return item.sellIn < 0 ? overQuality(always(0), item) : item
}


// item updates
export const updateCommonItem = compose(
    decreaseQualityAfterSellDate,
    decreaseQuality,
)
export const updateTicket = compose(
    dropQualityToZeroAfterSellDate,
    increaseQualityFor6DaysBeforeSellDate,
    increaseQualityFor10DaysBeforeSellDate,
    increaseQuality
)
export const updateCheese = compose(
    increaseQualityAfterSellDate,
    increaseQuality,
)
export const updateConjuredItem = item => {
   return isConjured(item) ? decreaseQualityBy2(item) : item
}

// general
export const updateQuality = cond([
    [isConjured, updateConjuredItem],
    [isCheese, updateCheese],
    [isTicket, updateTicket],
    [isCommonItem, updateCommonItem],
])

export const update = compose(
    decreaseSellIn,
    boundQuality,
    updateQuality
)

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            this.items[i] = isSulfuras(item) ? item : update(item)
        }

        return this.items;
    }
}
