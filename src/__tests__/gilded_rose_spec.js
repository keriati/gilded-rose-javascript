import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function () {
  it("should instanciate with empty constructor", function () {
    const gildedRose = new Shop();
    expect(gildedRose.items).toEqual([]);
  });

  describe("Generic Items", function () {
    it("should foo", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("foo");
    });

    it("should contain multiple items when instanciated with multiple items", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0), new Item("bar", 100, 50)]);

      const items = gildedRose.items;

      // Item 1
      expect(items[0].name).toEqual("foo");
      expect(items[0].sellIn).toEqual(0);
      expect(items[0].quality).toEqual(0);

      // Item 2
      expect(items[1].name).toEqual("bar");
      expect(items[1].sellIn).toEqual(100);
      expect(items[1].quality).toEqual(50);
    });

    it("should contain SellIn value and it should be numeric", function () {
      const gildedRose = new Shop([new Item("foo", 99, 88)]);
      expect(gildedRose.items[0].sellIn).toEqual(99);
    });

    it("should contain Quality value and it should be numeric", function () {
      const gildedRose = new Shop([new Item("foo", 99, 88)]);
      expect(gildedRose.items[0].quality).toEqual(88);
    });

    it("should decrease SellIn and Quality values by one after each day", function () {
      const gildedRose = new Shop([new Item("foo", 99, 88)]);
      gildedRose.updateQuality();

      expect(gildedRose.items[0].sellIn).toEqual(98);
      expect(gildedRose.items[0].quality).toEqual(87);
    });

    it("should decrease SellIn and Quality values by one after each day (when called multiple times)", function () {
      const gildedRose = new Shop([new Item("foo", 99, 88)]);
      const numberOfDay = 5;

      for (let i = 0; i < numberOfDay; i++) {
        gildedRose.updateQuality();
      }

      expect(gildedRose.items[0].sellIn).toEqual(94);
      expect(gildedRose.items[0].quality).toEqual(83);
    });

    it("should degrade the quality twice as fast after sell date has passed", function () {
      const gildedRose = new Shop([new Item("foo", 0, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(18);
    });

    it("should not degrade the quality below 0", function () {
      const gildedRose = new Shop([new Item("foo", 10, 0)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("should degrade the sellIn below 0", function () {
      const gildedRose = new Shop([new Item("foo", 0, 0)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
    });
  });

  describe("Aged Brie", function () {
    it("should increase the quality of Aged Brie instead of degrading it as the expiration approaches", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(21);
    });

    it("should increase the quality of Aged Brie instead of degrading when it is expired", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(22);
    });

    it("should decrease the sellIn of Aged Brie", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
    });
  });

  describe("Sulfuras", function () {
    it("should never change the quality of Sulfuras", function () {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 50)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should never change the sellIn of Sulfuras", function () {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 50)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(10);
    });

    it("should never change the quality of Sulfuras even when sellIn is negative", function () {
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -10, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(20);
    });
  });

  describe("Backstage passes", function () {
    it("should increase the quality of Backstage pass instead of degrading it", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 30, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(21);
    });

    it("should not increase the quality of Backstage pass above 50", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 30, 50)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should not increase the quality of Backstage pass above 50 and the sellIn is less than 11", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should not increase the quality of Backstage pass above 50 and the sellIn is less than 6", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should increase the quality of Backstage pass by 2 instead of degrading it when it is not expired and 10 or less days remaining", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(22);
    });

    it("should increase the quality of Backstage pass by 3 instead of degrading it when it is not expired and 5 or less days remaining", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(23);
    });

    it("should decrese the quality to Backstage pass to 0 when it is expired", function () {
      const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
      const items = gildedRose.items;
      gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });
});
