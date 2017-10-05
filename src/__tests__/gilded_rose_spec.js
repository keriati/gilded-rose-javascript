import {Shop, Item, ITEM_AGED_BRIE, ITEM_SULFURAS, ITEM_BACKSTAGE_PASSES} from '../gilded_rose';

describe('Item', () => {
  it('should have properties defined', () => {
    const item = new Item('name', 0, 0);

    expect(item.name).toBeDefined();
    expect(item.quality).toBeDefined();
    expect(item.sellIn).toBeDefined();
  });
});

describe('Gilded Rose Rules', () => {
  it('should lower quality and sellIn every day by 1', () => {
    const gildedRose = new Shop([new Item('name', 20, 10)]);

    expect(gildedRose.items[0].sellIn).toEqual(20);
    expect(gildedRose.items[0].quality).toEqual(10);

    const itemsDay1 = gildedRose.endOfDay();

    expect(itemsDay1[0].sellIn).toEqual(19);
    expect(itemsDay1[0].quality).toEqual(9);

    const itemsDay2 = gildedRose.endOfDay();

    expect(itemsDay2[0].sellIn).toEqual(18);
    expect(itemsDay2[0].quality).toEqual(8);
  });
  it('should degrade quality by 2 every day when sellIn is 0', () => {
    const gildedRose = new Shop([new Item('name', 0, 10)]);

    expect(gildedRose.items[0].quality).toEqual(10);

    const itemsDay1 = gildedRose.endOfDay();

    expect(itemsDay1[0].quality).toEqual(8);

    const itemsDay2 = gildedRose.endOfDay();

    expect(itemsDay2[0].quality).toEqual(6);
  });

  describe('Quality', () => {
    it('should not allow quality to be <0', () => {
      const gildedRose = new Shop([new Item('name', 0, 0)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(0);
    });
    it('should not allow quality to be >50', () => {
      // Aged Brie increases quality over time
      const gildedRose = new Shop([new Item(ITEM_AGED_BRIE, 0, 50)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(50);
    });
  });

  describe(`Special item: ${ITEM_AGED_BRIE}`, () => {
    it('should increase quality by 2 every day', () => {
      const gildedRose = new Shop([new Item(ITEM_AGED_BRIE, 0, 0)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(2);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].quality).toEqual(4);
    });
  });

  describe(`Special item: ${ITEM_SULFURAS}`, () => {
    it('should not decrease quality or sellIn over time', () => {
      const gildedRose = new Shop([new Item(ITEM_SULFURAS, 11, 80)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(80);
      expect(itemsDay1[0].sellIn).toEqual(11);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].quality).toEqual(80);
      expect(itemsDay2[0].sellIn).toEqual(11);
    });
  });

  describe(`Special item: ${ITEM_BACKSTAGE_PASSES}`, () => {
    it('should increase quality by 1 every day when sellIn in (Infinity, 10)  ', () => {
      const gildedRose = new Shop([new Item(ITEM_BACKSTAGE_PASSES, 45, 0)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(1);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].quality).toEqual(2);
    });
    it('should increase quality by 2 every day when sellIn in <10, 5)', () => {
      const gildedRose = new Shop([new Item(ITEM_BACKSTAGE_PASSES, 10, 0)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(2);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].quality).toEqual(4);
    });
    it('should increase quality by 3 every day when sellIn in <5, 0)', () => {
      const gildedRose = new Shop([new Item(ITEM_BACKSTAGE_PASSES, 5, 0)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(3);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].quality).toEqual(6);
    });
    it('should drop quality to 0 when sellIn is 0', () => {
      const gildedRose = new Shop([new Item(ITEM_BACKSTAGE_PASSES, 0, 30)]);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(0);
    });
  });

  describe('Special items: "Conjured ...', () => {
    it('should lower quality by 2 and sellIn by 1 every day', () => {
      // twice that fast as other items
      const gildedRose = new Shop([new Item('Conjured name', 10, 10)]);

      expect(gildedRose.items[0].sellIn).toEqual(10);
      expect(gildedRose.items[0].quality).toEqual(10);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].sellIn).toEqual(9);
      expect(itemsDay1[0].quality).toEqual(8);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].sellIn).toEqual(8);
      expect(itemsDay2[0].quality).toEqual(6);
    });
    it('should degrade quality by 4 every day when sellIn is 0', () => {
      // twice that fast as other items
      const gildedRose = new Shop([new Item('Conjured name', 0, 10)]);

      expect(gildedRose.items[0].quality).toEqual(10);

      const itemsDay1 = gildedRose.endOfDay();

      expect(itemsDay1[0].quality).toEqual(6);

      const itemsDay2 = gildedRose.endOfDay();

      expect(itemsDay2[0].quality).toEqual(2);
    });
  })
});
