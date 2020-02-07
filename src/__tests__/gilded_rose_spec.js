import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it("Tests if item name is still the same", function () {
        const gildedRose = new Shop([new Item("fhammer", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("fhammer");
    });
   
    it("Tests if quality doesnt fall below zero", function () {
        const gildedRose = new Shop([new Item("fhammer", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("Tests if quality does decrace by one", function () {
        const gildedRose = new Shop([new Item("fhammer", 2, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(3);
    });

    it("Tests if quality decreases by 2 when sellIn Date has passed", function () {
        const gildedRose = new Shop([new Item("fhammer", 0, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
    });

    it("Tests if the sellIn value decreases by one", function () {
        const gildedRose = new Shop([new Item("fhammer", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-1);
    });

    describe("Aged Brie", function () {
        it("Tests if the quality value increases by one", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 1, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(+1);
        });

        it("Tests if the quality value increases by two if SellIn == 0", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(2);
        });

        it("Tests if the quality value can not be greater than 50", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(50);
        });
    });

    describe("Sulfuras, Hand of Ragnaros", function () {
        it("Tests if the quality value doesnt decrease", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(80);
        });

        it("Tests if the quality value doesnt decrease twice as fast when SellIn == 0", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(80);
        });

        it("Tests if the SellIn value doesnt change", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(1);
        });
    });

    describe("Backstage passes to a TAFKAL80ETC concert", function () {
        it("Tests if the quality value increases by 1 when sellIn >10", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(11);
        });

        it("Tests if the quality value increases by 2 when 5 < sellIn <= 10", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(22);
        });

        it("Tests if the quality value increases by 3 when 0 < sellIn <= 5", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(23);
        });

        it("Tests if the quality value drops to 0 when sellIn = 0", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });

    describe("Conjured", function () {
        it("Tests if  quality value decreases by 2 when sellIn decreases", function () {
            const gildedRose = new Shop([new Item("Conjured", 20, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(8);
        });

        it("Tests if  quality value never drops below 0 (case 1)", function () {
            const gildedRose = new Shop([new Item("Conjured", 20, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });

        it("Tests if  quality value never drops below 0 (case 2)", function () {
            const gildedRose = new Shop([new Item("Conjured", 20, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });
});
