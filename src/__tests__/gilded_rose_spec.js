import { Shop, Item } from '../gilded_rose';

const ObjectNames = {
    normal: "Normal Item",
    agedBrie: "Aged Brie",
    sulfuras: "Sulfuras, Hand of Ragnaros",
    passes: "Backstage passes to a TAFKAL80ETC concert",
    conjured: "Conjured"
}
const getShop = (items) => {
    return new Shop(items)
}

const getShopWithNormalItem = (sellIn, quality) => {
    return getShop([normalItem(sellIn, quality)]);
}
const normalItem = (sellIn, quality) => {
    return new Item(ObjectNames.normal, sellIn, quality)
}

const agedBrie = (sellIn, quality) => {
    return new Item("Aged Brie", sellIn, quality)
}

const MaxQuality = 50;
const MaxSulFurasQuality = 80;




describe("Test shop",  () => {
    describe("",  () => {
        it("Lowers quality by 1 after 1 day", () => {
            const item = new Item(ObjectNames.normal, 5, MaxQuality);
            const shop = new Shop([item]);
            const items = shop.updateQuality();
            expect(items[0].quality).toBe(49);
        });
        it("Lowers SellIn by 1 after 1 day", () => {
            const item = new Item(ObjectNames.normal, 5, MaxQuality);
            const shop = new Shop([item]);
            const items = shop.updateQuality();
            expect(items[0].sellIn).toBe(4);
        });
        it("Lowes the Quality by 2 when expired", () => {

            const item = new Item(ObjectNames.normal, 0, 46);
            const shop = new Shop([item]);
            const items = shop.updateQuality();

            expect(items[0].quality).toBe(44);
        });
    })
    describe("Test shop Aged Brie", () => {
        it("Keeps the quality to maximum after 1 day", () => {
            const item = new Item(ObjectNames.agedBrie, 5, MaxQuality)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(MaxQuality);
        });
        it("Increases quality by 1 after 1 day", () => {
            const item = new Item(ObjectNames.agedBrie, 5, 45)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(46);
        });

    });
    describe("Test shop Sulfuras", () => {
        it("Keeps the quality to maximum after 1 day", () => {
            const item = new Item(ObjectNames.sulfuras, 5, MaxSulFurasQuality)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(MaxSulFurasQuality);
        });
        it("keeps the SellIn after 1 day", () => {
            const item = new Item(ObjectNames.sulfuras, 5, 45)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].sellIn).toBe(5);
        });

    });
    describe("Test shop Backstage passes", () => {
        // quality increased by 2 sellIn <=10 sellIn > 5
        // quality increased by 3 sellIn <= 5
        // sellIn 
        
        
        
        it("increases the Quality by 2 when sellIn between 5 and 10", () => {
            const item = new Item(ObjectNames.passes, 7, 30)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(32);
        });
       it("increases the Quality by 3 when sellIn between 0 and 5", () => {
            const item = new Item(ObjectNames.passes, 4, 30)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(33);
        });
       it("sets the quality to 0 if expired", () => {
            const item = new Item(ObjectNames.passes, 0, 30)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(0);
        });
       it("increases the quality by 1 if sellIn > 10", () => {
            const item = new Item(ObjectNames.passes, 22, 30)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(31);
        });
        it("does not exceed quality over 50", () => {
            const item = new Item(ObjectNames.passes, 7, 49)
            const shop = new Shop([item]);
            const updatedItems = shop.updateQuality();
            expect(updatedItems[0].quality).toBe(50);
        });

    });

});
