import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function () {
    describe("general item", function () {
        //At the end of each day our system lowers both values for every item
        it("should lower sellIn and quality", function () {
            const gildedRose = new Shop([new Item("customItem", 5, 8)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(4);
            expect(items[0].quality).toEqual(7);
        });

        describe("when sell by date has passed", function () {
            // Once the sell by date has passed, Quality degrades twice as fast
            it("should dergrade quality twice", function () {
                const gildedRose = new Shop([new Item("customItem", 0, 8)]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(6);
            });
        });

        //  The Quality of an item is never negative
        it("should never have a negative quality", function () {
            const gildedRose = new Shop([new Item("customItem", 5, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });

    describe("Aged Brie", function () {
        //At the end of each day our system lowers both values for every item
        it("should lower sellIn", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 5, 8)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(4);
        });

        //"Aged Brie" actually increases in Quality the older it gets
        it("should increase the quality", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 5, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(1);
        });

        //The Quality of an item is never more than 50
        it("should never have quality more than 50", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(50);
        });

        describe("when sell in is negative nad quality lower than 50", function () {
            it("should increase quality by 2", function () {
                const gildedRose = new Shop([new Item("Aged Brie", -5, 45)]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(47);
            });
        });
    });

    describe("Sulfuras, Hand of Ragnaros", function () {
        //"Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        it("should never decrease quality and sellIn", function () {
            const gildedRose = new Shop([
                new Item("Sulfuras, Hand of Ragnaros", 5, 8),
            ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(8);
            expect(items[0].sellIn).toEqual(5);
        });
    });

    describe("Backstage passes", function () {
        //"Backstage passes", Quality increases by 1 when there are more than 10 days
        it("should increase the quality", function () {
            const gildedRose = new Shop([
                new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0),
            ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(1);
        });

        //"Backstage passes", Quality increases by 2 when there are 10 days or less
        it("should increase the quality", function () {
            const gildedRose = new Shop([
                new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0),
            ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(2);
        });

        //"Backstage passes", Quality increases by 3 when there are 5 days or less
        it("should increase the quality", function () {
            const gildedRose = new Shop([
                new Item("Backstage passes to a TAFKAL80ETC concert", 3, 0),
            ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(3);
        });

        //"Backstage passes", Quality drops to 0 after the concert
        it("should increase the quality", function () {
            const gildedRose = new Shop([
                new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),
            ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });
});
