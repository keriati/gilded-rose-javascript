import {
  TICKET_NAME,
  CHEESE_NAME,
  SULFURAS,
  CONJURED,

  Shop,
  Item,
} from '../gilded_rose';


const QUALITY_GT_0 = 1
const QUALITY_0 = 0
const QUALITY_LT_0 = -1

const QUALITY_GT_50 = 51
const QUALITY_50 = 50

const QUALITY_1 = 1
const QUALITY_2 = 2
const QUALITY_3 = 3
const QUALITY_10 = 10


const SELL_IN_1 = 1
const SELL_IN_LT_ZERO = -1
const SELL_IN_ZERO = 0

// cheese
const SELL_IN_GT_TEN = 11
const SELL_IN_BETWEEN_11_AND_6 = 6
const SELL_IN_LT_6 = 5

const updateQuality = (item) => {
  const shop = new Shop([new Item(item.name, item.sellIn, item.quality)])
  return shop.updateQuality()[0]
}

describe('Gilded Rose', function () {
  describe('quality mechanism', () => {
    describe('common behvaior', () => {

      it('decrease every item quality by 1 if quality > 0', () => {
        const item = { quality: QUALITY_GT_0 }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_0)
      })

      it('bounds minimum quality to 0', () => {
        const item = { quality: QUALITY_LT_0 }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_0)
      })

      it('bounds quality maximum to 50', () => {
        const item = { quality: QUALITY_GT_50 }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_50)
      })

      it(`set quality to 0 if sellIn < 0`, () => {
        const item = { 
          quality: QUALITY_GT_0,
          sellIn: SELL_IN_LT_ZERO,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_0)
      })
      
      it(`decrease quality by 2 if sellIn < 0`, () => {
        const item = { 
          quality: QUALITY_2,
          sellIn: SELL_IN_LT_ZERO,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_0)
      })
    })


    describe(`${CHEESE_NAME}`, () => {
      it(`increase quality by 1 if quality < 50`, () => {
        const item = {
          name: CHEESE_NAME, 
          quality: QUALITY_0,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_1)
      })

      it(`increase quality by 2 if sellIn < 0`, () => {
        const item = {
          name: CHEESE_NAME, 
          quality: QUALITY_0,
          sellIn: QUALITY_LT_0,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_2)
      })
    })

    describe(`${CONJURED}`, () => {
      it(`decrease quality by 2`, () => {
        const item = {
          name: CONJURED,
          quality: QUALITY_2, 
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_0)
      })
    })

    describe(`${TICKET_NAME}`, () => {
      const ticket = {
        name: TICKET_NAME,
        quality: QUALITY_0,
        sellIn: SELL_IN_GT_TEN,
      }


      it(`increase quality by 1 if sellIn > 10`, () => {
        const item = { ...ticket }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_1)
      })


      it(`increase quality by 2 if 11 > sellIn > 6`, () => {
        const item = {
          ...ticket,
          sellIn: SELL_IN_BETWEEN_11_AND_6,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_2)
      })


      it(`increase quality by 3 if sellIn < 6`, () => {
        const item = {
          ...ticket,
          sellIn: SELL_IN_LT_6,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_3)
      })


      it(`set quality to 0 if sellIn < 0`, () => {
        const item = {
          ...ticket,
          quality: QUALITY_10,
          sellIn: SELL_IN_LT_ZERO,
        }

        const actual = updateQuality(item).quality

        expect(actual).toBe(QUALITY_0)
      })
    })
  })

  describe('sellIn mechanism', () => {
    it(`decrease item sellIn for every item except ${SULFURAS}`, () => {
      const item = { sellIn: SELL_IN_1 }

      const actual = updateQuality(item).sellIn

      expect(actual).toBe(SELL_IN_ZERO)
    })
  })

  describe(`${SULFURAS}`, () => {
    it(`leaves quality untouched`, () => {
      const item = {
        name: SULFURAS, 
        quality: QUALITY_GT_0,
      }

      const actual = updateQuality(item).quality

      expect(actual).toBe(QUALITY_GT_0)
    })

    it(`leaves sellIn untouched`, () => {
      const item = {
        name: SULFURAS,
        sellIn: SELL_IN_1,
      }

      const actual = updateQuality(item).sellIn

      expect(actual).toBe(SELL_IN_1)
    })

  })
});
