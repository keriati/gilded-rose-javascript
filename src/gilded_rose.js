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

    const processAgedBrie = ({ prevSellIn, quality }) => {
      const sellIn = prevSellIn - 1;

      quality++;
      if (sellIn < expirationSellIn) {
        quality++;
      }

      return {
        name: ItemNames.agedBrie,
        sellIn,
        quality: ensureQualityMaxMin(quality),
      };
    };

    const processTicket = ({ prevSellIn, quality }) => {
      const sellIn = prevSellIn - 1;
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

      return {
        name: ItemNames.ticket,
        sellIn,
        quality: ensureQualityMaxMin(quality),
      };
    };
    const processCake = ({ prevSellIn, quality }) => {
      const sellIn = prevSellIn - 1;
      quality--;

      if (sellIn < expirationSellIn) {
        quality--;
      }

      quality--;
      const isDecreasingQualityDouble = sellIn < expirationSellIn;
      if (isDecreasingQualityDouble) {
        quality--;
      }

      return {
        name: ItemNames.cake,
        sellIn,
        quality: ensureQualityMaxMin(quality),
      };
    };
    const processDefault = ({ name, prevSellIn, quality }) => {
      const sellIn = prevSellIn - 1;
      quality--;
      const isDecreasingQualityDouble = sellIn < expirationSellIn;
      if (isDecreasingQualityDouble) {
        quality--;
      }

      return { name, sellIn, quality: ensureQualityMaxMin(quality) };
    };

    return this.items.map(({ name, sellIn: prevSellIn, quality }) => {
      if (name === ItemNames.sulfuras) {
        return { name, sellIn: prevSellIn, quality };
      }

      if (name === ItemNames.agedBrie) {
        return processAgedBrie({ prevSellIn, quality });
      }

      if (name === ItemNames.ticket) {
        return processTicket({ prevSellIn, quality });
      }

      if (name === ItemNames.cake) {
        return processCake({ prevSellIn, quality });
      }

      return processDefault({ name, prevSellIn, quality });
    });
  }
}
