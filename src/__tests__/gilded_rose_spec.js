import { Shop, Item } from "../gilded_rose";
import { AGED_BRIE, BACKSTAGE_PASSES, SULFURAS } from "../constants";

describe("Gilded Rose", () => {
  it("should have no items", () => {
    const gildedRose = new Shop();

    expect(gildedRose.items).toEqual([]);
  });

  it("should store item name", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    
    expect(gildedRose.items[0].name).toEqual("foo");
  });

  it("should have item sellIn", () => {
    const gildedRose = new Shop([new Item("foo", 10, 15)]);
    const item = gildedRose.items[0];

    expect(item).toHaveProperty("sellIn", 10);
  });

  it("should have item quality", () => {
    const gildedRose = new Shop([new Item("foo", 10, 15)]);
    const item = gildedRose.items[0];

    expect(item).toHaveProperty("quality", 15);
  });

  describe("default item ", () => {
    it("should decrease sellIn", () => {
      const gildedRose = new Shop([new Item("foo", 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("sellIn", 9);
    });

    it("should decrease quality", () => {
      const gildedRose = new Shop([new Item("foo", 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 14);
    });

    it("should not decrease quality is zero", () => {
      const gildedRose = new Shop([new Item("foo", 10, 0)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 0);
    });

    it("should not decrease quality if is zero and after sell in date", () => {
      const gildedRose = new Shop([new Item("foo", -1, 0)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 0);
    });

    it("should decrease quality twice as fast after sell date passed", () => {
      const gildedRose = new Shop([new Item("foo", 0, 10)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 8);
    });
  });

  describe("Aged Brie", () => {
    it("should decrease sellIn", () => {
      const gildedRose = new Shop([new Item(AGED_BRIE, 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("sellIn", 9);
    });

    it("should increase quality before expiration", () => {
      const gildedRose = new Shop([new Item(AGED_BRIE, 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 16);
    });

    it("should increase quality by 2 after expiration when quality < 50", () => {
      const gildedRose = new Shop([new Item(AGED_BRIE, -1, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 17);
    });

    it("should not increase quality after expiration when quality = 50", () => {
      const gildedRose = new Shop([new Item(AGED_BRIE, -1, 50)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 50);
    });

    it("should not increase quality if above 50", () => {
      const gildedRose = new Shop([new Item(AGED_BRIE, 10, 50)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 50);
    });
  });

  describe("Sulfuras", () => {
    it("should not change sellIn", () => {
      const gildedRose = new Shop([new Item(SULFURAS, 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("sellIn", 10);
    });

    it("should never change quality", () => {
      const gildedRose = new Shop([new Item(SULFURAS, 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 15);
    });

    it("should not change quality after sell in date", () => {
      const gildedRose = new Shop([new Item(SULFURAS, -1, 50)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 50);
    });
  });

  describe("Backstage passes", () => {
    it("should decrease sellIn", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("sellIn", 9);
    });

    it("should increase quality by 2 when 5 < sellIn <= 10 ", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 10, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 17);
    });

    it("should increase quality by 2 when 5 < sellIn <= 10 - case 6", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 6, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 17);
    });

    it("should increase quality by 3 when 0 < sellIn <= 5 ", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 5, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 18);
    });

    it("should increase quality by 3 when 0 < sellIn <= 5 - case 3", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 3, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 18);
    });

    it("should drop quality to zero when sellIn = 0 ", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 0, 15)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 0);
    });

    it("should increase quality by 1 when quality < 50 and sellIn >= 11", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 11, 49)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 50);
    });

    it("should increase quality by 1 when quality = 49 and sellIn < 11", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 10, 49)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 50);
    });

    it("should increase quality by 1 when quality is in <48, 49> and sellIn < 5", () => {
      const gildedRose = new Shop([new Item(BACKSTAGE_PASSES, 3, 48)]);

      gildedRose.updateQuality();

      expect(gildedRose.items[0]).toHaveProperty("quality", 50);
    });
  });
});
