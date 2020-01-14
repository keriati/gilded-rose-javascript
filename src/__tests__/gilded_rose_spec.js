import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    // Specification requirements

    it("quality should descrease when sellIn is higher than 0 and quality is higher than 0", function () {
        const initQuality = 25;
        const initSellIn = 10;
        const gildedRose = new Shop([new Item("foo", initSellIn, initQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(initSellIn - 1);
        expect(items[0].quality).toBeLessThan(initQuality);
    });

    it("quality should decrease twice when sellIn is <0 and quality is >=2", function () {
        const gildedRose = new Shop([new Item("foo", 0, 10), new Item("foo", -5, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(8);
        expect(items[1].quality).toEqual(8);
    });

    it("quality should never decrease below 0", function () {
        const gildedRose = new Shop([new Item("foo", 10, 0), new Item("foo", -5, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
        expect(items[1].quality).toEqual(0);
    });

    it("quality of Aged Brie only increases, and twice as much after sellin date", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 20, 30), new Item("Aged Brie", -1, 30)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(31);
        expect(items[1].quality).toEqual(32);
    });

    it("quality of item never increases above 50", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50), new Item("Aged Brie", 20, 50), new Item("Aged Brie", -2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
        expect(items[1].quality).toEqual(50);
    });

    it("quality of Sulfuras never changes from 80 and can't be sold", function () {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 20, 80), new Item("Sulfuras, Hand of Ragnaros", -2, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(80);
        expect(items[0].sellIn).toEqual(20);
    });

    it("Backstage pass quality increases more than 10 days before sellin by 1", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(21);
    });

    it("Backstage pass quality increases 10 days before sellin by 2", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(22);
        expect(items[1].quality).toEqual(50);
    });

    it("Backstage pass quality increases 5 days before sellin by 3", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20), new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(23);
        expect(items[1].quality).toEqual(50);
    });

    it("Backstage pass quality drops to 0 after sellin", function () {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("quality should not change when sellIn is lower or equal 0 and quality is 0", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0), new Item("foo", -5, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
        expect(items[1].quality).toEqual(0);
    });

    // Code coverage

    it("should receive empty array when no items are given to the shop", function () {
        const gildedRose = new Shop();
        expect(gildedRose.items).toEqual([]);
    });

});
