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
export const minMax = (value, option = { min: -Infinity, max: Infinity }) =>
  Math.max(option.min, Math.min(value, option.max));

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    const ensureQualityMaxMin = (quality) =>
      minMax(quality, { min: 0, max: 50 });

    return this.items.map(({ name, sellIn: prevSellIn, quality }) => {
      if (name === ItemNames.sulfuras) {
        return { name, sellIn: prevSellIn, quality };
      }

      const sellIn = prevSellIn - 1;

      // Increasing part
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

        return { name, sellIn, quality: ensureQualityMaxMin(quality) };
      }

      // Decreasing part
      quality--;
      if (sellIn < 0) {
        quality--;
      }

      if (name === ItemNames.cake) {
        quality--;

        if (sellIn < 0) {
          quality--;
        }
      }

      return { name, sellIn, quality: ensureQualityMaxMin(quality) };
    });
  }
}
