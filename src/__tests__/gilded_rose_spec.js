import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it("Aged Brie should have sellIn=-1, quality=2, name=Aged Brie", function () {
        const gildedRose = new Shop([
            /*new Item("foo", 0, 0),
            new Item('+5 Dexterity Vest', 0, 0),*/
            new Item('Aged Brie', 0, 0),
            /*new Item('Elixir of the Mongoose', 0, 0),
            new Item('Sulfuras, Hand of Ragnaros', 0, 0),
            new Item('Sulfuras, Hand of Ragnaros', 0, 0),
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0),
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0),
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0)
    // this conjured item does not work properly yet
            new Item('Conjured Mana Cake', 0, 0)*/
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Aged Brie");
        expect(items[0].sellIn).toEqual(-1);
        expect(items[0].quality).toEqual(2);
    });

    it("Aged Brie should have sellIn=1, quality=1, name=Aged Brie", function () {
        const gildedRose = new Shop([
            new Item('Aged Brie', 1, 1),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Aged Brie");
        expect(items[0].sellIn).toEqual(0);
        expect(items[0].quality).toEqual(2);
    });

    it("Aged Brie cannot have quality > 50 & name=Aged Brie", function () {
        const gildedRose = new Shop([
            new Item('Aged Brie', 1, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Aged Brie");
        expect(items[0].sellIn).toEqual(0);
        expect(items[0].quality).toEqual(50);
    });

    //Quality increases by 2 when there are 10 days or less
    it("Backstage passes to a TAFKAL80ETC concert should have sellIn=9, quality=2, " +
        "name=Backstage passes", function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(2);
    });

    //Quality increases by 3 when there are 5 days or less
    it("Backstage passes to a TAFKAL80ETC concert should have sellIn=4, quality=3, " +
        "name=Backstage passes", function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
        expect(items[0].sellIn).toEqual(4);
        expect(items[0].quality).toEqual(3);
    });

    //Quality drops to 0 after the concert
    it("Backstage passes to a TAFKAL80ETC concert should have sellIn=-1, quality=0, " +
        "name=Backstage passes", function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 0, 0),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
        expect(items[0].sellIn).toEqual(-1);
        expect(items[0].quality).toEqual(0);
    });

    it("Sulfuras, Hand of Ragnaros should have sellIn=0, quality=0, name=Sulfuras, Hand of Ragnaros", function () {
        const gildedRose = new Shop([
            new Item('Sulfuras, Hand of Ragnaros', 0, 0),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Sulfuras, Hand of Ragnaros");
        expect(items[0].sellIn).toEqual(0);
        expect(items[0].quality).toEqual(0);
    });

    //The Quality of an item is never negative
    it("Regular item should have quality=0, name=Regular Item", function () {
        const gildedRose = new Shop([
            new Item('Regular Item', 0, 0),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Regular Item");
        expect(items[0].quality).toEqual(0);
    });

    //Once the sell by date has passed, Quality degrades twice as fast
    it("Regular item should have sellIn=-1, quality=0 name=Regular Item", function () {
        const gildedRose = new Shop([
            new Item('Regular Item', 0, 2),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("Regular Item");
        expect(items[0].sellIn).toEqual(-1);
        expect(items[0].quality).toEqual(0);
    });

});
