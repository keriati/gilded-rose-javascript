import { Shop, Item } from "../gilded_rose";

describe("Shop", function () {
  describe("for normal item", () => {
    it("should decrease quality by 1", function () {
      const gildedRose = new Shop([new Item("Normal Item", 2, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(2);
    });
    it("should decrease quality by 2 when we passed sell by date", function () {
      const gildedRose = new Shop([new Item("Normal Item", 0, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(1);
    });
    it("should not decrease quality when it reach 0", function () {
      const gildedRose = new Shop([new Item("Normal Item", 0, 0)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(0);
    });
    it("should decrease sell in by 1", function () {
      const gildedRose = new Shop([new Item("Normal Item", 2, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toEqual(1);
    });
  });
  describe("for aged brie", () => {
    it("should increase quality by 1", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(4);
    });
    it("should increase quality by 2 when we passed sell by date", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(5);
    });
    it("should not increase quality when it reach 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(50);
    });
    it("should decrease sell in by 1", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toEqual(1);
    });
  });
  describe("for Sulfuras", () => {
    it("should not change quality", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 2, 80),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(80);
    });
    it("should not change sell in value", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 2, 3),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toEqual(2);
    });
  });
  describe("for Backstage passes", () => {
    it("should increase quality by 1", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 3),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(4);
    });
    it("should increase quality by 2", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 3),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(5);
    });
    it("should increase quality by 3", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 3),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(6);
    });
    it("should drop quality to 0 after to concert", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 3),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(0);
    });
    it("should not increase quality when it reach 50", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(50);
    });
    it("should decrease sell in by 1", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 2, 3),
      ]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toEqual(1);
    });
  });
  describe("for conjured item", () => {
    it("should decrease quality by 2", function () {
      const gildedRose = new Shop([new Item("Conjured", 2, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(1);
    });
    it("should decrease quality by 4 when we passed sell by date", function () {
      const gildedRose = new Shop([new Item("Conjured", 0, 4)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.quality).toEqual(0);
    });
    it("quality should not be negative", function () {
        const gildedRose = new Shop([new Item("Conjured", 0, 3)]);
        const item = gildedRose.updateQuality()[0];
        expect(item.quality).toEqual(0);
      });
    // it("should not decrease quality when it reach 0", function () {
    //   const gildedRose = new Shop([new Item("Conjured", 0, 0)]);
    //   const item = gildedRose.updateQuality()[0];
    //   expect(item.quality).toEqual(0);
    // });
    it("should decrease sell in by 1", function () {
      const gildedRose = new Shop([new Item("Conjured", 2, 3)]);
      const item = gildedRose.updateQuality()[0];
      expect(item.sellIn).toEqual(1);
    });
  });
});
