import {Shop, Item} from '../gilded_rose';

describe("Aged brie", function () {
    it("Quality increases by 1", () => {
        const shop = new Shop([new Item('Aged Brie', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(21);
    })

    it("Decreses sellin by 1", () => {
        const shop = new Shop([new Item('Aged Brie', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.sellIn).toEqual(9);
    })

    it("Quality doesn't go above 50", () => {
        const shop = new Shop([new Item('Aged Brie', 10, 50)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(50);
    })

    it("Quality incres by 2 after sellin", () => {
        const shop = new Shop([new Item('Aged Brie', 0, 30)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(32);
    })



});
