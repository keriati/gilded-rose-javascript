import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose Shop", function () {

    it("should insert Item to Shop", function () {
        const gildedRose = new Shop([new Item("foo", 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it("should decrease Item SellIn value", function () {
        const gildedRose = new Shop([new Item("foo", 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-1);
    });

    it("should degrade Item Quality", function () {
        const gildedRose = new Shop([new Item("foo", 10, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(9);
    });

    it("should degrade Item Quality twice as fast when expired", function () {
        const gildedRose = new Shop([new Item("foo", 0, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(8);
    });

    it("Item Quality shouldn't never be negative", function () {
        const gildedRose = new Shop([new Item("foo", 0, 1)]);
        gildedRose.updateQuality();
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    describe("Aged Brie Item", function () {
        it("should increase in Quality", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBeGreaterThan(0);
        });

        it("Quality shouldn't be more than 50", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBeLessThanOrEqual(50);
        });
    });

    describe("Sulfuras Item", function () {
        it("Quality should always be 80", () => {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(80);
        });
    });

    describe("Backstage passes", function () {
        it("Quality should increase as SellIn approaches more than 10 days", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(21);
        });

        it("Quality should increase by 2 as SellIn approaches - 10 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(22);
        });

        it("Quality should increase by 3 as SellIn approaches - 5 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(23);
        });

        it("Quality should drop to 0 after the SellIn day", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });

        it("Quality shouldn't be more than 50", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBeLessThanOrEqual(50);
        });
    });
});
