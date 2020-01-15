import { Shop } from '../shop';
import { agedBrieSKU, backstagePassesToATafkalConcert, sulfurasHandofRagnaros } from '../products';

describe("Golden rose shop tests", function () {
    
    it("empty store functions", function () {
        const gildedRose = new Shop();
        const items = gildedRose.updateQuality();
        expect(items.length).toEqual(0);
    });

});
