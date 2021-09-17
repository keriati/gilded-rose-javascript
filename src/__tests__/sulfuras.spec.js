import {Shop, Item} from '../gilded_rose';

describe("Sulfuras", function () {
    it("Quality remains same", () => {
        const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.quality).toEqual(20);
    })

    it("Sellin remains same", () => {
        const shop = new Shop([new Item('Sulfuras, Hand of Ragnaros', 10, 20)]);
        const [updatedItem] = shop.updateQuality();
        expect(updatedItem.sellIn).toEqual(10);
    })


});
