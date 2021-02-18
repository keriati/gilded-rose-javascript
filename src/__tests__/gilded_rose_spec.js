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

});
