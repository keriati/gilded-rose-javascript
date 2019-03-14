import { Shop, Item } from '../gilded_rose';

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
    ];
  });

  it('has correct state after each of 6 days', () => {
    const gildedRose = new Shop(items);

    for (let i = 0; i < 7; i++) {
      gildedRose.updateQuality();

      expect(gildedRose.items).toMatchSnapshot();
    }
  });
});
