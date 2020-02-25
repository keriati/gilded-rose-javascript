import { Shop, Item } from '../gilded_rose';

const createStore = (name, sellIn, quality) => {
    let gildedRose;
    if(name) {
        gildedRose = new Shop([new Item(name, sellIn, quality)]);
    } else {
        gildedRose = new Shop([])
    }
    return gildedRose.updateQuality();
}
describe("Gilded Rose", function () {

    // it("should foo", function () {
    //     const gildedRose = new Shop([new Item("foo", 0, 0)]);
    //     const items = gildedRose.updateQuality();
    //     expect(items[0].name).toEqual("foo");
    // });
    describe("Shop functionality", () => {
        it("creates a shop with no items", () => {
            const items = createStore();
            expect(items.length).toEqual(0);
        });
        it("creates a shop with one item", () => {
            const items = createStore('Aged Brie', 2, 0);
            expect(items.length).toEqual(1);
        });
    })

    describe("Item Brie", () => {
        it('Creates the shop with the Brie item', () => {
            const items = createStore('Aged Brie', 2, 0);
            expect(items[0].name).toEqual('Aged Brie');
        })
        it("Decreases sellIn on update", () => {
            const items = createStore('Aged Brie', 2, 0);
            expect(items[0].sellIn).toEqual(1);
        });
        it("Increase quality on update", () => {
            const items = createStore('Aged Brie', 2, 0);
            expect(items[0].quality).toEqual(1);
        });
        it("Does not increase quality over 50", () => {
            const items = createStore('Aged Brie', 2, 50);
            expect(items[0].quality).toEqual(50);
        })
        it("Does not increase quality over 50 when sellIn negative", () => {
            const items = createStore('Aged Brie', -1, 2);
            expect(items[0].quality).toEqual(4);
        })
        it("Does not increase quality over 50 when sellIn negative", () => {
            const items = createStore('Aged Brie', -1, 50);
            expect(items[0].quality).toEqual(50);
        })
        it("Does not increase quality over 50 when sellIn negative", () => {
            const items = createStore('Aged Brie', -1, 49);
            expect(items[0].quality).toEqual(50);
        })
    });

    describe('Item Sulfuras', () => {
        it('Creates the shop with the Sulfuras item', () => {
            const items = createStore('Sulfuras, Hand of Ragnaros', 5, 80);
            expect(items[0].name).toEqual('Sulfuras, Hand of Ragnaros');
        })
        it('Does not decrease sellIn on update', () => {
            const items = createStore('Sulfuras, Hand of Ragnaros', 5, 80);
            expect(items[0].sellIn).toEqual(5);
        })
        it('Does not decrease quality on update', () => {
            const items = createStore('Sulfuras, Hand of Ragnaros', 5, 80);
            expect(items[0].quality).toEqual(80);
        })
        it('Dos not update quality on update when sellIn is negative', () => {
            const items = createStore('Sulfuras, Hand of Ragnaros', -1, 80);
            expect(items[0].quality).toEqual(80);
        })
        it('Dos not decrease sellIn on update when sellIn is negative', () => {
            const items = createStore('Sulfuras, Hand of Ragnaros', -1, 80);
            expect(items[0].sellIn).toEqual(-1);
        })
    });
    describe('Item Backstage Pass', () => {
        it('Creates the shop with the Backstage pass item', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 15, 20);
            expect(items[0].name).toEqual('Backstage passes to a TAFKAL80ETC concert');
        });
        it('Decreases sellIn on update', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 15, 20);
            expect(items[0].sellIn).toEqual(14)
        });
        it('Does not increase quality over 50', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 15, 50);
            expect(items[0].quality).toEqual(50)
        });
        it('Increases quality by 1 on update', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 15, 20);
            expect(items[0].quality).toEqual(21)
        });
        it('Increases quality by 2 on update if sellIn is 10', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 10, 20);
            expect(items[0].quality).toEqual(22)
        });
        it('Does not increase quality over 50 if sellIn is 10 or lower', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 9, 50);
            expect(items[0].quality).toEqual(50)
        });
        it('Does not increase quality over 50 if sellIn is 10 or lower and quality under 50', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 9, 49);
            expect(items[0].quality).toEqual(50)
        });
        it('Increases quality by 2 on update if sellIn is lower than 10 and greater than 5', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 10, 20);
            expect(items[0].quality).toEqual(22)
        });
        it('Increases quality by 3 on update if sellIn is 5', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 5, 20);
            expect(items[0].quality).toEqual(23)
        });
        it('Does not increase quality over 50 if sellIn is 5 or lower', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 4, 50);
            expect(items[0].quality).toEqual(50)
        });
        it('Does not increase quality over 50 if sellIn is 5 or lower and quality under 50', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 4, 49);
            expect(items[0].quality).toEqual(50)
        });
        it('Increases quality by 3 on update if sellIn is lower than 5', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 4, 20);
            expect(items[0].quality).toEqual(23)
        });
        it('Drops quality to 0 if sellIn is 0', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', 0, 20);
            expect(items[0].quality).toEqual(0)
        });
        it('Drops quality to 0 if sellIn is lower than 0', () => {
            const items = createStore('Backstage passes to a TAFKAL80ETC concert', -1, 20);
            expect(items[0].quality).toEqual(0)
        });

    });

    describe('Standard Item', () => {
        it('Creates the shop with the standard item', () => {
            const items = createStore('+5 Dexterity Vest', 10, 20);
            expect(items[0].name).toEqual('+5 Dexterity Vest');
        });
        it('Decreases sellIn on update', () => {
            const items = createStore('+5 Dexterity Vest', 10, 20);
            expect(items[0].sellIn).toEqual(9);
        })
        it('Decreases quality on update',() => {
            const items = createStore('+5 Dexterity Vest', 10, 20);
            expect(items[0].quality).toEqual(19);
        })
        it('Decreases quality on update',() => {
            const items = createStore('+5 Dexterity Vest', -1, 0);
            expect(items[0].quality).toEqual(0);
        })
        it('Decreases quality by 2 on update when is expired', () => {
            const items = createStore('+5 Dexterity Vest', -1, 20);
            expect(items[0].quality).toEqual(18);
        })
        it('On update quality does not decrease to a negative number', () => {
            const items = createStore('+5 Dexterity Vest', 10, 0);
            expect(items[0].quality).toEqual(0);
        })
    })



});
