import {
  lensProp,
  over,
  subtract,
  inc,
  propEq,
  dec,
  clamp,
  identity,
  cond,
  T,
  always,
  compose,
  pipe,
} from 'ramda'

export class Item {
  constructor(name, sellIn, quality){
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

// specific behavior
export const updateTicketQuality = compose(
  increaseQualityFor6DaysBeforeSellDate,
  increaseQualityFor10DaysBeforeSellDate
)

// item updates
export const updateTicket = compose(
  decreaseSellIn,
  boundQuality,
  dropQualityToZeroAfterSellDate,
  updateTicketQuality,
  increaseQuality
)
export const updateCommonItem = compose(
  decreaseSellIn,
  boundQuality,
  decreaseQualityAfterSellDate,
  decreaseQuality,
)
export const updateConjuredItem = compose(
  decreaseSellIn,
  boundQuality,  
  decreaseQualityBy2
)
export const updateCheese = pipe(
  increaseQuality,
  increaseQualityAfterSellDate,
  boundQuality,
  decreaseSellIn
)
export const updateSulfuras = identity

// why no pattern matching? :)
export const updateQuality = cond([
  [isConjured, updateConjuredItem],
  [isSulfuras, updateSulfuras],
  [isCheese, updateCheese],
  [isTicket, updateTicket],
  [T, updateCommonItem],
])

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i] = updateQuality(this.items[i])
    }

    return this.items;
  }
}
