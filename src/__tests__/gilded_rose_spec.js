import {Shop, Item} from '../gilded_rose';

describe("Gilded Rose", function () {

    describe('At the end of each day our system lowers both values for every item', function () {
        it("At the end of each day our system lowers sell in for every item", function () {
            const gildedRose = new Shop([new Item("foo", 10, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toEqual(9);
        });

        it("At the end of each day our system lowers quality for every item", function () {
            const gildedRose = new Shop([new Item("foo", 10, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(19);
        });
    });

    describe('Once the sell by date has passed, Quality degrades twice as fast', function () {
        it("Once the sell by date has passed, Quality degrades twice as fast", function () {
            const gildedRose = new Shop([new Item("foo", 0, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(18);
        });
    });

    describe('The Quality of an item is never negative', function () {
        it("The Quality of an item is never negative", function () {
            const gildedRose = new Shop([new Item("foo", 0, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });

        it("The Quality of an item is never negative when quality was 0", function () {
            const gildedRose = new Shop([new Item("foo", 0, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });

        it("The Quality of an item is never negative when quality was 0 and item is not expired", function () {
            const gildedRose = new Shop([new Item("foo", 10, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });

    describe('"Aged Brie" actually increases in Quality the older it gets', function () {

        it('Aged brie will increase in quality', function () {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(21);
        });

        it('Aged brie will increase in quality even if its expired', function () {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 20)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(22);
        });

    });

    describe('The Quality of an item is never more than 50', function () {
        describe('Aged brie', function () {
            it('Aged brie will not exceed 50 when expired when quality is below 50', function () {
                const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(50);
            });

            it('Aged brie will not exceed 50 when expired when quality is 50', function () {
                const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(50);
            });

            it('Aged brie will not exceed 50', function () {
                const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
                const items = gildedRose.updateQuality();
                expect(items[0].quality).toEqual(50);
            });
        });

        it('Quality of basic item will not exceed 50', function () {
            const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(50);
        })
    });


    describe('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', function () {
       it('Sulfuras will not decrease in quality when not expired', function () {
           const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
           const items = gildedRose.updateQuality();
           expect(items[0].quality).toEqual(80);
       })

        it('Sulfuras will not decrease in quality when expired', function () {
            const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(80);
        })
    });

    describe('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;', function () {
        it('Passes Quality increases by 1 when there are more than 10 days to concert', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(41);
        });

        it('Passes Quality increases by 2 when there are 10 days to concert', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(42);
        });

        it('Passes Quality increases by 3 when there are 5 days to concert', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(43);
        });

        it('Passes Quality increases by 3 when there are 5 days to concert and does not exceed 50', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(50);
        });

        it('Passes Quality increases by 3 when there are 5 days to concert and does not exceed 50 when its closely bellow 50', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(50);
        });

        it('Passes Quality drops to zero after the concert', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 45)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });

        it('Passes Quality is still zero after few days after the concert', function () {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -5, 0)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        });
    });

    describe('"Conjured" items degrade in Quality twice as fast as normal items', function () {
        it('Conjured item degrades by 2 when not expired', function () {
            const gildedRose = new Shop([new Item("Conjured", 5, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(8);
        })

        it('Conjured item degrades by 4 when not expired', function () {
            const gildedRose = new Shop([new Item("Conjured", 0, 10)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(6);
        })

        it('Conjured item does not drop bellow 0 when not expired', function () {
            const gildedRose = new Shop([new Item("Conjured", 5, 1)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        })

        it('Conjured item does not drop bellow 0 when expired', function () {
            const gildedRose = new Shop([new Item("Conjured", 0, 3)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toEqual(0);
        })
    })
});
