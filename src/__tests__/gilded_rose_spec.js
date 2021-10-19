import { Shop, Item } from "../gilded_rose";

function createShop(name, sellIn, quality) {
  return new Shop([new Item(name, sellIn, quality)]);
}

describe("Gilded Rose", () => {
  describe("Shop", () => {
    describe("Shop.updateQuality()", () => {
      describe("basic behavior", () => {
        it("decrements the SellIn and Quality by one", function () {
          const shop = createShop("foo", 1, 2);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.sellIn).toEqual(0);
          expect(updatedItem.quality).toEqual(1);
        });

        it("decrements the SellIn value below 0", function () {
          const shop = createShop("foo", 0, 2);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.sellIn).toEqual(-1);
        });

        it("doesn't decrement the Quality below 0", function () {
          const shop = createShop("foo", 1, 0);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(0);
        });

        it("decrements the Quality by one when updated Sellin reaches 0", function () {
          const shop = createShop("foo", 1, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(9);
        });

        it("decrements the Quality by two when initial Sellin 0", function () {
          const shop = createShop("foo", 0, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(8);
        });

        it("decrements the Quality by two once initial Sellin < 0", function () {
          const shop = createShop("foo", -1, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(8);
        });
      });

      describe("behavior specific for Items named 'Aged Brie'", () => {
        it("increments the Quality as Sellin decreases", function () {
          const shop = createShop("Aged Brie", 10, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(11);
        });
        it("does not increment the Quality above 50", function () {
          const shop = createShop("Aged Brie", 10, 50);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(50);
        });
      });

      describe("behavior specific for Items named 'Sulfuras'", () => {
        it("does not update Sellin or Quality", () => {
          const shop = createShop("Sulfuras, Hand of Ragnaros", 9, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.sellIn).toEqual(9);
          expect(updatedItem.quality).toEqual(10);
        });
      });

      describe("behavior specific for Items named 'Backstage passes'", () => {
        it("increments the Quality by 1 as Sellin decreases", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            12,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(11);
        });

        it("increments the Quality by 1 as Sellin decreases if Sellin < 11", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            11,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(11);
        });

        it("increments the Quality by 2 as Sellin decreases if Sellin < 10", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            10,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(12);
        });

        it("increments the Quality by 3 as Sellin decreases if Sellin < 6", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            6,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(12);
        });

        it("increments the Quality by 3 as Sellin decreases if Sellin < 5", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            5,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(13);
        });

        it("increments the Quality by 3 as when Sellin reaches 0", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            1,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(13);
        });

        it("Quality drops to 0 after the concert", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            0,
            10
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(0);
        });

        it("does not increment the Quality above 50", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            12,
            50
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(50);
        });

        it("does not increment the Quality above 50 in case the incremential step is more than 1", () => {
          const shop = createShop(
            "Backstage passes to a TAFKAL80ETC concert",
            5,
            48
          );

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(50);
        });
      });

      describe("behavior specific for Items named 'Conjured Mana Cake'", () => {
        it("decrements the Quality by two when updated Sellin reaches 0", function () {
          const shop = createShop("Conjured Mana Cake", 1, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(8);
        });

        it("decrements the Quality by four when initial Sellin 0", function () {
          const shop = createShop("Conjured Mana Cake", 0, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(6);
        });

        it("decrements the Quality by four once initial Sellin < 0", function () {
          const shop = createShop("Conjured Mana Cake", -1, 10);

          const [updatedItem] = shop.updateQuality();

          expect(updatedItem.quality).toEqual(6);
        });
      })
    });
  });
});
