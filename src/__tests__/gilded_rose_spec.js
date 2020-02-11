import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {
    describe("general items", () => {
        it("should not decrease quality below zero", function () {
            const gildedRose = new Shop([new Item("foo", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    
        it("should decrease sellin by one", () => {
            const gildedRose = new Shop([new Item("foo", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(-1)
        });

        it("decreases quality by one everyday", () => {
            const gildedRose = new Shop([new Item("foo", 0, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        })

        it("sellin is negative quality should decrease by 2", () => {
            const gildedRose = new Shop([new Item("foo", -1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(1);
        })
    })

    describe("sulfuras cases", () => {
        it("sellin doesn't change", () => {
            const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(0);
        })

        it("quality doesn't change", () => {
            const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(80);
        })
    })

    describe("backstage pass", () => {
        it("sellin decreases", () => {
            const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(14);
        })

        it("quality increases", () => {
            const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(21);
        })

        it("quality drops to 0 after concert", () => {
            const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0)
        })
    })

    describe("aged brie", () => {
        const itemName = 'Aged Brie';
        it("increases in quality", () => {
            const sellIn = 2;
            const quality = 0;
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(1);
        })

        it("increases in quality by 2 if sellin is less than 0", () => {
            const sellIn = -1
            const quality = 0
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(2);
        })

        it("quality never exceeds 50", () => {
            const sellIn = 2;
            const quality = 50;
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(50);
        })
    })
});
