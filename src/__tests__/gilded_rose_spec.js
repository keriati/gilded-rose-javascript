import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it("Find foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it("Check if sellIn was lowered", function () {
        const gildedRose = new Shop([new Item("Nice Drink", 20, 20)]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toEqual(19);
    });

    it("Check if quality was lowered", function () {
        const gildedRose = new Shop([new Item("Nice Drink", 20, 20)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(19);
    });

    it("Sell date and quality degrades", () => {
        const gildedRose = new Shop([new Item("Nice Drink", 0, 20)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(18);
    });

    it("Check if quality is negative", () => {
        const gildedRose = new Shop([new Item("Nice Drink", 0, 0)]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });

    describe("Aged Brie", () => {
        it("increases the quality by one when a day passes", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 15, 12)]);
            const items = gildedRose.updateQuality();
    
            expect(items[0].quality).not.toEqual(11);
            expect(items[0].quality).toEqual(13);
        });
    
        it("does not increse the quality above 50", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
            const items = gildedRose.updateQuality();
    
            expect(items[0].quality).toEqual(50);
        });
    });

    it("Sulfuras, Hand of Ragnaros values check", () => {
        const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 43, 45)]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toEqual(43);
        expect(items[0].quality).toEqual(45);
    });

    describe("Backstage pass", () => {

        it("increases quality by one when sellIn is above ten", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 43, 45)]);
            const items = gildedRose.updateQuality();
    
            expect(items[0].sellIn).toEqual(42);
            expect(items[0].quality).toEqual(46);
        });
    
        it("increases quality by two when 5 < sellIn <= 10", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 8, 22)]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(24);
        });

        it("increases quality by 3 when 0 < sellIn <= 5", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 22)]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(25);
        });

        it("drops quality to 0 when sellIn = 0", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 22)]);
            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(0);
        });
    })

});
