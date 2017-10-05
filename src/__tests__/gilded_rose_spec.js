import {
  Shop,
  Item,
  AGED_BRIE,
  SULFURAS,
  BACKSTAGE_PASSES,
  CONJURED_PREFIX,
} from '../gilded_rose';

const NORMAL_ITEM = 'a';

const SELL_IN_NORMAL = 10;
const SELL_IN_ZERO = 0;
const SELL_IN_INTERVAL_INFINITY_TO_10 = 45;
const SELL_IN_INTERVAL_10_TO_5 = 7;
const SELL_IN_INTERVAL_5_TO_0 = 2;

const QUALITY_NORMAL = 10;
const QUALITY_ZERO = 0;
const QUALITY_MIN = 0;
const QUALITY_MAX = 50;
const QUALITY_LEGENDARY = 80;

function createShopWithItem(itemName, sellIn, quality) {
  const i = new Item(itemName, sellIn, quality);
  return new Shop([i]);
}

describe('Item', () => {
  it('has properties correctly defined', () => {
    const i = new Item(NORMAL_ITEM, SELL_IN_NORMAL, QUALITY_NORMAL);

    expect(i.name).toEqual(NORMAL_ITEM);
    expect(i.quality).toEqual(QUALITY_NORMAL);
    expect(i.sellIn).toEqual(SELL_IN_NORMAL);
  });
});

describe('Shop', () => {
  it('has items defined', () => {
    const shop = new Shop();

    expect(shop.items).toBeDefined;
    expect(shop.items.length).toBe(0);
  });
  it('has non empty items when non empty array is passed', () => {
    const shop = createShopWithItem(NORMAL_ITEM, SELL_IN_NORMAL, QUALITY_NORMAL);

    expect(shop.items.length).toBe(1);
  });
});

describe('Rules ', () => {
  it('lower quality and sellIn every day by 1', () => {
    const shop = createShopWithItem(NORMAL_ITEM, SELL_IN_NORMAL, QUALITY_NORMAL);

    const itemsDay1 = shop.updateQuality();

    expect(itemsDay1[0].sellIn).toEqual(SELL_IN_NORMAL - 1);
    expect(itemsDay1[0].quality).toEqual(SELL_IN_NORMAL - 1);
  });
  it('degrade quality by 2 every day when sellIn is 0', () => {
    const shop = createShopWithItem(NORMAL_ITEM, SELL_IN_ZERO, QUALITY_NORMAL);

    const itemsDay1 = shop.updateQuality();

    expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL - 2);
  });

  describe('Quality', () => {
    it('can not be <0', () => {
      const shop = createShopWithItem(NORMAL_ITEM, SELL_IN_NORMAL, QUALITY_ZERO);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_MIN);
    });
    it('can not be >50', () => {
      // Aged Brie increases quality over time
      const shop = createShopWithItem(AGED_BRIE, SELL_IN_NORMAL, QUALITY_MAX);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_MAX);
    });
  });

  describe(`Special item: ${AGED_BRIE}`, () => {
    it('increases quality by 2 every day', () => {
      const shop = createShopWithItem(AGED_BRIE, SELL_IN_NORMAL, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL + 2);
    });
  });

  describe(`Special item: ${SULFURAS}`, () => {
    it('does not decrease quality or sellIn over time', () => {
      const shop = createShopWithItem(SULFURAS, SELL_IN_NORMAL, QUALITY_LEGENDARY);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_LEGENDARY);
      expect(itemsDay1[0].sellIn).toEqual(SELL_IN_NORMAL);
    });
  });

  describe(`Special item: ${BACKSTAGE_PASSES}`, () => {
    it('increases quality by 1 every day when sellIn in (Infinity, 10)  ', () => {
      const shop = createShopWithItem(BACKSTAGE_PASSES, SELL_IN_INTERVAL_INFINITY_TO_10, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL + 1);
    });
    it('increases quality by 2 every day when sellIn in <10, 5)', () => {
      const shop = createShopWithItem(BACKSTAGE_PASSES, SELL_IN_INTERVAL_10_TO_5, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL + 2);
    });
    it('increases quality by 3 every day when sellIn in <5, 0)', () => {
      const shop = createShopWithItem(BACKSTAGE_PASSES, SELL_IN_INTERVAL_5_TO_0, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL + 3);
    });
    it('drops quality to 0 when sellIn is 0', () => {
      const shop = createShopWithItem(BACKSTAGE_PASSES, SELL_IN_ZERO, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].quality).toEqual(QUALITY_ZERO);
    });
  });

  describe('Special item: "Conjured ...', () => {
    it('lowers quality by 2 and sellIn by 1 every day', () => {
      // twice that fast as other normal items
      const shop = createShopWithItem(`${CONJURED_PREFIX} ${NORMAL_ITEM}`, SELL_IN_NORMAL, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].sellIn).toEqual(SELL_IN_NORMAL - 1);
      expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL - 2);
    });
    it('degrades quality by 4 every day when sellIn is 0', () => {
      // twice that fast as other normal items
      const shop = createShopWithItem(`${CONJURED_PREFIX} ${NORMAL_ITEM}`, SELL_IN_ZERO, QUALITY_NORMAL);

      const itemsDay1 = shop.updateQuality();

      expect(itemsDay1[0].sellIn).toEqual(SELL_IN_ZERO);
      expect(itemsDay1[0].quality).toEqual(QUALITY_NORMAL - 4);
    });
  })
});
