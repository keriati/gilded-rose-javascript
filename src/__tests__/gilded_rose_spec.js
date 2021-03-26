import { Shop, Item } from '../gilded_rose';

const SELLIN_ZERO = 0;
const SELLIN_ONE = 1;
const QUALITY_MIN = 0;
const QUALITY_ONE = 1;
const QUALITY_TWO = 2;
const DEFAULT_ITEM = "foo";
const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const QUALITY_MAX = 50;

function getShopWithItem(name, sellin, quality) {
    const gildedRose = new Shop([new Item(name, sellin, quality)]);
    return gildedRose;
}

describe("Gilded Rose #updateQuality()", function () {

    describe('default item', function () {
        it("decreases sellIn by 1", function () {
            const gildedRose = getShopWithItem(DEFAULT_ITEM, SELLIN_ONE, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].sellIn).toEqual(0);
        });

        it('should decrease quality by 1', function () {
            const gildedRose = getShopWithItem(DEFAULT_ITEM, SELLIN_ONE, QUALITY_ONE);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(0);
        });

        it('should not let the quality get lower than 0', function () {
            const gildedRose = getShopWithItem(DEFAULT_ITEM, SELLIN_ONE, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(0);
        });

        it('should lower quality 2x when expired', function () {
            const gildedRose = getShopWithItem(DEFAULT_ITEM, SELLIN_ZERO, QUALITY_TWO);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(0);
        });
    });

    describe('Aged Brie', function () {
        it("decreases sellIn by 1", function () {
            const gildedRose = getShopWithItem(AGED_BRIE, SELLIN_ONE, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].sellIn).toEqual(0);
        });

        it('should increase quality by 1', function () {
            const gildedRose = getShopWithItem(AGED_BRIE, SELLIN_ONE, QUALITY_ONE);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(2);
        });

        it('should never increase the quality over 50', function () {
            const gildedRose = getShopWithItem(AGED_BRIE, SELLIN_ONE, QUALITY_MAX);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_MAX);
        });

        it('should increase quality 2x when expired', function () {
            const gildedRose = getShopWithItem(AGED_BRIE, SELLIN_ZERO, QUALITY_TWO);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(4);
        });
    });

    describe('Sulfuras', function () {
        it("does not change the sellIn value", function () {
            const gildedRose = getShopWithItem(SULFURAS, SELLIN_ONE, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].sellIn).toEqual(SELLIN_ONE);
        });

        it('should not change quality', function () {
            const gildedRose = getShopWithItem(SULFURAS, SELLIN_ONE, QUALITY_ONE);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_ONE);
        });
    });


});
