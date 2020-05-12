import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it("quality and sellin decrease by 1", function () {
        const gildedRose = new Shop([new Item("foo", 3, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
        expect(items[0].sellIn).toEqual(2);
    });

    it("quality degrades twice as fast when sell in is 0", function () {
        const gildedRose = new Shop([new Item("foo", 0, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
    });

    it("quality is never negative", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("when the name is Aged Brie then quality increases the older it gets", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 0, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(4);
    });

    it("quality should not be bigger than 50", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
    });

    it("when the name is Sulfuras, Hand of Ragnaros quality and sell in is still the same ", function () {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 80, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(80);
        expect(items[0].sellIn).toEqual(80);
    });

    it("when the name is Backstage passes then quality increases by one whne sell in is bigger than 10", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(3);
    });

    it("when the name is Backstage passes then quality increases by two when sell in is lower or equal than 10", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(4);
    });

    it("when the name is Backstage passes then quality increases by three when sell in is lower or equal than 5", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(7);
    });

    it("when the name is Backstage passes then quality is 0 when sell in is 0", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });
});
