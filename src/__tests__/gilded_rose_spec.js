import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

  describe("CommonItem", function () {

    it("should update quality", function () {
      const gildedRose = new Shop([
        new Item("Common item", 5, 8),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(7);
    });

    it("decreases Quality by 2 when it expires", function () {
      const gildedRose = new Shop([
        new Item("Common item", 0, 8),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(6);
    });

    it("decreases Quality not by negative", function () {
      const gildedRose = new Shop([
        new Item("Common item", 5, 0),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(0);
    });

  });

  describe("Aged Brie", function () {

    it('should update quality', function () {
      const gildedRose = new Shop([
        new Item("Aged Brie", 5, 8),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(9);
    });

    it('quality never more than 50', function () {
      const gildedRose = new Shop([
        new Item("Aged Brie", 5, 50),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(50);
    });

    it('quality increase twice when sellIn is negative', function () {
      const gildedRose = new Shop([
        new Item("Aged Brie", -5, 40),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(-6);
      expect(items[0].quality).toEqual(42);
    });

  });

  describe("Sulfuras, Hand of Ragnaros", function () {

    it('should not update sellIn and quality', function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 5, 80),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(5);
      expect(items[0].quality).toEqual(80);
    });

  });

  describe("Backstage passes to a TAFKAL80ETC concert", function () {

    it('should update quality', function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(14);
      expect(items[0].quality).toEqual(11);
    });

    it('should update quality for 10 days or less', function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(12);
    });

    it('should update quality for 5 days or less', function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(13);
    });

    it('should update quality for 0 days', function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });

    it('quality never more than 50', function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
      ]);

      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(50);
    });

  });

});
