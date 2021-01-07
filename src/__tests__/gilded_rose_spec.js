import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function () {
  describe("Sell in", function () {
    it("descreses sell in by 1", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
    });
  });

  describe("Quality", function () {
    it("descreses quality by 1", function () {
      const gildedRose = new Shop([new Item("foo", 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("cannot be negative", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("descreses quality by 2 when expires", function () {
      const gildedRose = new Shop([new Item("foo", 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("increases by 1 when not expired for Aged Brie", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(3);
    });

    it("increases by 2 when expired for Aged Brie", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(4);
    });

    it("is never more than 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("is not changing for Sulfuras, Hand of Ragnaros", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 0, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(40);
    });

    it("increases by 2 when there are 10 days or less for Backstage passes", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(12);
    });

    it("increases by 3 when there are 5 days or less for Backstage passes", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(13);
    });

    it("equals to 0 after the concert for Backstage passes", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("incerases by 1 when there are 11 and more days to sell in for Backstage passes", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(11);
    });
  });
});
