import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

  it("should return empty array when initialized", function () {
    const gildedRose = new Shop();
    const items = gildedRose.updateQuality();
    expect(items).toEqual([]);
  });

    it("should foo", function () {
        const gildedRose = new Shop([new Item("foo", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual("foo");
    });

    it('should quality degrades twice as fast Once the sell by date has passed', () => {
        const gildedRose = new Shop([new Item("foo", -1, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it('should quality of an item be positive', () => {
        const gildedRose = new Shop([new Item("foo", 1, 0), new Item('Aged Brie', 1, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality >= 0).toBeTruthy();
        expect(items[1].quality >= 0).toBeTruthy();
    });

    describe('Aged Brie', () => {
        it('should quality increase', () => {
            let initialQuality = 1;
            const gildedRose = new Shop([new Item("Aged Brie", 2, initialQuality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality > initialQuality).toBeTruthy();
        });

      it('should quality of an item is never more than 50', () => {
        const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
      });

      it("should increase quality when negative sellIn and quality less than 50", function () {
        let gildedRose = new Shop([new Item("Aged Brie", -2, 30)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(32);

        gildedRose = new Shop([new Item("Aged Brie", -2, 50)]);
        items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
      });

      it("should not increase quality when negative sellIn and quality equals to 50", function () {
        const gildedRose = new Shop([new Item("Aged Brie", -2, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);
      });

    });

  describe('Sulfuras', () => {
    it('should quality never decrease', () => {
      let initialQuality = 1;
      let initialSellIn = 2;
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", initialSellIn, initialQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(initialQuality);
      expect(items[0].sellIn).toEqual(initialSellIn);
    });

    it('should quality never decrease when sell by date and available quality', () => {
      let initialQuality = 1;
      let initialSellIn = -1;
      const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", initialSellIn, initialQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(initialQuality);
      expect(items[0].sellIn).toEqual(initialSellIn);
    });

  });

  describe('Backstage passes', () => {
    const itemName = 'Backstage passes to a TAFKAL80ETC concert';
    it('should quality increase by 3 when sellIn is 5 or less', () => {
      let initialQuality = 6;
      let initialSellIn = 4;
      const gildedRose = new Shop([new Item(itemName, initialSellIn, initialQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9);
    });

    it('should quality increase by 2 when sellIn is 10 or less', () => {
      let initialQuality = 6;
      let initialSellIn = 6;
      const gildedRose = new Shop([new Item(itemName, initialSellIn, initialQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
    });

    it('should quality drop to 0 when sell by date', () => {
      let initialQuality = 6;
      let initialSellIn = -1;
      const gildedRose = new Shop([new Item(itemName, initialSellIn, initialQuality)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it('should quality of an item increase only once when reached 50', () => {
      const gildedRose = new Shop([new Item(itemName, 5, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

    it('should quality of an item increase only once when sellIn is more than 11', () => {
      const gildedRose = new Shop([new Item(itemName, 12, 47)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(48);
    });

    it('should quality of an item is never more than 50', () => {
      const gildedRose = new Shop([new Item(itemName, 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });

  });

});
