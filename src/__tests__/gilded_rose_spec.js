import {Shop, Item} from '../gilded_rose'

describe('Gilded Rose', () => {

  it('should decrease value', () => {
    const sellIn = 10
    const quality = 100
    const gildedRose = new Shop([new Item('Item', sellIn, quality)])
    const items = gildedRose.updateQuality()
    expect(items[0].quality).toEqual(99)
    expect(items[0].sellIn).toEqual(9)
  })

})
