import { Shop, Item } from '../gilded_rose';
import { itemNames } from '../constants';


/*

	- At the end of each day our system lowers both values for every item

	- Once the sell by date has passed, Quality degrades twice as fast
	- The Quality of an item is never negative
	- "Aged Brie" actually increases in Quality the older it gets
	- The Quality of an item is never more than 50
	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	  Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	  Quality drops to 0 after the concert
    - "Conjured" items degrade in Quality twice as fast as normal items

*/


describe("Gilded Rose - Normal Item", function () {
    it("should degrade both day and value each day", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 10, 20)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(9);
        expect(shop.items[0].quality).toEqual(19);
    });

    it("should degrade 2x fast when sellby date is <= 0", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 0, 20)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(-1);
        expect(shop.items[0].quality).toEqual(18);
    });

    it("should not be able to get negative", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 0, 0)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(-1);
        expect(shop.items[0].quality).toEqual(0);
    });
});


describe("Gilded Rose - Aged Brie", () => {
    it("Should increase in quality the older it gets", () => {
        const shop = new Shop([new Item(itemNames.AGED_BRIE, 10, 0)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(9);
        expect(shop.items[0].quality).toEqual(1);
    })

    it("Should not increase to more then 50", () => {
        const shop = new Shop([new Item(itemNames.AGED_BRIE, 10, 50)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(9);
        expect(shop.items[0].quality).toEqual(50);
    })

    it("Should not increase to more then 50 even with negative sellIn", () => {
        const shop = new Shop([new Item(itemNames.AGED_BRIE, -1, 41)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(-2);
        expect(shop.items[0].quality).toEqual(43);
    })
    
});

describe("Gilded Rose - Sulfuras", () => {
    it("Should does not decrease in quality", () => {
        const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 1)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(10);
        expect(shop.items[0].quality).toEqual(1);
    })
});

describe("Gilded Rose - Backstage passes ", () => {
    it("it should increase in quality by 1 when there are more than 10 days left ", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, 11, 1)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(10);
        expect(shop.items[0].quality).toEqual(2);
    });

    it("it should increase in quality by 2 when there are 10 days left ", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, 10, 1)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(9);
        expect(shop.items[0].quality).toEqual(3);
    });

    
    it("it should increase in quality by 2 when there are more than 5 days left but less than 10", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, 9, 1)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(8);
        expect(shop.items[0].quality).toEqual(3);
    });

    it("it should increase in quality by 3 when there are 5 days left", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, 5, 1)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(4);
        expect(shop.items[0].quality).toEqual(4);
    });

    it("it should increase in quality by 3 when there are less than 5 days left", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, 4, 1)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(3);
        expect(shop.items[0].quality).toEqual(4);
    });

    it("it should not go to 0 in quality when there are 0 days left", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, 1, 5)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(0);
        expect(shop.items[0].quality).toEqual(8);
    });


    it("it should go to 0 in quality when there are less than 0 days left", () => {
        const shop = new Shop([new Item(itemNames.BACKSTAGE_PASS, -1, 5)]);
        shop.updateQuality();
        expect(shop.items[0].sellIn).toEqual(-2);
        expect(shop.items[0].quality).toEqual(0);
    });

});

