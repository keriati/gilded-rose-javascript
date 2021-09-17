import {Shop, Item} from '../gilded_rose';

describe("Backstage passes", function () {
    it("Quality increases by 1", () => {
        const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(21);
    })
    it("Quality increases by 2 when sellIn is <=10", () => {
        const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(22);
    })
    it("Quality increases by 3 when sellIn is <=5", () => {
        const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(23);
    })
    it("Quality drops to 0 when sellIn is 0", () => {
        const shop = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(0);
    })
});
