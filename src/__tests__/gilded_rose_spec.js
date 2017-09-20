import {Shop, Item} from '../gilded_rose'

describe('Gilded Rose', () => {

  it('should decrease value', () => {
    const sellIn = 10
    const quality = 30
    let items = [new Item('Item', sellIn, quality)]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].sellIn).toEqual(9)
    expect(items[0].quality).toEqual(29)
  })

  it('should decrease value for all', () => {
    const sellIns = [10, 8, 1]
    const qualities = [14, 47, 20]
    let items = [
      new Item('one', sellIns[0], qualities[0]),
      new Item('two', sellIns[1], qualities[1]),
      new Item('three', sellIns[2], qualities[2]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].sellIn).toEqual(9)
    expect(items[0].quality).toEqual(13)
    expect(items[1].sellIn).toEqual(7)
    expect(items[1].quality).toEqual(46)
    expect(items[2].sellIn).toEqual(0)
    expect(items[2].quality).toEqual(19)
  })

  it('should decrease quality by two after sell by date passes', () => {
    const sellIn = 0
    const quality = 4
    let items = [new Item('item', sellIn, quality)]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].quality).toEqual(2)
  })

  it('should not let quality of an item be negative', () => {
    const sellIns = [1, 0]
    const qualities = [0, 1]
    let items = [
      new Item('fresh item', sellIns[0], qualities[0]),
      new Item('expired item', sellIns[1], qualities[1]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].quality).toEqual(0)
    expect(items[1].quality).toEqual(0)
  })

  it('should make Aged Brie increase in quality the older it gets', () => {
    const sellIns = [5, 0]
    const qualities = [20, 30]
    let items = [
      new Item('Aged Brie', sellIns[0], qualities[0]),
      new Item('Aged Brie', sellIns[1], qualities[1]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].quality).toEqual(21)
    expect(items[1].quality).toEqual(32)
  })

  it('should not increase quality beyond 50', () => {
    const sellIns = [5, 0]
    const qualities = [50, 49]
    let items = [
      new Item('Aged Brie', sellIns[0], qualities[0]),
      new Item('Aged Brie', sellIns[1], qualities[1]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].quality).toEqual(50)
    expect(items[1].quality).toEqual(50)
  })

  it('should not alter Sulfuras, because it is legendary item', () => {
    const sellIns = [5, 0]
    const qualities = [50, 49]
    let items = [
      new Item('Sulfuras, Hand of Ragnaros', sellIns[0], qualities[0]),
      new Item('Sulfuras, Hand of Ragnaros', sellIns[1], qualities[1]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].sellIn).toEqual(5)
    expect(items[0].quality).toEqual(50)
    expect(items[1].sellIn).toEqual(0)
    expect(items[1].quality).toEqual(49)
  })

  it('should properly handle backstage passes', () => {
    // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
    // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or
    // less but Quality drops to 0 after the concert

    const sellIns = [12, 10, 4, 0]
    const qualities = [30, 30, 30, 30]
    let items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', sellIns[0], qualities[0]),
      new Item('Backstage passes to a TAFKAL80ETC concert', sellIns[1], qualities[1]),
      new Item('Backstage passes to a TAFKAL80ETC concert', sellIns[2], qualities[2]),
      new Item('Backstage passes to a TAFKAL80ETC concert', sellIns[3], qualities[3]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].quality).toEqual(31)
    expect(items[1].quality).toEqual(32)
    expect(items[2].quality).toEqual(33)
    expect(items[3].quality).toEqual(0)
  })

  it('should decrease value twice as fast for Conjured items', () => {
    const sellIns = [10, 0]
    const qualities = [50, 8]
    let items = [
      new Item('Conjured Dagger', sellIns[0], qualities[0]),
      new Item('Conjured Familiar', sellIns[1], qualities[1]),
    ]
    const gildedRose = new Shop(items)

    items = gildedRose.updateQuality()

    expect(items[0].sellIn).toEqual(9)
    expect(items[0].quality).toEqual(48)
    expect(items[1].sellIn).toEqual(-1)
    expect(items[1].quality).toEqual(4)
  })

})
