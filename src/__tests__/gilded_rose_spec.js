import Shop from '../shop';
import Item from '../item';
import rules from '../rules';


describe("Gilded Rose", function () {
  let items;

  beforeEach(() => {
    items = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Aged Brie', 2, 50),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 40),
      new Item('Conjured Mana Cake', 3, 6),
    ];
  });

  it('has correct state after each of 6 days', () => {
    const gildedRose = new Shop(items);

    for (let i = 0; i < 7; i++) {
      gildedRose.updateQuality();

      expect(gildedRose.items).toMatchSnapshot();
    }
  });

  describe('Item rules', () => {
    describe('Conjured items', () => {
      const {
        updateQuality,
        updateQualitySpoiled,
      } = rules['Conjured Mana Cake'];

      it('degrades in quality by 2 per day when in fresh state', () => {
        const item = {
          quality: 10,
        };

        updateQuality(item);

        expect(item).toEqual({
          quality: 8,
        });
      });

      it('degrades in quality by 4 per day when in spoiled state', () => {
        const item = {
          quality: 10,
        };

        updateQualitySpoiled(item);

        expect(item).toEqual({
          quality: 6,
        });
      });
    });
  });
});
