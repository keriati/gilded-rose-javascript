import { Shop, Item } from "../gilded_rose";

function createItem({ name, sellIn, quality }) {
  return new Item(name, sellIn, quality);
}

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([
      createItem({ name: "foo", sellIn: 0, quality: 0 }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should have correct quality", function () {
    const gildedRose = new Shop([
      createItem({ name: "foo", sellIn: 0, quality: 0 }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("should have correct sell in", function () {
    const gildedRose = new Shop([
      createItem({ name: "foo", sellIn: 0, quality: 0 }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(-1);
  });

  it("Aged Brie should have correct quality with", function () {
    const gildedRose = new Shop([
      createItem({ name: "Aged Brie", sellIn: 5, quality: 1 }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("Quality should have value up to 50", function () {
    const gildedRose = new Shop([
      createItem({ name: "Aged Brie", sellIn: 52, quality: 50 }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeLessThanOrEqual(50);
  });

  it("Sulfuras has always the same quality and sell in", function () {
    const gildedRose = new Shop([
      createItem({ name: "Sulfuras, Hand of Ragnaros", sellIn: 5, quality: 4 }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
    expect(items[0].sellIn).toEqual(5);
  });

  it("Backstage passes should have correct quality - sellIn > 10", function () {
    const gildedRose = new Shop([
      createItem({
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 11,
        quality: 1,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("Backstage passes should have correct quality - sellIn 5 to 10", function () {
    const gildedRose = new Shop([
      createItem({
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 9,
        quality: 1,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("Backstage passes should have correct quality - sellIn lesser 5", function () {
    const gildedRose = new Shop([
      createItem({
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 4,
        quality: 1,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  });

  it("Backstage passes should have correct quality - sellIn equal 0", function () {
    const gildedRose = new Shop([
      createItem({
        name: "Backstage passes to a TAFKAL80ETC concert",
        sellIn: 0,
        quality: 10,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Quality decrease by 2 if sell in is lesser or equal 0", function () {
    const gildedRose = new Shop([
      createItem({
        name: "xxx",
        sellIn: -1,
        quality: 3,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("The Quality of an item is never negative", function () {
    const gildedRose = new Shop([
      createItem({
        name: "xxx",
        sellIn: 3,
        quality: 0,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(0);
  });

  it("The Quality of Aged Brie is increasing up to 50", function () {
    const gildedRose = new Shop([
      createItem({
        name: "Aged Brie",
        sellIn: -1,
        quality: 48,
      }),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeGreaterThanOrEqual(50);
  });
});
