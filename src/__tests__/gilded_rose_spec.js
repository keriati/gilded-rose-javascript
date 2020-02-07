import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it('with no items', () => {
        const gildedRose = new Shop();
        expect(gildedRose.items.length).toBe(0);
    });

    describe('Generic item requirements', () => {
        it("quality should never be negative", function () {
            const SELL_IN_EXPIRED = 0;
            const QUALITY_MIN = 0;
            const gildedRose = new Shop([new Item("generic", SELL_IN_EXPIRED, QUALITY_MIN)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
            expect(items[0].sellIn).toBe(-1);
        });
        it("quality should decrease by 1", function () {
            const gildedRose = new Shop([new Item("generic", 0, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
            expect(items[0].sellIn).toBe(-1);
        });
        it("quality should degrade twice as fast when expires", () => {
            const gildedRose = new Shop([new Item("generic", -1, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(8);
            expect(items[0].sellIn).toBe(-2);
        });
    });

    describe('Aged Brie', () => {
        it("quality should increase by 1 the older it gets", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 30)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(31);
            expect(items[0].sellIn).toBe(9);
        });

        it("quality is never more than 50", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(50);
            expect(items[0].sellIn).toBe(9);
        });

        
        it("quality item goes up by 2", function () {
            const gildedRose = new Shop([new Item("Aged Brie", -2, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(42);
            expect(items[0].sellIn).toBe(-3);
        });

        it("quality doesn't increase when is 50 and more", function () {
            const gildedRose = new Shop([new Item("Aged Brie", -2, 49)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(50);
            expect(items[0].sellIn).toBe(-3);
        });
    });

    describe('Sulfuras', () => {
        it("never decreases in quality or has to be sold", () => {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 7, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(40);
            expect(items[0].sellIn).toBe(7);
        });

        it("never decreases in quality when sellIn is negative", () => {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(1);
            expect(items[0].sellIn).toBe(-1);
        });
    });

    describe('Backstage passes', () => {

        it("quality increases by 1 as SellIn value is above 10 days", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(31);
            expect(items[0].sellIn).toBe(19);
        });

        it("increases in Quality by 2 as SellIn value is 10 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(32);
            expect(items[0].sellIn).toBe(9);
        });

        it("quality should be the same when it reaches 50 & SellIn is 10 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(50);
            expect(items[0].sellIn).toBe(9);
        });

        it("increases in Quality by 3 as SellIn value is 5 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(23);
            expect(items[0].sellIn).toBe(4);
        });

        it("quality should be the same when it reaches 50 & SellIn value is 5 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(50);
            expect(items[0].sellIn).toBe(4);
        });


        it("quality drops to 0 when SellIn is 0", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
            expect(items[0].sellIn).toBe(-1);
        });

    });

    describe('Conjured', () => {
        
    })








});
