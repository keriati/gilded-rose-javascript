import { Shop } from '../shop';
import { Item } from '../item';
import { agedBrieSKU, backstagePassesToATafkalConcert, sulfurasHandofRagnaros, genericProduct } from '../products';

describe("Golden rose shop tests", function () {
    
    it("empty store functions", function () {
        const gildedRose = new Shop();
        const items = gildedRose.updateQuality();
        expect(items.length).toEqual(0);
    });
    
    it("system updates items sellIn and quality values next day by a single unit", function() {
        // - At the end of each day our system lowers both values for every item
        const item = new Item(genericProduct, 4, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).toEqual(3);
        expect(gildedRose.items[0].quality).toEqual(3);
    });

    it("quality degrades twice as fast for passed products", function() {
        // - Once the sell by date has passed, Quality degrades twice as fast
        const item = new Item(genericProduct, 0, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(2);
    });

    it("item quality cannot be negative ", function() {
        // The Quality of an item is never negative
        const item = new Item(genericProduct, 1, 0);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(0);
    });

    it("aged brie product has reverse quality system", function() {
        // "Aged Brie" actually increases in Quality the older it gets
        const item = new Item(agedBrieSKU, 1, 1);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(2);
    });
    
    
    it("aged brie product quality cannot be more than fifty", function() {
        // - The Quality of an item is never more than 50
        const item = new Item(agedBrieSKU, 1, 50);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toEqual(50);
    });

    it("sulfuras cannot decrease in quality", function() {
        // - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        const item = new Item(sulfurasHandofRagnaros, 1, 1);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        
        expect(gildedRose.items[0].quality).toEqual(1);
    });




    it("backstagePass has reverse quality system ", function() {
        // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        // Quality drops to 0 after the concert
        const item = new Item(backstagePassesToATafkalConcert, 20, 1);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        
        expect(gildedRose.items[0].quality).toEqual(2);
    });

    it("backstagePass has reverse quality system and increase by when 10 days or less left ", function() {
        // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        // Quality drops to 0 after the concert
        const item = new Item(backstagePassesToATafkalConcert, 10, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        
        expect(gildedRose.items[0].quality).toEqual(6);
    });

    it("backstagePass has reverse quality system and increase by 3 when 5 days or less left ", function() {
        // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        // Quality drops to 0 after the concert
        const item = new Item(backstagePassesToATafkalConcert, 5, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();
        
        expect(gildedRose.items[0].quality).toEqual(7);
    });

    it("backstagePass has reverse quality system and quality drops to zero after the concert ", function() {
        // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
        // Quality drops to 0 after the concert
        const item = new Item(backstagePassesToATafkalConcert, 0, 4);
        const gildedRose = new Shop([item]);
        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toEqual(0);
    });
});
