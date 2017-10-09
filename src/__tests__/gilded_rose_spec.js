import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    it("should return the correct name of first item", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it("should work with multiple items", function () {
        const gildedRose = new Shop([
          new Item("foo", 0, 0),
          new Item("foo2", 0, 0),
          new Item("foo3", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[2].name).toEqual("foo3");
    });

    it("should lower the quality of an item", function () {
        const gildedRose = new Shop([new Item("foo", 1, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(2);
    });

    it("should lower the quality of an item to 0", function () {
        const gildedRose = new Shop([new Item("foo", 1, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("should lower the sellIn of an item", function () {
        const gildedRose = new Shop([new Item("foo", 99, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(98);
    });

    it("should lower the sellIn of an item to 0", function () {
        const gildedRose = new Shop([new Item("foo", 1, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(0);
    });

    it("should lower the quality twice as fast after sellIn has passed", function () {
        const gildedRose = new Shop([new Item("foo", -30, 5)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(3);
    });

    it("should lower the quality twice as fast after sellIn has passed", function () {
        const gildedRose = new Shop([new Item("foo", 0, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(1);
    });

    it("should never go to negative with quality", function () {
        const gildedRose = new Shop([new Item("foo", 15, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("should never go to negative with quality afte sellIn", function () {
        const gildedRose = new Shop([new Item("foo", 0, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    describe("Aged Brie", function  () {
        it("should increase in quality", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(4);
        });

        it("should decrese in sellIn", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(0);
        });

        it("should never have more than 50 quality", function () {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(50);
        });
    });

    describe("Sulfuras", function() {
        it("should not increase or decrease in quality", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(3);
        });

        it("should is not limited in quality", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 99)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(99);
        });

        it("should not increase or decrease in sellIn", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(1);
        });

        it("should not increase or decrease in negative sellIn", function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -3, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(-3);
        });
    });

    describe("Backstage passes", function() {
        it("should increase the quality of an item for long sellIn", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(4);
        });

        it("should increase the quality of an item for long sellIn (11 days)", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(4);
        });

        it("should double increase the quality of an item for less than 10 sellIn", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(5);
        });

        it("should double increase the quality of an item for less than 10 sellIn (6 days)", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(5);
        });

        it("should tripple increase the quality of an item for less than 5 sellIn", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(6);
        });

        it("should tripple increase the quality of an item for less than 5 sellIn (1)", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(6);
        });

        it("should zero the quality of an item for less than 0 sellIn", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });

        it("should zero the quality of an item for less than 0 sellIn (-1)", function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });

    describe("Conjured items", function() {
      it("should lower the quality of an item by 2", function () {
          const gildedRose = new Shop([new Item("Conjured Mana Cake", 4, 6)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(4);
      });

      it("should lower the quality of an item by 2 to zero", function () {
          const gildedRose = new Shop([new Item("Conjured Mana Cake", 4, 1)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(0);
      });

      it("should lower the quality of an item by 2 keep 0", function () {
          const gildedRose = new Shop([new Item("Conjured Mana Cake", 4, 0)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(0);
      });

      it("should lower the quality of an item by 4 after sellIn date", function () {
          const gildedRose = new Shop([new Item("Conjured Mana Cake", -3, 5)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(1);
      });
    });
});
