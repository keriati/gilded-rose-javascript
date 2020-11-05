import { Shop, Item } from '../gilded_rose';

const agedBrieType = "Aged Brie";
const sulfurasType = "Sulfuras, Hand of Ragnaros";
const defaultType = "DefaultType";
const backstageType = "Backstage passes to a TAFKAL80ETC concert";
const conjuredType = "Conjured";

describe("Gilded Rose", function () {
    it("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });
    it("should lower quality by one", function () {
        const gildedRose = new Shop([new Item(defaultType, 2, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(1);
    });
    it("should lower quality by twice when sell in is negative", function () {
        const gildedRose = new Shop([new Item(defaultType, -1, 4)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
    });
    it("should not exceed quality: 50 ", function () {
        const gildedRose = new Shop([new Item(agedBrieType, 2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
    });
    it("50 for backstage with sell in less than 11", function () {
        const gildedRose = new Shop([new Item(backstageType, 10, 49)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
    });
    it("50 for backstage with sell in less than 6", function () {
        const gildedRose = new Shop([new Item(backstageType, 5, 49)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
    });

    it("Quality should not be less than 0 ", function () {
        const gildedRose = new Shop([new Item(defaultType, 2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });
    it("should increase quality by one if sellIn is positive", function () {
        const gildedRose = new Shop([new Item(agedBrieType, 2, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
    });
    it("should increase quality twice as fast if sellIn is negative", function () {
        const initialQuality = 1;
        const gildedRose = new Shop([new Item(agedBrieType, -1, initialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(initialQuality + 2);
    });
    it("Sulfuras should never be sold", function () {
        const gildedRose = new Shop([new Item(sulfurasType, 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(0);
    });
    it("Sulfuras never loose quality by time", function () {
        const gildedRose = new Shop([new Item(sulfurasType, 0, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
    });
    it("Backstage quality should be increased by 1 if sellin greater than 10", function () {
        const intitialQuality = 1;
        const gildedRose = new Shop([new Item(backstageType, 11, intitialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(intitialQuality + 1);
    });
    it("Backstage quality should be increased by 2", function () {
        const intitialQuality = 1;
        const gildedRose = new Shop([new Item(backstageType, 10, intitialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(intitialQuality + 2);
    });
    it("Backstage quality should be increased by 3", function () {
        const intitialQuality = 1;
        const gildedRose = new Shop([new Item(backstageType, 5, intitialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(intitialQuality + 3);
    });
    it("Backstage quality should be zero at 0 sellIn", function () {
        const gildedRose = new Shop([new Item(backstageType, 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });
    it("Sulfuras quality should stay the same even if sellIn is negative", function () {
        const intitialQuality = 2;
        const gildedRose = new Shop([new Item(sulfurasType, -1, intitialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(intitialQuality);
    });
    it("Age brie quality should stay 50 even if sellIn is negative", function () {
        const intitialQuality = 50;
        const gildedRose = new Shop([new Item(agedBrieType, -1, intitialQuality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(intitialQuality);
    });
    xit("Conjured quality decrease by 2 if sellIn is positive", function () {
        const intitialQuality = 4;
        const gildedRose = new Shop([new Item(conjuredType, 1, intitialQuality)]);
        const items = gildedRose.updateQuality(); // next day as well
        expect(items[0].quality > intitialQuality).toBeGreaterThan(intitialQuality - 2);
    });
    xit("Conjured quality decrease by 2 if sellIn is negative", function () {
        const intitialQuality = 10;
        const gildedRose = new Shop([new Item(conjuredType, -1, intitialQuality)]);
        const items = gildedRose.updateQuality(); // next day as well
        expect(items[0].quality > intitialQuality).toBeGreaterThan(intitialQuality - 4);
    });
});
