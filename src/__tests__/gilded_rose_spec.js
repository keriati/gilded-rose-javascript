import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function() {
  describe("Brie aged", () => {
    it("should increase by 1 in quality", () => {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(1);
    });

    it("should increase by two in quality when expired", () => {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(12);
    });

    it("should not increase over 50 in quality", () => {
      const gildedRose = new Shop([new Item("Aged Brie", -1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("Backstage passes", () => {
    it("should increase by 1 in quality", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it("should increase by two in quality when there are ten days or less left", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 9, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(12);
    });

    it("should increase by three in quality when there are five days or less left", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(13);
    });

    it("should drop to zero in quality when expired", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("should not increase over 50 in quality", () => {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50)
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("Conjured", () => {
    it("should decrease by two in quality", () => {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(4);
    });

    it("should decrease by four when expired", () => {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(26);
    });

    it("should not decrease under 0 in quality", () => {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 10, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

  it("should not break the snapshot", () => {
    const items = [];

    items.push(new Item("+5 Dexterity Vest", 10, 20));
    items.push(new Item("Aged Brie", 2, 0));

    items.push(new Item("Elixir of the Mongoose", 5, 7));
    items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
    items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49));
    items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49));
    // this conjured item does not work properly yet
    items.push(new Item("Conjured Mana Cake", 3, 6));

    const gildedRose = new Shop(items);

    const days = 50;

    for (let i = 0; i < days; i++) {
      gildedRose.updateQuality();
      expect(gildedRose.items).toMatchSnapshot();
    }
  });
});
