import { Shop } from "../domain/Shop";
import { NORMAL_ITEM_NAME, NormalItem } from "../domain/NormalItem";
import { AgedBrieItem } from "../domain/AgedBrieItem";
import { SULFURAS_QUALITY, SulfurasItem } from "../domain/SulfurasItem";
import { BackstagePassesItem } from "../domain/BackstagePassesItem";

describe("Gilded Rose", () => {
  describe("Normal Item", () => {
    test("Does not change name of the item", function () {
      const regularItem = new NormalItem(0, 0);
      expect(regularItem.name).toEqual(NORMAL_ITEM_NAME);
    });

    test("Decrements quality and sellIn at the end of the day", () => {
      const regularItem = new NormalItem(1, 1);

      Shop.updateQuality([regularItem]);

      expect(regularItem.quality).toBe(0);
      expect(regularItem.sellIn).toBe(0);
    });

    test("Decrements by two once the sell by date has passed", () => {
      const regularItem = new NormalItem(0, 2);

      Shop.updateQuality([regularItem]);

      expect(regularItem.sellIn).toBe(-1);
      expect(regularItem.quality).toBe(0);
    });

    test("Has no negative quality", () => {
      const regularItem = new NormalItem(0, 0);
      Shop.updateQuality([regularItem]);

      expect(regularItem.quality).not.toBeLessThan(0);
    });
  });

  describe("Aged Brie", () => {
    test("Increases in Quality the older it gets", () => {
      const agedBrie = new AgedBrieItem(1, 1);
      Shop.updateQuality([agedBrie]);

      expect(agedBrie.quality).toBe(2);
    });

    test("The Quality of an item is never more than 50", () => {
      const agedBrie = new AgedBrieItem(1, 50);
      Shop.updateQuality([agedBrie]);
      expect(agedBrie.quality).not.toBeGreaterThan(50);
    });

    test("Decrements sellIn at the end of the day and does not increase quality above 50", () => {
      const agedBrie = new AgedBrieItem(0, 30);

      Shop.updateQuality([agedBrie]);

      expect(agedBrie.quality).toBeLessThanOrEqual(50);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    test("Sellin never goes below 1 and quality does not decrease/increase at all", () => {
      const sulfurasItem = new SulfurasItem(1);

      Shop.updateQuality([sulfurasItem]);

      expect(sulfurasItem.quality).toBe(SULFURAS_QUALITY);
      expect(sulfurasItem.sellIn).toBe(1);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    test("The Quality of an item is never more than 50", () => {
      const backstageItem = new BackstagePassesItem(1, 50);
      Shop.updateQuality([backstageItem]);
      expect(backstageItem.quality).not.toBeGreaterThan(50);
    });

    test("Quality increases by 2 when days are between 5 and 10", () => {
      const backstagesItem = new BackstagePassesItem(10, 2);

      Shop.updateQuality([backstagesItem]);

      expect(backstagesItem.quality).toBe(4);
    });

    test("Quality increases by 1 when there are more than 10 days", () => {
      const backstagesItem = new BackstagePassesItem(11, 2);

      Shop.updateQuality([backstagesItem]);

      expect(backstagesItem.quality).toBe(3);
    });

    test("Quality increases by 3 when there are 5 days or less", () => {
      const backstagesItem = new BackstagePassesItem(5, 10);

      Shop.updateQuality([backstagesItem]);
      expect(backstagesItem.quality).toBe(13);
    });

    test("Quality drops to 0 after the concert", () => {
      const backstagesItem = new BackstagePassesItem(0, 10);

      Shop.updateQuality([backstagesItem]);
      expect(backstagesItem.quality).toBe(0);
    });
  });

  describe("Conjured", () => {
    // test('"Conjured" items degrade in Quality twice as fast as normal items', () => {
    //   const conjuredItem = new Item("Conjured", 10, 10);
    //
    //   Shop.updateQuality([conjuredItem]);
    //   expect(conjuredItem.quality).toBe(8);
    // });
  });
});
