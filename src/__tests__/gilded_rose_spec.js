import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function () {
  describe("Standard Items", () => {
    it("should decrease quality and sellIn date", function () {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 3, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Elixir of the Mongoose");
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(4);
    });
    it("should not decrease quality if <= 0", function () {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 3, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Elixir of the Mongoose");
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(0);
    });
    it("should decrease quality twice as fast if sellIn <= 0", function () {
      const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Elixir of the Mongoose");
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(3);
    });
  });
  describe("Backstage passes", () => {
    it("should increase quality by 1 when 10 < sellIn days", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 13, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(12);
      expect(items[0].quality).toEqual(6);
    });
    it("should increase quality by 2 when 5 < sellIn <= 10 days", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(7);
    });
    it("should increase quality by 3 when 0 < sellIn <= 5 days", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(8);
    });
    it("should set quality to 0 when sellIn <= 0 days", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });
  describe("Aged Brie", () => {
    it("should increase quality by 1 and decrease sellBy date ", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 3, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Aged Brie");
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(6);
    });
    it("should not increase quality if quality >= 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 13, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Aged Brie");
      expect(items[0].sellIn).toEqual(12);
      expect(items[0].quality).toEqual(50);
    });
    it("should increase quality if sellIn <= 0", function () {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 12)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Aged Brie");
      expect(items[0].sellIn).toEqual(-2);
      expect(items[0].quality).toEqual(14);
    });
  });
  describe("Sulfuras", () => {
    it("should not change quality or sellBy date", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 3, 5),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toEqual(3);
      expect(items[0].quality).toEqual(5);
    });
  });
  xdescribe("Conjured", () => {
    it("should decrease quality 2x as fast", function () {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Conjured Mana Cake");
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(3);
    });
    it("should decrease quality 4x as fast if sellIn <= 0", function () {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Conjured Mana Cake");
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(1);
    });
  });
});
