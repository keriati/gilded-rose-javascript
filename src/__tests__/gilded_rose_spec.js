import { Shop, Item, AGED_BRIE, BACKSTAGE, SULFURAS, CONJURED, MIN_QUALITY, MAX_QUALITY } from '../gilded_rose';

describe("gilded rose", function () {
    it("sellIn and quality values should exist", function() {
        const item = new Item("+5 Dexterity Vest", 10, 20);

        expect(item.sellIn).toBeDefined();
        expect(item.quality).toBeDefined();
    });

    it("name shan't change", function () {
        const name = "+5 Dexterity Vest";
        const item = new Item(name, 10, 0);
        const shop = new Shop([item]);

        shop.updateQuality();
        expect(item.name).toEqual(name);
    });

    describe("reducing quantities", function() {
        it("should reduce sellIn and quality by 1 every day", function() {
            const item = new Item("+5 Dexterity Vest", 10, 1);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.sellIn).toBe(9);
            expect(item.quality).toBe(0);
        });

        it("should reduce sellIn by X after X days", function() {
            const sellIn = 91;
            const item = new Item("+5 Dexterity Vest", sellIn, 0);
            const shop = new Shop([item]);

            for (let i = 0; i < sellIn; i++) {
                shop.updateQuality();
                expect(item.sellIn).toBe(sellIn - (i + 1));
            }

            expect(item.sellIn).toBe(0);
        });

        it("should reduce quality by X after X days", function() {
            const quality = 44;
            const item = new Item("+5 Dexterity Vest", quality, quality);
            const shop = new Shop([item]);

            for (let i = 0; i < quality; i++) {
                shop.updateQuality();
                expect(item.quality).toBe(quality - (i + 1));
            }

            expect(item.quality).toBe(0);
        });

        it("should allow negative sellIn", function() {
            const item = new Item("+5 Dexterity Vest", 0, 0);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.sellIn).toBe(-1);
        });

        it("should dissalow negative quality", function() {
            const item = new Item("+5 Dexterity Vest", 0, 0);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.quality).toBe(0);
        });

        it("should limit quality to 50", function() {
            const item = new Item("+5 Dexterity Vest", 0, 50);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.quality).toBeLessThanOrEqual(50);
        });

        it("should reduce quality by 2 at the end of the day", function() {
            const item = new Item("+5 Dexterity Vest", 0, 4);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.quality).toBe(2);
        });

        it("should reduce quality twice fast after X days", function() {
            const days = 5;
            const quality = 15;
            const item = new Item("+5 Dexterity Vest", 0, quality);
            const shop = new Shop([item]);

            for (let i = 0; i < days; i++) {
                shop.updateQuality();
                expect(item.quality).toBe(quality - (2 * (i + 1)));
            }

            expect(item.quality).toBe(quality - (2 * days));
        });

        it("Aged Brie should rise quality by 1 older it gets", function() {
            const days = 5;
            const item = new Item("Aged Brie", days, 0);
            const shop = new Shop([item]);

            for (let i = 0; i < days; i++) {
                shop.updateQuality();
                expect(item.quality).toBe(i + 1);
            }

            expect(item.quality).toEqual(days);
        });

        it("Aged Brie quality should be limited to 50", function() {
            const days = 11;
            const item = new Item("Aged Brie", days, 49);
            const shop = new Shop([item]);

            for (let i = 0; i < days; i++) {
                shop.updateQuality();
            }

            expect(item.quality).toBeLessThanOrEqual(50);
        });

        it("Sulfuras shouldn't change sellIn or quality", function() {
            const item = new Item("Sulfuras, Hand of Ragnaros", 0, 0);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.sellIn).toBe(0);
            expect(item.quality).toBe(0);
        });

        describe("when concert is more than in 10 days", function() {
            it("Backstage passes should rise quality by 1 when older it gets", function() {
                const days = 5;
                const quality = 1;
                const item = new Item("Backstage passes to a TAFKAL80ETC concert", 15, quality);
                const shop = new Shop([item]);

                for (let i = 0; i < days; i++) {
                    shop.updateQuality();
                    expect(item.quality).toBe(quality + i + 1);
                }

                expect(item.quality).toBe(quality + days);
            });
        });

        describe("when concert is in between 6 and 10 days", function() {
            it("Backstage passes should rise quality by 2 the older it gets", function() {
                const days = 5;
                const quality = 1;
                const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, quality);
                const shop = new Shop([item]);

                for (let i = 0; i < days; i++) {
                    shop.updateQuality();
                    expect(item.quality).toBe(quality + 2 * (i + 1));
                }

                expect(item.quality).toBe(quality + (2 * days));
            });
        });

        describe("when concert is 5 or less days", function() {
            it("Backstage passes should rise quality by 3 the older it gets", function() {
                const days = 5;
                const quality = 1;
                const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, quality);
                const shop = new Shop([item]);

                for (let i = 0; i < days; i++) {
                    shop.updateQuality();
                    expect(item.quality).toBe(quality + 3 * (i + 1));
                }

                expect(item.quality).toBe(quality + (3 * days));
            });
        });

        describe("when concert is over", function() {
            it("Backstage passes quality should drop to 0", function() {
                const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 6);
                const shop = new Shop([item]);

                shop.updateQuality();
                expect(item.quality).toBe(0);
            });
        });

        it("Conjured quality should reduce by 2 at the end of the day", function() {
            const item = new Item("Conjured Mana Cake", 1, 2);
            const shop = new Shop([item]);

            shop.updateQuality();
            expect(item.quality).toBe(0);
        });

        it("Conjured should reduce quality twice fast after sellIn day", function() {
            const days = 5;
            const quality = 20;
            const item = new Item("Conjured Mana Cake", 0, quality);
            const shop = new Shop([item]);

            for (let i = 0; i < days; i++) {
                shop.updateQuality();
                expect(item.quality).toBe(quality - 4 - (i * 4));
            }

            expect(item.quality).toBe(0);
        });
    });

    describe("static helper methods", function() {
        it("isSulfurasItem() should ensure given item is Sulfuras", function() {
            const sulfuras = new Item(SULFURAS, 1, 10);
            const other = new Item("Other", 0, 0);

            expect(Shop.isSulfurasItem(sulfuras)).toBe(true);
            expect(Shop.isBackstageItem(other)).toBe(false);
        });

        it("isAgedBrieItem() should ensure given item is Aged Brie", function() {
            const agedBrie = new Item(AGED_BRIE, 1, 10);
            const other = new Item("Other", 0, 0);

            expect(Shop.isAgedBrieItem(agedBrie)).toBe(true);
            expect(Shop.isBackstageItem(other)).toBe(false);
        });

        it("isBackstageItem() should ensure given item is Backstage passes", function() {
            const backstage = new Item(BACKSTAGE, 1, 10);
            const other = new Item("Other", 0, 0);

            expect(Shop.isBackstageItem(backstage)).toBe(true);
            expect(Shop.isBackstageItem(other)).toBe(false);
        });

        it("isConjuredItem() should ensure given item is Conjured Mana Cake", function() {
            const conjured = new Item(CONJURED, 1, 10);
            const other = new Item("Other", 0, 0);

            expect(Shop.isConjuredItem(conjured)).toBe(true);
            expect(Shop.isBackstageItem(other)).toBe(false);
        });

        it("isAgedBrieOrBackstageItem() should ensure item is one of two", function() {
            const agedBrie = new Item(AGED_BRIE, 1, 10);
            const backstage = new Item(BACKSTAGE, 1, 10);
            const other = new Item("Other", 0, 0);

            expect(Shop.isAgedBrieOrBackstageItem(agedBrie)).toBe(true);
            expect(Shop.isAgedBrieOrBackstageItem(backstage)).toBe(true);
            expect(Shop.isAgedBrieOrBackstageItem(other)).toBe(false);
        });

        it("isNormalItem() should ensure given item isn't Aged Brie, neither Backstage passes, nor Sulfuras", function() {
            const sulfuras = new Item(SULFURAS, 1, 10);
            const agedBrie = new Item(AGED_BRIE, 1, 10);
            const backstage = new Item(BACKSTAGE, 1, 10);
            const other = new Item("Other", 0, 0);

            expect(Shop.isNormalItem(sulfuras)).toBe(false);
            expect(Shop.isNormalItem(agedBrie)).toBe(false);
            expect(Shop.isNormalItem(backstage)).toBe(false);
            expect(Shop.isNormalItem(other)).toBe(true);
        });

        it("reduceItemQuality() should reduce item.quality, preventing negative value", function() {
            const item = new Item("Other", 0, 1);

            Shop.reduceItemQuality(item);

            // Tries to reduce to a netavive value.
            Shop.reduceItemQuality(item);
            expect(item.quality).toBe(MIN_QUALITY);
        });

        it("riseItemQuality() should rise item.quality, limiting to allowed maximum", function() {
            const item = new Item("Other", 0, MAX_QUALITY - 1);

            Shop.riseItemQuality(item);

            // Tries to rise to MAX_QUALITY + 1
            Shop.riseItemQuality(item);
            expect(item.quality).toBe(MAX_QUALITY);
        });
    });
});
