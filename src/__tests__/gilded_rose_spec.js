import { Shop, Item } from '../gilded_rose';

describe("Gilded Rose", function () {

    // xit("should foo", function () {
    //     const gildedRose = new Shop([new Item("foo", 0, 0)]);
    //     const items = gildedRose.updateQuality();
    //     expect(items[0].name).toEqual("fixme");
    // });

    it('should reduce quality by 1 when sellIn is above 0', () => {

        const gildedRose = new Shop([new Item("Some item", 1, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(9);

    });

    it('should reduce the quality by 2 when sellIn is 0', () => {

        const gildedRose = new Shop([new Item("Some item", 0, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(8);

    });

    it('should never reduce the quality to negative', () => {

        const gildedRose = new Shop([new Item("Some item", 1, 0)]);
        gildedRose.updateQuality();
        gildedRose.updateQuality();
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);

    });

    it('should increase the quality of Aged Brie by time', () => {

        const gildedRose = new Shop([new Item("Aged Brie", 1, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(11);

    });


    it('should never increase the quality to over 50', () => {

        const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);

    });
    
    it('should increase the quality of Aged Brie with sellIn negative', () => {

        const gildedRose = new Shop([new Item("Aged Brie", 0, 48)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);

    });

    it('should increase the quality of Aged Brie with sellIn negative, but not over 50', () => {

        const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);

    });

    it('should never decrease sellIn for Sulfuras', () => {

        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 2, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(2);

    });

    it('should never decrease quality for Sulfuras', () => {

        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 2, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(10);

    });
    
    it('should never decrease quality for Sulfuras after sellIn period', () => {

        const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', -1, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(10);

    });

    // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
    it('should increase quality of Backstage passes by 1 with over 10 days to sell', () => {

        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(11);

    });
    
    it('should increase quality of Backstage passes by 2 with 10 or fewer days to sell', () => {

        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(12);

    });

    it('should not increase quality of Backstage passes to over 50 with 10 or fewer days to sell', () => {

        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);

    });

    it('should not increase quality of Backstage passes to over 50 with 1-5 days to sell', () => {

        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(50);

    });
    

    it('should increase quality of Backstage passes by 3 with 1-5 days to sell', () => {

        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(13);

    }); 
    
    it('should reset the quality of Backstage passes to 0 after sellIn period', () => {

        const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);

    });

    it("should degrade Conjured items correctly", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", 7, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(6);
    });

    it("should degrade Conjured items correctly after sellIn period", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 8)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(4);
    });
    
    it("should not degrade Conjured items quality under 0 after sellIn period (quality = 1)", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 1)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });
    
    it("should not degrade Conjured items quality under 0 after sellIn period (quality = 2)", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 2)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

    it("should not degrade Conjured items quality under 0 after sellIn period (quality = 3)", function () {
        const gildedRose = new Shop([new Item("Conjured Mana Cake", -1, 3)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
    });

});
