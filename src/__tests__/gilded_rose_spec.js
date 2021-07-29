import {CONJURED, Shop} from '../gilded_rose';
import {Item} from "../item";

describe("Gilded Rose", function () {

    it("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it("should lower the quality and sellIn value", () => {
        const glideRose = new Shop([new Item("any item", 4, 20)]);
        const items = glideRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 3,
            quality: 19
        }));
    });

    it("should degrades the quality as twice once the sell by date has passed", () => {
        const glideRose = new Shop([new Item("any item", 0, 20)]);
        const items = glideRose.updateQuality();
        expect(items[0].quality).toEqual(18);
    });

    it("should not degrades the quality of an item below to 0", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).not.toBeLessThan(0);
    });

    it("should improve the quality of 'Aged Brie' the older it gets", () => {
        const gildedRose = new Shop([new Item("Aged Brie", 10, 15)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 9,
            quality: 16
        }));
    });

    it("should  not improve the quality of an item greater than 50", () => {
        const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
        const items = gildedRose.updateQuality();
        const resultItem = items[0];
        expect(resultItem.sellIn).toEqual(9);
        expect(resultItem.quality).not.toBeGreaterThan(50);
    });

    it("should not degrade the quality nor sell in, if the item is 'Sulfuras'", () => {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 10,
            quality: 20
        }));
    });

    it("should increase the quality, for Backstage passes as its SellIn value approaches", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 14,
            quality: 21
        }));
    });

    it("should increase the quality by 2, for Backstage passes as its SellIn value is 10 or less than 10 days", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 9,
            quality: 22
        }));
    });

    it("should increase the quality by 3, for Backstage passes as its SellIn value is 5 or less than 5 days", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 4,
            quality: 23
        }));
    });

    it("should set the quality to 0, if the concert is end", () => {
        const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: -1,
            quality: 0
        }));
    });

    it("should increase the quality for other items if sell in value is passed", () => {
        const gildedRose = new Shop([new Item("Aged Brie", -1, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: -2,
            quality: 22
        }));
    });

    it("should degrade in Quality twice as fast as normal items for Conjured item", () => {
        const gildedRose = new Shop([new Item(CONJURED, 20, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0]).toEqual(expect.objectContaining({
            sellIn: 19,
            quality: 18
        }));
    });




});
