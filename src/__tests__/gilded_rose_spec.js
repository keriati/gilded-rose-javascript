import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {
    const POSITIVE_SELLIN = 20;

    const getShopWithItem = (name, sellIn, quality) => {
        return new Shop([new Item(name, sellIn, quality)]);
    }

    // Specification requirements

    describe("Sulfuras", function () {
        const QUALITY = 80;

        const getShopWithSulfurasItem = (sellIn, quality) => getShopWithItem('Sulfuras', sellIn, quality);

        it("never changes in quality", function () {
            const gildedRose = getShopWithSulfurasItem(POSITIVE_SELLIN, QUALITY);

            const items = gildedRose.updateQuality();
            
            expect(items[0].quality).toEqual(QUALITY);
        });

        it("cannot be sold", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", POSITIVE_SELLIN, QUALITY)]);

            const items = gildedRose.updateQuality();
            
            expect(items[0].sellIn).toEqual(POSITIVE_SELLIN);
        });

    });

    describe("Backstage pass", function () {

        it("never changes in quality above 50", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50)]);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(50);
        });

        it("increases in quality more than 10 days before sellin by 1", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(21);
        });
    
        it("increases in quality 10 days before sellin by 2", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);

            const items = gildedRose.updateQuality();
            
            expect(items[0].quality).toEqual(22);
        });

        it("increases in quality 10 days before sellin by 2 but not above 50", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);

            const items = gildedRose.updateQuality();
            
            expect(items[0].quality).toEqual(50);
        });
    
        it("increases in quality 5 days before sellin by 3", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);

            const items = gildedRose.updateQuality();
            
            expect(items[0].quality).toEqual(23);
        });

        it("increases in quality 5 days before sellin by 3 but not above 50", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);

            const items = gildedRose.updateQuality();
            
            expect(items[0].quality).toEqual(50);
        });
    
        it("quality drops to 0 after sellin", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);

            const items = gildedRose.updateQuality();
            
            expect(items[0].quality).toEqual(0);
        });

    });

    it("quality should descrease when sellIn is higher than 0 and quality is higher than 0", function () {
        const initQuality = 25;
        const initSellIn = 10;
        const gildedRose = new Shop([new Item("foo", initSellIn, initQuality), new Item("Conjured", initSellIn, initQuality)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toEqual(initSellIn - 1);
        expect(items[0].quality).toBeLessThan(initQuality);
        expect(items[1].sellIn).toEqual(initSellIn - 1);
        expect(items[1].quality).toBeLessThan(initQuality);
    });

    it("quality should decrease twice when sellIn is <0 and quality is >=2", function () {
        const gildedRose = new Shop([new Item("foo", 0, 10), new Item("foo", -5, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(8);
        expect(items[1].quality).toEqual(8);
    });

    it("quality should never decrease below 0", function () {
        const gildedRose = new Shop([new Item("foo", 10, 0), new Item("foo", -5, 0), new Item("Conjured", -5, 0), new Item("Conjured", 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
        expect(items[1].quality).toEqual(0);
        expect(items[2].quality).toEqual(0);
        expect(items[3].quality).toEqual(0);
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


    it("quality should not change when sellIn is lower or equal 0 and quality is 0", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0), new Item("foo", -5, 0), new Item("Conjured", 0, 0), new Item("Conjured", -5, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
        expect(items[1].quality).toEqual(0);
        expect(items[2].quality).toEqual(0);
        expect(items[3].quality).toEqual(0);
    });

    // Code coverage

    it("should receive empty array when no items are given to the shop", function () {
        const gildedRose = new Shop();
        expect(gildedRose.items).toEqual([]);
    });

    // New feature

    it("Conjured items should decrease 2x faster than regular ones", function () {
        const gildedRose = new Shop([new Item("Conjured Cake", 10, 20), new Item("Conjured Club", -5, 20)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(18);
        expect(items[1].quality).toEqual(16);
    });

    it("Conjured items quality should not go below 0", function () {
        const gildedRose = new Shop([new Item("Conjured Cake", 10, -1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });
});
