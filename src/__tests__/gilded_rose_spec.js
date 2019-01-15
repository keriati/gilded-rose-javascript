import { Shop, Item } from "../gilded_rose";

describe("Gilded Rose", function() {
  describe("Item", () => {
    it("initiates correctly", () => {
      const item = new Item("foo", 10, 40);
      expect(item).toEqual(new Item("foo", 10, 40));
    });
  });

  describe("Shop", () => {
    it("stores given items", () => {
      const item = new Item("foo", 10, 40);
      const shopItems = [item, item];
      const shop = new Shop(shopItems);
      expect(shop.items).toEqual(shopItems);
    });

    describe("updateQuality", () => {
      it("lowers sellIn and quality on each run", () => {
        const items = [new Item("foo", 10, 40), new Item("bar", 4, 20)];
        const shop = new Shop(items);
        shop.updateQuality();

        expect(shop.items).toEqual([
          new Item("foo", 9, 39),
          new Item("bar", 3, 19)
        ]);
      });

      it("lowers quality by one if the sell date has not passed", () => {
        const items = [new Item("foo", 2, 40)];
        const shop = new Shop(items);
        shop.updateQuality();
        expect(shop.items).toEqual([new Item("foo", 1, 39)]);
      });

      it("lowers quality by one if the sell date has not passed", () => {
        const items = [new Item("foo", 0, 40)];
        const shop = new Shop(items);
        shop.updateQuality();
        expect(shop.items).toEqual([new Item("foo", -1, 38)]);
      });

      it("ensures quality of an item is never negative", () => {
        const items = [new Item("foo", 0, 0)];
        const shop = new Shop(items);
        shop.updateQuality();
        expect(shop.items[0].quality).toEqual(0);
      });

      describe("Aged Brie", () => {
        it("increases in quality by 1 each run", () => {
          const items = [new Item("Aged Brie", 10, 10)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(11);
        });

        it("never goes over 50 in quality", () => {
          const items = [new Item("Aged Brie", 10, 50)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(50);
        });

        it("increases twice as fast if sellIn is less than one", () => {
          const items = [new Item("Aged Brie", 0, 25)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(27);
        });

        it("does not change if quality is 50 and sellIn < 0", () => {
          const items = [new Item("Aged Brie", -1, 50)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(50);
        });
      });

      describe("Sulfuras, Hand of Ragnaros", () => {
        it("does not decrease in quality", () => {
          const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(80);
        });

        it("does not change if sellIn is less than 0", () => {
          const items = [new Item("Sulfuras, Hand of Ragnaros", -1, 80)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(80);
        });
      });

      describe("Conjured", () => {
        it("degrades in quality twice as fast", () => {
          const items = [new Item("Conjured", 10, 20)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(18);
        });

        it("it degrades by four if the sellIn is less than 0", () => {
          const items = [new Item("Conjured", -1, 20)];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(16);
        });
      });

      describe("Backstage passes to a TAFKAL80ETC concert", () => {
        it("increases by 1 if sellIn is equal or more than 11", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(21);
        });

        it("increases by 2 if there are 10 days or less", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(22);
        });

        it("does not go over 50 when quality is 49 and sellIn is less than 11", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(50);
        });

        it("does not go over 50 when quality is 49 and sellIn is less than 6", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(50);
        });

        it("quality increases by two sellIn is less than 10", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(21);
        });

        it("increases by 3 if there are 5 days or less", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(23);
        });

        it("drops in quality to 0 when sellIn is less or equal to 0", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(0);
        });

        it("never goes over 50 in quality", () => {
          const items = [
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)
          ];
          const shop = new Shop(items);
          shop.updateQuality();
          expect(shop.items[0].quality).toEqual(50);
        });
      });
    });
  });
});
