import {Shop, Item} from '../gilded_rose';

describe("Dexterity vest", function () {
    it("Decreses quality by 1", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(19);
    })

    it("Decreses sellin by 1", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.sellIn).toEqual(9);
    })

    it("Quality shoudn't drop below 0", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 10, 0)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(0);
    })

    it("Quality drop by 2 if sellIn is 0", () => {
        const shop = new Shop([new Item('+5 Dexterity Vest', 0, 10)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(8);
    })


});
