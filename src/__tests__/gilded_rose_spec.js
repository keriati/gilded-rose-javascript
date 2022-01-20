import { Shop, Item } from "../gilded_rose";
import { BackstagePasses, AgedBrie } from "../gilded_rose";

describe("Gilded Rose", function () {
  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new Shop([new Item("foo", 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(48);
  });

  it("Once the sell by date has did't passe, Quality degrades down by 1", () => {
    const gildedRose = new Shop([new Item("foo", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(49);
  });

  it("The Quality of an item is never negative", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });

  it("Aged Brie' actually increases in Quality the older it gets", () => {
    const gildedRose = new Shop([new Item(AgedBrie, 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });
  it("Once the sell by date has passed, Quality of the Aged Brie sould increse twice as fast", () => {
    const gildedRose = new Shop([new Item(AgedBrie, 0, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("The Quality of an item is never more than 50", () => {
    const gildedRose = new Shop([new Item(AgedBrie, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("'Sulfuras, Hand of Ragnaros', being a legendary item, never has to be decreases in Quality", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 1, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(50);
  });

  it("'Sulfuras, Hand of Ragnaros', being a legendary item, never ever has to be sold", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 50),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toEqual(10);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' actually increases in Quality the older it gets", () => {
    const gildedRose = new Shop([new Item(BackstagePasses, 12, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(1);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' quality increases by 3 when there are 5 days or less", () => {
    const gildedRose = new Shop([new Item(BackstagePasses, 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(3);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' quality increases by 2 when there are 10 days or less", () => {
    const gildedRose = new Shop([new Item(BackstagePasses, 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(2);
  });

  it("'Backstage passes to a TAFKAL80ETC concert' quality drops to 0 after the concert", () => {
    const gildedRose = new Shop([new Item(BackstagePasses, 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(0);
  });
});
