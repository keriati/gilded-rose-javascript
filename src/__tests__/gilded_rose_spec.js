import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it('with no items', () => {
        const gildedRose = new Shop();
        expect(gildedRose.items.length).toBe(0);
    });

    describe('Generic item requirements', () => {
        it("quality should never be negative", function () {
            const gildedRose = new Shop([new Item("generic", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
        });
        it("quality should go down", function () {
            const gildedRose = new Shop([new Item("generic", 0, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
        });
        it("quality should degrade twice as fast when date has passed", () => {
            const gildedRose = new Shop([new Item("generic", -1, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(8);
        });


    });

    describe('Aged Brie', () => {
        it("quality should increase quality the older it gets", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 30)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(31);
        });

        it("quality item is never more than max 50", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(50);
        });

        
        it("quality item goes up ... ", function () {
            const gildedRose = new Shop([new Item("Aged Brie", -2, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(42);
        });

    });

    describe('Sulfuras', () => {
        it("never has to be sold or decreases in Quality ", () => {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 7, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(40);
            expect(items[0].sellIn).toBe(7);
        });
    });

    describe('Backstage passes', () => {

                
        it("increases in Quality by 1 as SellIn value is above 10 days", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(31);
        });

        it("increases in Quality by 2 as SellIn value is 10 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(32);
        });

        it("increases in Quality by 3 as SellIn value is 5 days or less", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(23);
        });

        it("quality drops to 0 when SellIn is 0", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
        });

    });








});
