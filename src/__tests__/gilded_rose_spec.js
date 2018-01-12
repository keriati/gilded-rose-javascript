import { Shop, Item } from '../gilded_rose';

const MIN_VALUE = 0;
const MAX_VALUE = 50;

describe('Gilded Rose', () => {
    it('creates empty list of items when none is provided', () => {
        const gildedRose = new Shop();

        expect(gildedRose.items.length).toEqual(0);
    });
});

describe('Standard item', () => {
    it('does not change name', () => {
        const gildedRose = new Shop([new Item('foo', 0, 0)]);

        const items = gildedRose.updateQuality();

        expect(items[0].name).toEqual('foo');
    });

    it('decreases sell in date by 1', () => {
        const gildedRose = new Shop([new Item('foo', 1, 1)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toEqual(0);
    });

    it('decreases quality by 1 before sell in date', () => {
        const gildedRose = new Shop([new Item('foo', 1, 1)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });

    it('decreases quality by 2 after sell in date', () => {
        const gildedRose = new Shop([new Item('foo', 0, 2)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });

    it('does not decrease quality bellow ' + MIN_VALUE, () => {
        const gildedRose = new Shop([
            new Item('foo', 1, MIN_VALUE),
            new Item('foo', 0, MIN_VALUE + 1)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(MIN_VALUE);
        expect(items[1].quality).toEqual(MIN_VALUE);
    });
});

describe('Aging item', () => {
    it('increases quality by 1 before sell in date', () => {
        const gildedRose = new Shop([new Item('Aged Brie', 1, 0)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(1);
    });

    it('increases quality by 2 after sell in date', () => {
        const gildedRose = new Shop([new Item('Aged Brie', 0, 0)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(2);
    });

    it('does not increase quality above ' + MAX_VALUE, () => {
        const gildedRose = new Shop([
            new Item('Aged Brie', 1, MAX_VALUE),
            new Item('Aged Brie', 0, MAX_VALUE - 1)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(MAX_VALUE);
        expect(items[1].quality).toEqual(MAX_VALUE);
    });
});

describe('Legendary item', () => {
    it('does not change sell in date', () => {
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);

        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).toEqual(1);
    });

    it('does not change quality', () => {
        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 80)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(80);
    });
});

describe('Backstage passes', () => {
    it('increases quality by 1 more than 10 days before concert', () => {
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 0)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(1);
    });
  
    it('increases quality by 2 10 - 6 days before concert', () => {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0),
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 0)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(2);
        expect(items[1].quality).toEqual(2);
    });

    it('increases quality by 3 5 or less days before concert', () => {
        const gildedRose = new Shop([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 0)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(3);
        expect(items[1].quality).toEqual(3);
    });

    it('decreases quality to 0 after concert', () => {
        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 1)]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).toEqual(0);
    });
});

describe('Snapshot test', () => {
    it('does not change snapshot', () => {
        const items = [];

        items.push(new Item('+5 Dexterity Vest', 10, 20));
        items.push(new Item('Aged Brie', 2, 0));
        items.push(new Item('Elixir of the Mongoose', 5, 7));
        items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
        items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
        items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
        // this conjured item does not work properly yet
        items.push(new Item('Conjured Mana Cake', 3, 6));
        
        
        const gildedRose = new Shop(items);
        
        const days = 2;
        
        for (let i = 0; i < days; i++) {
            gildedRose.updateQuality();
            expect(gildedRose.items).toMatchSnapshot();
        }
        
    });
});