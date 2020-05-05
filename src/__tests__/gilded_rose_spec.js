import { Shop, Item } from '../gilded_rose';

describe('Gilded Rose', function () {
  it('should foo', function () {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('foo');
  });

  it('new Test', function () {
    const myCustomShop = new Shop([new Item('newItem', 6, 2)]);
    const items = myCustomShop.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it('selling Test - lowering sellin', function () {
    const myCustomShop = new Shop([new Item('newItem2', 4, 2)]);
    const items = myCustomShop.updateQuality();
    expect(items[0].sellIn).toEqual(3);
  });

  it('selling Test 3 - degrading quality', function () {
    const myCustomShop = new Shop([new Item('newItem3', 0, 2)]);
    const items = myCustomShop.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it('selling Test 4 - quality is never negative', function () {
    const myCustomShop = new Shop([new Item('newItem4', 2, 0)]);
    const items = myCustomShop.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it('selling Test 5 - "Aged Brie" actually increases in Quality the older it gets', function () {
    const myCustomShop = new Shop([new Item('Aged Brie', 2, 2)]);
    const items = myCustomShop.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it('selling Test 6 - The Quality of an item is never more than 50', function () {
    const myCustomShop = new Shop([new Item('Aged Brie', 2, 50)]);
    const items = myCustomShop.updateQuality();
    expect(items[0].quality).toEqual(50);
  });
});
