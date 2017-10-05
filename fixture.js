import { Item, Shop } from './src/gilded_rose';

const items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Sulfuras, Hand of Ragnaros', -1, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49));
// this conjured item does not work properly yet
items.push(new Item('Conjured Mana Cake', 3, 6));


const gildedRose = new Shop(items);

const days = 2;

for (let i = 0; i < days; i++) {
    showHeaderFor(i);
    showItemsFor(i);
    gildedRose.updateQuality();
}

function showHeaderFor(day) {
    console.log('-------- day ' + day + ' --------');
}

function showItemsFor(day) {
    console.log('name, sellIn, quality');
    for (let j = 0; j < gildedRose.items.length; j++) {
        const item = gildedRose.items[j];
        console.log(item.name + ', ' + item.sellIn + ', ' + item.quality);
    }
    console.log("\n");
}
