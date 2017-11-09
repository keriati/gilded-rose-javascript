import {
    TICKET_NAME,
    CHEESE_NAME,
    SULFURAS,
    CONJURED,

    Shop,
    Item, decreaseQuality, increaseQuality, increaseQualityAfterSellDate, decreaseQualityAfterSellDate,
    increaseQualityFor10DaysBeforeSellDate, increaseQualityFor6DaysBeforeSellDate, dropQualityToZeroAfterSellDate,
} from '../gilded_rose';

const updateQuality = (item) => {
    const shop = new Shop([new Item(item.name, item.sellIn, item.quality)])
    return shop.updateQuality()[0]
}

describe('Gilded Rose Helpers/Utilities', () => {
    describe('decrease quality of item older it gets', () => {
        describe('decreaseQualityAfterSellDate', () => {
            it('decrease quality when sellIn < 0', () => {
                const item = {
                    sellIn: -1,
                    quality: 0,
                }
                const actual = decreaseQualityAfterSellDate(item).quality
                expect(actual).toBe(-1)
            })

            it('leaves quality untouched when sellIn >= 0', () => {
                const item = {
                    sellIn: 0,
                    quality: 0,
                }
                const actual = decreaseQualityAfterSellDate(item).quality
                expect(actual).toBe(0)
            })
        })

        describe('dropQualityToZeroAfterSellDate', () => {
            it('decrease quality when sellIn < 0', () => {
                const item = {
                    sellIn: -1,
                    quality: 1,
                }
                const actual = dropQualityToZeroAfterSellDate(item).quality
                expect(actual).toBe(0)
            })

            it('leaves quality untouched when sellIn > 0', () => {
                const item = {
                    sellIn: 0,
                    quality: 1,
                }
                const actual = dropQualityToZeroAfterSellDate(item).quality
                expect(actual).toBe(1)
            })
        })
    })

    describe('increase quality of item older it gets', () => {
        describe('increaseQualityAfterSellDate', () => {
            it('increases quality when sellIn < 0', () => {
                const item = {
                    sellIn: -1,
                    quality: 0,
                }
                const actual = increaseQualityAfterSellDate(item).quality
                expect(actual).toBe(1)
            })

            it('leaves quality untouched when sellIn >= 0', () => {
                const item = {
                    sellIn: 0,
                    quality: 0,
                }
                const actual = increaseQualityAfterSellDate(item).quality
                expect(actual).toBe(0)
            })
        })

        describe('increaseQualityFor10DaysBeforeSellDate by 1', () => {
            it('increases quality when sellIn is < 11', () => {
                const item = {
                    sellIn: 10,
                    quality: 0,
                }
                const actual = increaseQualityFor10DaysBeforeSellDate(item).quality
                expect(actual).toBe(1)
            })

            it('leaves quality untouched if sellIn is 11', () => {
                const item = {
                    sellIn: 11,
                    quality: 0,
                }
                const actual = increaseQualityFor10DaysBeforeSellDate(item).quality
                expect(actual).toBe(0)
            })
        })

        describe('increaseQualityFor6DaysBeforeSellDate by 1', () => {
            it('increases quality when sellIn is < 6', () => {
                const item = {
                    sellIn: 5,
                    quality: 0,
                }
                const actual = increaseQualityFor6DaysBeforeSellDate(item).quality
                expect(actual).toBe(1)
            })

            it('leaves quality untouched if sellIn >= 6', () => {
                const item = {
                    sellIn: 6,
                    quality: 0,
                }
                const actual = increaseQualityFor6DaysBeforeSellDate(item).quality
                expect(actual).toBe(0)
            })
        })
    })
})

describe('Gilded Rose Behavior', () => {
    describe('general', () => {
        it('decrease sellIn ', () => {
            const item = {
                sellIn: 0,
            }
            const actual = updateQuality(item).sellIn
            expect(actual).toBe(-1)
        })

        it('boundQuality minimum to 0', () => {
            const item = {
                quality: -1,
            }
            const actual = updateQuality(item).quality
            expect(actual).toBe(0)
        })

        it('boundQuality maximum to 50', () => {
            const item = {
                quality: 51,
            }
            const actual = updateQuality(item).quality
            expect(actual).toBe(50)
        })
    })

    describe('item specific', () => {
        describe('common item', () => {
            it('decrease quality by 1 before sell date', () => {
                const item = {
                    sellIn: 0,
                    quality: 1,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(0)
            })

            it('decrease quality by 2 after sell date', () => {
                const item = {
                    sellIn: -1,
                    quality: 2,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(0)
            })
        })

        describe(`${TICKET_NAME}`, () => {
            it('increases quality by 1 if sellIn >= 11', () => {
                const item = {
                    name: TICKET_NAME,
                    sellIn: 11,
                    quality: 0,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(1)
            })

            it('increases quality by 2 if sellIn < 11', () => {
                const item = {
                    name: TICKET_NAME,
                    sellIn: 10,
                    quality: 0,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(2)
            })

            it('increases quality by 3 if sellIn < 6', () => {
                const item = {
                    name: TICKET_NAME,
                    sellIn: 5,
                    quality: 0,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(3)
            })

            it('set quality to 0 if sellIn < 0', () => {
                const item = {
                    name: TICKET_NAME,
                    sellIn: -1,
                    quality: 10,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(0)
            })
        })

        describe(`${CHEESE_NAME}`, () => {
            it('increase quality by 1', () => {
                const item = {
                    name: CHEESE_NAME,
                    sellIn: 0,
                    quality: 0,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(1)
            })

            it('increase quality by 2 if sellIn < 0', () => {
                const item = {
                    name: CHEESE_NAME,
                    sellIn: -1,
                    quality: 0,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(2)
            })
        })

        describe(`${SULFURAS}`, () => {
            it(`leaves ${SULFURAS} untouched (pointer equals)`, () => {
                const sulfuras = new Item(SULFURAS, 0, 0)
                const shop = new Shop([sulfuras])
                const actual = shop.updateQuality()[0]
                expect(actual).toBe(sulfuras)
            })

            it(`leaves ${SULFURAS} untouched (value equals)`, () => {
                const item = {name: SULFURAS}
                const actual = updateQuality(item)
                expect(actual).toEqual(item)
            })
        })

        describe(`${CONJURED}`, () => {
            it('decrease quality by 2', () => {
                const item = {
                    name: CONJURED,
                    sellIn: 0,
                    quality: 2,
                }
                const actual = updateQuality(item).quality
                expect(actual).toBe(0)
            })
        })

    })
})
