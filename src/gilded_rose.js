export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ItemNames = {
  agedBrie: "Aged Brie",
  ticket: "Backstage passes to a TAFKAL80ETC concert",
  sulfuras: "Sulfuras, Hand of Ragnaros",
  cake: "Conjured Mana Cake",
};

const increasingItemNames = [ItemNames.agedBrie, ItemNames.ticket];

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    return this.items.map(({ name, sellIn: prevSellIn, quality }) => {
      if (name === ItemNames.sulfuras) {
        return { name, sellIn: prevSellIn, quality };
      }

      const sellIn = prevSellIn - 1;

      if (increasingItemNames.includes(name)) {
        quality++;

        if (name === ItemNames.agedBrie) {
          if (sellIn < 0) {
            quality++;
          }
        }

        if (name === ItemNames.ticket) {
          if (sellIn < 10) {
            quality++;
          }
          if (sellIn < 5) {
            quality++;
          }
          if (sellIn < 0) {
            quality = 0;
          }
        }
      } else {
        quality--;

        if (sellIn < 0) {
          quality--;
        }

        if (name === ItemNames.cake) {
          quality--;
        }
      }

      return { name, sellIn, quality: Math.max(0, Math.min(quality, 50)) };
    });
  }
}
