import { Shop, Item } from '../gilded_rose';

describe('Gilded Rose', function() {
  let gildedRose;
  let items;
  beforeEach(() => {
    gildedRose = new Shop([new Item('foo', 0, 1)]);
    items = gildedRose.updateQuality();
  });

  it('should foo', function() {
    expect(items[0].name).toEqual('foo');
  });

  it('sellIn present', () => {
    expect(items[0].sellIn).toBeDefined();
  });

  it('quality present', () => {
    expect(items[0].quality).toBeDefined();
  });

  it('sellIn drops', () => {
    expect(items[0].sellIn).toEqual(-1);
  });
});

describe('Quality', () => {
  function getUpdatedItems(name, sellIn, quality) {
    const gilderRose = new Shop([new Item(name, sellIn, quality)]);
    return gilderRose.updateQuality();
  }

  it('quality drops by one', () => {
    const items = getUpdatedItems('foo', 11, 20);
    expect(items[0].quality).toEqual(19);
  });

  it('quality degrades twice as fast', () => {
    const items = getUpdatedItems('foo', 0, 20);
    expect(items[0].quality).toEqual(18);
  });

  it('quality cannot be negative', () => {
    const items = getUpdatedItems('foo', 0, 0);
    expect(items[0].quality).toEqual(0);
  });

  it('Aged Brie increases the quality', () => {
    const items = getUpdatedItems('Aged Brie', 1, 0);
    expect(items[0].quality).toEqual(1);
  });

  it('Aged Brie increases the quality twice as fast', () => {
    const items = getUpdatedItems('Aged Brie', 0, 0);
    expect(items[0].quality).toEqual(2);
  });

  it('maximum quality is 50', () => {
    const items = getUpdatedItems('Aged Brie', 0, 50);
    expect(items[0].quality).toEqual(50);
  });

  it("sulfuras quality and sellIn don't change", () => {
    const items = getUpdatedItems('Sulfuras, Hand of Ragnaros', 10, 10);
    expect(items[0].quality).toEqual(10);
    expect(items[0].sellIn).toEqual(10);
  });
});
