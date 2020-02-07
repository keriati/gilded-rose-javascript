import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it.skip("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("fixme");
    });

    describe('generic item', () => {
        it("quality item should go down", function () {
            const gildedRose = new Shop([new Item("generic", 0, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
        });
        it("quality item is never be negative", function () {
            const gildedRose = new Shop([new Item("generic", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(0);
        });
        it("should degrade twice as fast when sell date passed", () => {
            const gildedRose = new Shop([new Item("generic", -1, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(8);
        });
    });


    it("quality item is never more than max 50", function () {
        const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
    });



});
