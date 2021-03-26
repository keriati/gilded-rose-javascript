import { Shop, Item } from '../gilded_rose';

const SELLIN_ZERO = 0;
const SELLIN_ONE = 1;
const SELLIN_FIVE = 5;
const SELLIN_TEN = 10;
const SELLIN_ELEVEN = 11;

const QUALITY_MIN = 0;
const QUALITY_ONE = 1;
const QUALITY_TWO = 2;
const QUALITY_48 = 48;
const QUALITY_49 = 49;
const QUALITY_MAX = 50;

const DEFAULT_ITEM = "foo";
const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";


function getShopWithItem(name, sellin, quality) {
    const gildedRose = new Shop([new Item(name, sellin, quality)]);
    return gildedRose;
}

describe("Gilded Rose #updateQuality()", function () {

    describe('Default Item', function () {
        it("should decrease sellIn by 1", function () {
            const gildedRose = getShopWithItem(DEFAULT_ITEM, SELLIN_ONE, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].sellIn).toEqual(0);
        });

        it("should not decrease quality by 1 when expired and quality is zero", function () {
            const gildedRose = getShopWithItem(DEFAULT_ITEM, SELLIN_ZERO, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_MIN);
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

        it('should never increase the quality over 50 when expired', function () {
            const gildedRose = getShopWithItem(AGED_BRIE, SELLIN_ZERO, QUALITY_MAX);

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

        it('should not change quality when expired', function () {
            const gildedRose = getShopWithItem(SULFURAS, -1, QUALITY_ONE);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_ONE);
        });
    });

    describe('Backstage Pass', function () {
        it("should decrease sellIn by 1", function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_ELEVEN, QUALITY_MAX);

            const items = gildedRose.updateQuality();

            expect(items[0].sellIn).toEqual(SELLIN_TEN);
        });

        it("should expire after the sellIn", function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_ZERO, QUALITY_MAX);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_MIN);
        });

        it('should increase quality by 1 when there are more than 10 days left', function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_ELEVEN, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_ONE);
        });

        it('should not increase quality when there are more than 10 days left and quality is already max', function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_TEN, QUALITY_49);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_MAX);
        });


        it('should increase in quality by 2 when there are 10 days or less left', function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_TEN, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(2);
        });

        it('should increase in quality by 3 when there are 5 days or less left', function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_FIVE, QUALITY_MIN);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(3);
        });

        it('should not increase quality when there are 5 days or less left and quality is already max', function () {
            const gildedRose = getShopWithItem(BACKSTAGE_PASS, SELLIN_FIVE, QUALITY_48);

            const items = gildedRose.updateQuality();

            expect(items[0].quality).toEqual(QUALITY_MAX);
        });
    });
});
