import Shop from "../modules/Shop";
import Item from "../modules/Item";

// [ this.name = name; this.sellIn = sellIn; this.quality = quality; ]

describe("Gilded Rose Setting Up values", function() {
  describe("REGULAR ITEM", function() {
    it("create and update regular item SELL IN > 0", function() {
      const gildedRose = new Shop([new Item("Test", 2, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Test");
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(1);
    });

    it("create and update regular item SELL IN < 0", function() {
      const gildedRose = new Shop([new Item("Test", -1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Test");
      expect(items[0].sellIn).toEqual(-2);
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("AGED BRIEE", function() {
    it("create and update Aged Brie sellIn > 0", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Aged Brie");
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(11);
    });

    it("create and update Aged Brie sellIn = 0", function() {
      const gildedRose = new Shop([new Item("Aged Brie", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Aged Brie");
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(12);
    });
  });
  describe("SULFRAS", function() {
    it("create and update Sulfuras", function() {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 10, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toEqual(10);
      expect(items[0].quality).toEqual(10);
    });
  });
  describe("BACKSTAGE CONCERT", function() {
    it("create and update Backstage Concert sellIn > 10", function() {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 15)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(14);
      expect(items[0].quality).toEqual(16);
    });

    it("create and update Backstage Concert sellIn  < 10", function() {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 9, 9)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(8);
      expect(items[0].quality).toEqual(11);
    });

    it("create and update Backstage Concert sellIn < 5", function() {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 4, 4)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(3);
      expect(items[0].quality).toEqual(7);
    });

    it("create and update Backstage Concert sellIn < 0", function() {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 4)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      expect(items[0].sellIn).toEqual(-2);
      expect(items[0].quality).toEqual(0);
    });
  });
});
