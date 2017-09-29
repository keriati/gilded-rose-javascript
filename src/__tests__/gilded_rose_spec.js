import { Shop, Item } from '../gilded_rose';

describe('Gilded Rose', function () {

    it('should not fail without items', function () {
        const gildedRose = new Shop();
        const items = gildedRose.updateQuality();
        expect(items.length).toEqual(0);
    });

    it('should decrease quality by 1 before sell in date', function () {
        const gildedRose = new Shop([new Item('foo', 10, 7)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toEqual('foo');
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(6);
    });

    it('should decrease quality by 2 after sell in date', function () {
        const gildedRose = new Shop([new Item('foo', 0, 7)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-1);
        expect(items[0].quality).toEqual(5);
    });

    it('should not decrease quality below 0', function () {
        const gildedRose = new Shop([new Item('foo', 10, 0), new Item('Conjured', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(0);
        expect(items[1].sellIn).toEqual(9);
        expect(items[1].quality).toEqual(0);
    });

    it('should increase quality of Aged Brie by 1 before sell in date', function () {
        const gildedRose = new Shop([new Item('Aged Brie', 10, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(1);
    });

    it('should increase quality of Aged Brie by 2 after sell in date', function () {
        const gildedRose = new Shop([new Item('Aged Brie', -2, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-3);
        expect(items[0].quality).toEqual(2);
    });

    it('should not increase quality above 50', function () {
        const gildedRose = new Shop([
            new Item('Aged Brie', 10, 50),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 50),
            new Item('Backstage passes to a TAFKAL80ETC concert', 8, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(50);
        expect(items[1].sellIn).toEqual(9);
        expect(items[1].quality).toEqual(50);
        expect(items[2].sellIn).toEqual(7);
        expect(items[2].quality).toEqual(50);
    });

    it('should not change quality and sell in date of Sulfuras', function () {
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(10);
        expect(items[0].quality).toEqual(80);
    });

    it('should increase quality of Backstage pass by 1 if there are more than 10 days before sell in', function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(19);
        expect(items[0].quality).toEqual(11);
        expect(items[1].sellIn).toEqual(10);
        expect(items[1].quality).toEqual(11);
    });

    it('should increase quality of Backstage pass by 2 if there are 6-10 days before sell in', function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(12);
        expect(items[1].sellIn).toEqual(5);
        expect(items[1].quality).toEqual(12);
    });

    it('should increase quality of Backstage pass by 3 if there are 5 or less days before sell in', function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10)
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(4);
        expect(items[0].quality).toEqual(13);
        expect(items[1].sellIn).toEqual(0);
        expect(items[1].quality).toEqual(13);
    });

    it('should decrease quality of Backstage pass to 0 after the concert', function () {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 50),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(0);
        expect(items[0].quality).toEqual(13);
        expect(items[1].sellIn).toEqual(0);
        expect(items[1].quality).toEqual(50);
        
        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-1);
        expect(items[0].quality).toEqual(0);
        expect(items[1].sellIn).toEqual(-1);
        expect(items[1].quality).toEqual(0);

        items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-2);
        expect(items[0].quality).toEqual(0);
        expect(items[1].sellIn).toEqual(-2);
        expect(items[1].quality).toEqual(0);
    });

    it('should decrease quality of Conjured item by 2 before sell in date', function () {
        const gildedRose = new Shop([new Item('Conjured', 10, 7)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(9);
        expect(items[0].quality).toEqual(5);
    });

    it('should decrease quality of Conjured item by 4 after sell in date', function () {
        const gildedRose = new Shop([new Item('Conjured', 0, 7)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(-1);
        expect(items[0].quality).toEqual(3);
    });
});
