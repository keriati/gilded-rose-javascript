import { Shop, Item, AGED_BRIE, BACKSTAGE, SULFURAS, CONJURED, MIN_QUALITY, MAX_QUALITY } from '../gilded_rose';

const ANY_ITEM_NAME = 'a';
const OUTDATED_SELLIN = 0;

function createItemWith(quality, sellIn, name) {
    quality = quality || MIN_QUALITY;
    sellIn = sellIn || OUTDATED_SELLIN;
    name = name || ANY_ITEM_NAME;

    return new Item(name, sellIn, quality);
}

function createShopWith(quality, sellIn, name) {
    const item = createItemWith.apply(null, arguments);

    return new Shop([item]);
}

describe("gilded rose", function () {
    it("shop always contains items", function() {
        const shop = new Shop();

        expect(shop.items).toBeDefined();
        expect(shop.items.length).toBe(0);
    });

    it("checks item sellIn and quality existence", function() {
        const item = createItemWith();

        expect(item.sellIn).toBeDefined();
        expect(item.quality).toBeDefined();
    });

    it("prevents item name change", function () {
        const QUALITY = 0;
        const SELLIN = 0;
        const shop = createShopWith(QUALITY, SELLIN, ANY_ITEM_NAME);
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.name).toEqual(ANY_ITEM_NAME);
    });

    it("reduces item sellIn and quality by 1 every day", function() {
        const QUALITY = 1;
        const SELLIN = 1;
        const shop = createShopWith(QUALITY, SELLIN);
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(0);
    });

    it("reduces item sellIn and quality by X after X days", function() {
        const DAYS = 4;
        const QUALITY = DAYS;
        const SELLIN = DAYS;
        const shop = createShopWith(QUALITY, SELLIN);
        const item = shop.items[0];

        for (let i = 0; i < DAYS; i++) {
            shop.updateQuality();

            expect(item.sellIn).toBe(SELLIN - (i + 1));
            expect(item.quality).toBe(QUALITY - (i + 1));
        }

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(0);
    });

    it("allows negative item sellIn", function() {
        const shop = createShopWith();
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.sellIn).toBe(-1);
    });

    it("dissalows negative item quality", function() {
        const shop = createShopWith();
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.quality).toBe(0);
    });

    it("limits item quality to 50", function() {
        const shop = createShopWith(MAX_QUALITY);
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.quality).toBeLessThanOrEqual(MAX_QUALITY);
    });

    it("reduces item quality by 2 when sellIn <= 0", function() {
        const QUALITY = 2;
        const shop = createShopWith(QUALITY);
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.quality).toBe(0);
    });

    it("reduces item quality twice fast after X days", function() {
        const DAYS = 5;
        const QUALITY = 15;
        const NORMAL_REDUCEMENT_SPEED = 1;
        const DOUBLE_REDUCEMENT_SPEED = NORMAL_REDUCEMENT_SPEED * 2;
        const shop = createShopWith(QUALITY);
        const item = shop.items[0];

        for (let i = 0; i < DAYS; i++) {
            shop.updateQuality();

            expect(item.quality).toBe(QUALITY - (DOUBLE_REDUCEMENT_SPEED * (i + 1)));
        }

        expect(item.quality).toBe(QUALITY - (DOUBLE_REDUCEMENT_SPEED * DAYS));
    });

    it("rises Aged Brie item quality by 1 older it gets", function() {
        const DAYS = 5;
        const QUALITY = 0;
        const SELLIN = DAYS;
        const shop = createShopWith(QUALITY, SELLIN, AGED_BRIE);
        const item = shop.items[0];

        for (let i = 0; i < DAYS; i++) {
            shop.updateQuality();

            expect(item.quality).toBe(i + 1);
        }

        expect(item.quality).toEqual(DAYS);
    });

    it("rises Aged Brie item quality twice fast when sellIn < 0", function() {
        const QUALITY = 0;
        const SELLIN = -1;
        const shop = createShopWith(QUALITY, SELLIN, AGED_BRIE);
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.quality).toBe(2);
    });

    it("prevents Sulfuras item quality and sellIn change, keeping it always 80", function() {
        const DAYS = 11;
        const SELLIN = 1;
        const QUALITY = 80;
        const shop = createShopWith(QUALITY, SELLIN, SULFURAS);
        const item = shop.items[0];

        for (let i = 0; i < DAYS; i++) {
            shop.updateQuality();
        }

        expect(item.quality).toBe(QUALITY);
        expect(item.sellIn).toBe(SELLIN);
    });

    describe("when sellIn > 10 days", function() {
        it("rises Backstage passes item quality by 1 older it gets", function() {
            const DAYS = 5;
            const QUALITY = 0;
            const SELLIN = 11 + DAYS; // Ensures sellIn is always > 10.
            const shop = createShopWith(QUALITY, SELLIN, BACKSTAGE);
            const item = shop.items[0];

            for (let i = 0; i < DAYS; i++) {
                shop.updateQuality();

                expect(item.quality).toBe(QUALITY + i + 1);
            }

            expect(item.quality).toBe(QUALITY + DAYS);
        });
    });

    describe("when sellIn > 5, but <= 10 days", function() {
        it("rises Backstage passes item quality by 2 the older it gets", function() {
            const DAYS = 3;
            const QUALITY = 0;
            const QUALITY_RISE_FACTOR = 2;
            const SELLIN = 6 + DAYS; // Ensures sellIn is always > 5, but < 10.
            const shop = createShopWith(QUALITY, SELLIN, BACKSTAGE);
            const item = shop.items[0];

            for (let i = 0; i < DAYS; i++) {
                shop.updateQuality();

                expect(item.quality).toBe(QUALITY + QUALITY_RISE_FACTOR * (i + 1));
            }

            expect(item.quality).toBe(QUALITY + (QUALITY_RISE_FACTOR * DAYS));
        });
    });

    describe("when sellIn <= 5", function() {
        it("rises Backstage passes item quality by 3 the older it gets", function() {
            const DAYS = 5;
            const QUALITY = 0;
            const QUALITY_RISE_FACTOR = 3;
            const SELLIN = 5;
            const shop = createShopWith(QUALITY, SELLIN, BACKSTAGE);
            const item = shop.items[0];

            for (let i = 0; i < DAYS; i++) {
                shop.updateQuality();

                expect(item.quality).toBe(QUALITY + QUALITY_RISE_FACTOR * (i + 1));
            }

            expect(item.quality).toBe(QUALITY + (QUALITY_RISE_FACTOR * DAYS));
        });
    });

    describe("when sellIn <= 0", function() {
        it("drops Backstage passes item quality to 0", function() {
            const QUALITY = 10;
            const SELLIN = 0;
            const shop = createShopWith(QUALITY, SELLIN, BACKSTAGE);
            const item = shop.items[0];

            shop.updateQuality();

            expect(item.quality).toBe(0);
        });
    });

    it("reduces Conjured item quality by 2 at the end of the day", function() {
        const QUALITY = 2;
        const SELLIN = 0;
        const shop = createShopWith(QUALITY, SELLIN, CONJURED);
        const item = shop.items[0];

        shop.updateQuality();

        expect(item.quality).toBe(0);
    });

    it("reduces Conjured item quality twice fast when sellIn <= 0", function() {
        const DAYS = 5;
        const QUALITY = 20;
        const SELLIN = -1;
        const NORMAL_REDUCEMENT_SPEED = 2;
        const DOUBLE_REDUCEMENT_SPEED = NORMAL_REDUCEMENT_SPEED * 2;
        const shop = createShopWith(QUALITY, SELLIN, CONJURED);
        const item = shop.items[0];

        for (let i = 0; i < DAYS; i++) {
            shop.updateQuality();

            expect(item.quality).toBe(QUALITY - DOUBLE_REDUCEMENT_SPEED - (i * 4));
        }

        expect(item.quality).toBe(0);
    });
});
