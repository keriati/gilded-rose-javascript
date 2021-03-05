import { Shop } from "../gilded_rose";
import { Item } from "../Item";

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("Once the sell by date has passed, Quality degrades twice as fast", function () {
    // decrease quality rate 1-> 2
    const items = [];
    items.push(new Item("+5 Dexterity Vest", 0, 20));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1DecreasedQuality = 18; //decreased by 2
    expect(items[0].quality).toEqual(day1DecreasedQuality);
  });

  it("should decrease sellIn of +5 Dexterity Vest", function () {
    const items = [];
    items.push(new Item("+5 Dexterity Vest", 1, 20));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1DecreasedSellIn = 0; //decreased by one
    expect(items[0].sellIn).toEqual(day1DecreasedSellIn);

    //day 2
    gildedRose.updateQuality();
    const day2DecreasedSellIn = -1; //decreased by one
    expect(items[0].sellIn).toEqual(day2DecreasedSellIn);
  });

  it("should keep quality of +5 Dexterity Vest", function () {
    const items = [];
    items.push(new Item("+5 Dexterity Vest", 1, 1));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1DecreasedQuality = 0; //decreased by one
    expect(items[0].quality).toEqual(day1DecreasedQuality);

    //day 2
    gildedRose.updateQuality();
    const day2DecreasedQuality = 0; //decreased by one
    expect(items[0].quality).toEqual(day2DecreasedQuality);
  });

  it("Conjured items degrade in Quality twice as fast as normal items", function () {
    const items = [];
    items.push(new Item("Conjured", 1, 2));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1DecreasedQuality = 0; //decreased by 2
    expect(items[0].quality).toEqual(day1DecreasedQuality);
  });

  it("should increase quality of Aged Brie over time", function () {
    const items = [];
    items.push(new Item("Aged Brie", 2, 0));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1IncreaseQuality = 1; //increased by one
    expect(items[0].quality).toEqual(day1IncreaseQuality);

    //day 2
    gildedRose.updateQuality();
    const day2IncreaseQuality = 2; //increased by one
    expect(items[0].quality).toEqual(day2IncreaseQuality);
  });

  it("should double the rate increase of quality of Aged Brie if sellIn is below 0", function () {
    //double: rate 1 changes to 2
    const items = [];
    items.push(new Item("Aged Brie", 0, 2));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();

    const day1IncreaseQuality = 4; //increased by 2
    expect(items[0].quality).toEqual(day1IncreaseQuality);
  });

  it("increase of quality stops at 50", function () {
    //double: rate 1 changes to 2
    const items = [];
    items.push(new Item("Aged Brie", 0, 50));

    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();

    const day1IncreaseQuality = 50;
    expect(items[0].quality).toEqual(day1IncreaseQuality);
  });

  it("Sulfuras, Hand of Ragnaros does not change anything (sellIn, quality stays the same)", function () {
    const quality = 80;
    const sellIn = 0;
    const items = [];
    items.push(new Item("Sulfuras, Hand of Ragnaros", 0, quality));
    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    expect(items[0].quality).toEqual(quality);
    expect(items[0].sellIn).toEqual(sellIn);
  });

  it("Backstage passes to a TAFKAL80ETC concert value increases close to the date - 11 days", function () {
    const items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20));
    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1IncreaseQuality = 21;
    expect(items[0].quality).toEqual(day1IncreaseQuality);
  });

  it("Backstage passes to a TAFKAL80ETC concert value increases close to the date - 10 days or less", function () {
    const items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1IncreaseQuality = 22;
    expect(items[0].quality).toEqual(day1IncreaseQuality);
  });

  it("Backstage passes to a TAFKAL80ETC concert value increases close to the date - 5 days or less", function () {
    const items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1IncreaseQuality = 23;
    expect(items[0].quality).toEqual(day1IncreaseQuality);
  });

  it("Backstage passes to a TAFKAL80ETC concert value drops to 0 after the concert", function () {
    const items = [];
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    const gildedRose = new Shop(items);

    //day 1
    gildedRose.updateQuality();
    const day1DropQuality = 0;
    expect(items[0].quality).toEqual(day1DropQuality);
  });
});
