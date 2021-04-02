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
  constructor(
    items = [],
    minQuality = 0,
    maxQuality = 50,
    ticketConfig = {
      qualityAfterExpiration: 0,
      increaseQualityTrashHolds: [10, 5],
    }
  ) {
    this.items = items;
    this.minQuality = minQuality;
    this.maxQuality = maxQuality;
    this.ticketConfig = ticketConfig;
  }
  updateQuality() {
    const ensureQualityMaxMin = (quality) =>
      minMax(quality, { min: this.minQuality, max: this.maxQuality });

    const expirationSellIn = 0;

    return this.items.map(({ name, sellIn: prevSellIn, quality }) => {
      if (name === ItemNames.sulfuras) {
        return { name, sellIn: prevSellIn, quality };
      }

      const sellIn = prevSellIn - 1;

      const isIncreasingQuality = increasingItemNames.includes(name);
      if (isIncreasingQuality) {
        quality++;

        if (name === ItemNames.agedBrie) {
          quality++;
          if (sellIn < expirationSellIn) {
            quality++;
          }
        }

        if (name === ItemNames.ticket) {
          quality++;
          const isTicketQualityIncreaseByTwo = sellIn < 10;
          const isTicketQualityIncreaseByTree = sellIn < 5;
          const isTicketExpired = sellIn < expirationSellIn;

          if (isTicketQualityIncreaseByTwo) {
            quality++;
          }
          if (isTicketQualityIncreaseByTree) {
            quality++;
          }
          if (isTicketExpired) {
            quality = this.ticketConfig.qualityAfterExpiration;
          }
        }

        return { name, sellIn, quality: ensureQualityMaxMin(quality) };
      }

      quality--;
      const isDecreasingQualityDouble = sellIn < expirationSellIn;
      if (isDecreasingQualityDouble) {
        quality--;
      }

      if (name === ItemNames.cake) {
        quality--;

        if (sellIn < expirationSellIn) {
          quality--;
        }
      }

      return { name, sellIn, quality: ensureQualityMaxMin(quality) };
    });
  }
}
