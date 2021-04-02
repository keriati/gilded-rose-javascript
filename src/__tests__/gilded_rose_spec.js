import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function () {
  it("should have name foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should degrade quality and sellin by one", function () {
    const gildedRose = new Shop([new Item("foo", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toMatchObject({ name: "foo", sellIn: 9, quality: 9 });
  });

  it("should once the sell by date has passed, Quality degrades twice as fast", function () {
    const gildedRose = new Shop([new Item("foo", 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toMatchObject({ name: "foo", sellIn: -1, quality: 8 });
  });

  it("the Quality of an item should never negative", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toMatchObject({ name: "foo", sellIn: -1, quality: 0 });
  });

  describe("'Aged Brie' actually increases in Quality the older it gets", () => {
    const name = "Aged Brie";
    it("far from expired", function () {
      const gildedRose = new Shop([new Item(name, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 9,
        quality: 11,
      });
    });

    it("the day it expires", function () {
      const gildedRose = new Shop([new Item(name, 1, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 0,
        quality: 2,
      });
    });

    it("expired", function () {
      const gildedRose = new Shop([new Item(name, 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: -1,
        quality: 2,
      });
    });

    it("The Quality of an item is never more than 50", function () {
      const gildedRose = new Shop([new Item(name, 50, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 49,
        quality: 50,
      });
    });

    it("Quality increases by 2 when there are 10 days or less", function () {
      const gildedRose = new Shop([new Item(name, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 9,
        quality: 11,
      });
    });

    it("Quality increases by 3 when there are 5 days or less", function () {
      const gildedRose = new Shop([new Item(name, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 4,
        quality: 11,
      });
    });
  });

  it("'Sulfuras', being a legendary item, never has to be sold or decreases in Quality", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 10),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toMatchObject({
      name: "Sulfuras, Hand of Ragnaros",
      sellIn: 10,
      quality: 10,
    });
  });

  describe("'Backstage passes'", () => {
    const name = "Backstage passes to a TAFKAL80ETC concert";
    it("max 50 far from expiration", function () {
      const gildedRose = new Shop([new Item(name, 50, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 49,
        quality: 50,
      });
    });

    it("max 50 one day from expiration", function () {
      const gildedRose = new Shop([new Item(name, 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 0,
        quality: 50,
      });
    });

    it("Quality drops to 0 after the concert - day of expiration goes to zero", function () {
      const gildedRose = new Shop([new Item(name, 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: -1,
        quality: 0,
      });
    });

    it("Quality increases by 2 when there are 10 days or less", function () {
      const gildedRose = new Shop([new Item(name, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 9,
        quality: 12,
      });
    });

    it("Quality increases by 3 when there are 5 days or less", function () {
      const gildedRose = new Shop([new Item(name, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0]).toMatchObject({
        name,
        sellIn: 4,
        quality: 13,
      });
    });
  });

  describe("Conjured", () => {
    const name = "Conjured Mana Cake";
    describe("items degrade in Quality twice as fast as normal items", () => {
      it("before expiration", function () {
        const gildedRose = new Shop([new Item(name, 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toMatchObject({
          name,
          sellIn: 9,
          quality: 8,
        });
      });

      it("after expiration", function () {
        const gildedRose = new Shop([new Item(name, 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toMatchObject({
          name,
          sellIn: -1,
          quality: 6,
        });
      });
    });
  });
});
