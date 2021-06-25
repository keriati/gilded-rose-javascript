import { Shop, Item, AGED_BRIE, SULFURAS, BACKSTAGE } from '../gilded_rose';

const SingleItemShopFactory = (name, sellIn, quality) => {
  return new Shop([new Item(name, sellIn, quality)]);
};

describe('Gilded Rose', function () {
  it('should initialize items when not passed to constructor', () => {
    const shop = new Shop();
    expect(shop.items.length).toEqual(0);
  });

  describe('Normal Item', () => {
    it('should foo', function () {
      const gildedRose = SingleItemShopFactory('foo', 0, 0);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toEqual('foo');
    });
    it('should decrease normal item Quality', () => {
      const shop = SingleItemShopFactory('Item', 5, 3);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(2);
    });
    it('should not decrease Quality to negative', () => {
      const shop = SingleItemShopFactory('Item', 5, 0);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
    it('should decrease Quality twice fast when sell by date has passed', () => {
      const shop = SingleItemShopFactory('Item', -1, 5);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(3);
    });
  });

  xdescribe('Conjured Item', () => {
    it('should decrease Conjured item Quality double', () => {
      const shop = SingleItemShopFactory('Conjured Cheese', 5, 3);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(1);
    });
    it('should not decrease Conjured item Quality to negative', () => {
      const shop = SingleItemShopFactory('Conjured Cheese', 5, 1);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
    it('should not decrease Conjured item Quality to negative when 0', () => {
      const shop = SingleItemShopFactory('Conjured Cheese', 5, 0);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe('Aged Brie', () => {
    it('should increase the Quality', () => {
      const shop = SingleItemShopFactory(AGED_BRIE, 5, 2);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(3);
    });
    it('should not increase Quality over maiximum', () => {
      const shop = SingleItemShopFactory(AGED_BRIE, 5, 50);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
    it('should increase Quality even when sell by date has passed', () => {
      const shop = SingleItemShopFactory(AGED_BRIE, -1, 30);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(32);
    });
    it('should not increase Quality when sell by date has passed', () => {
      const shop = SingleItemShopFactory(AGED_BRIE, -1, 49);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
  });

  describe('Sulfuras', () => {
    it('should not change Quality', () => {
      const shop = SingleItemShopFactory(SULFURAS, 5, 10);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(10);
    });
    it('should not change SellIn', () => {
      const shop = SingleItemShopFactory(SULFURAS, 5, 10);
      const items = shop.updateQuality();
      expect(items[0].sellIn).toEqual(5);
    });
    it('should not drop Quality to 0 when sell by date has passed', () => {
      const shop = SingleItemShopFactory(SULFURAS, -1, 10);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(10);
    });
  });

  describe('Backstage passes', () => {
    it('should increase in Quality', () => {
      const shop = SingleItemShopFactory(BACKSTAGE, 15, 10);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(11);
    });
    it('should increase in Quality by 2 when 10 days left', () => {
      const shop = SingleItemShopFactory(BACKSTAGE, 10, 10);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(12);
    });
    it('should increase in Quality by 3 when 5 days left', () => {
      const shop = SingleItemShopFactory(BACKSTAGE, 5, 10);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(13);
    });
    it('should drop Quality to 0 when sell by date has passed', () => {
      const shop = SingleItemShopFactory(BACKSTAGE, 0, 10);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(0);
    });
    it('should not increase Quality more than maximum', () => {
      const shop = SingleItemShopFactory(BACKSTAGE, 10, 49);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
    it('should not increase Quality more than maximum twice', () => {
      const shop = SingleItemShopFactory(BACKSTAGE, 5, 48);
      const items = shop.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
  });
});
