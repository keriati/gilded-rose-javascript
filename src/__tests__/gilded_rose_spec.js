import { Shop, Item } from '../gilded_rose';

describe("Shop.updateQuality()",  () => {
    it("Never changes the name",  () => {
        const gildedRose = new Shop([new Item("name", 0, 0)]);

        gildedRose.updateQuality();
        const updatedItem = gildedRose.items[0];

        expect(updatedItem.name).toEqual("name");
    });

    describe("Default item", () => {
       it("Decreases sellIn value by 1 at the end of the day", () => {
           const gildedRose = new Shop([new Item("Default item", 5, 5)]);

           gildedRose.updateQuality();
           const updatedItem = gildedRose.items[0];

           expect(updatedItem.sellIn).toEqual(4);
       });

        it("Decreases Quality value by 1 at the end of the day if item is not expired", () => {
            const gildedRose = new Shop([new Item("Default item", 5, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(4);
        });

        it("Decreases Quality value by 2 at the end of the day if item is expired", () => {
            const gildedRose = new Shop([new Item("Default item", 0, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(3);
        });

        it("does not decrease quality value below 0", () => {
            const gildedRose = new Shop([new Item("Default item", 0, 0)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(0);
        });
    });

    describe("Aged Brie Item", () => {
        it("Decreases sellIn value by 1 at the end of the day", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 5, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.sellIn).toEqual(4);
        });

        it("Increases Quality value by 1 at the end of the day if item is not expired", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 5, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(6);
        });

        it("Increases Quality value by 2 at the end of the day if item is not expired", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(7);
        });

        it("does never increase quality over 50", () => {
            const gildedRose = new Shop([new Item("Aged Brie", 0, 50)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(50);
        });
    });

    describe("Backstage passes item", () => {
        it("Decreases sellIn value by 1 at the end of the day", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.sellIn).toEqual(4);
        });

        it("Increases Quality value by 1 at the end of the day if there are more than 10 days left till concert", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(6);
        });

        it("Increases Quality value by 2 at the end of the day if there are 10 days or less till the concert", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(7);
        });

        it("Increases Quality value by 3 at the end of the day if there are 5 days or less till the concert", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(8);
        });

        it("Drops quality to 0 after the concert", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(0);
        });

        it("does never increase quality of item over 50", () => {
            const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50)]);

            gildedRose.updateQuality();
            const updatedItem = gildedRose.items[0];

            expect(updatedItem.quality).toEqual(50);
        });
    });

    describe("Sulfuras item", () => {

    });

});
