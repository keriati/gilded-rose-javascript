export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const ITEM_TYPE = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
};

const QUALITY = {
  MINIMAL: 0,
  MAXIMAL: 50,
};

const SELL_IN = {
  EXPIRATION: 0,
  DAY_10: 10,
  DAY_05: 5,
};

const decreaseSellIn = (item) => {
  item.sellIn = item.sellIn - 1;
};

const increaseQuality = (item) => {
  if (item.quality >= QUALITY.MAXIMAL) return;

  item.quality = item.quality + 1;
};
const decreaseQuality = (item) => {
  if (item.quality <= QUALITY.MINIMAL) return;

  item.quality = item.quality - 1;
};

const resetQuality = (item) => {
  item.quality = QUALITY.MINIMAL;
};

const updateAgedBrie = (item) => {
  decreaseSellIn(item);

  increaseQuality(item);
  if (item.sellIn < SELL_IN.EXPIRATION) increaseQuality(item);
};

const updateBackstage = (item) => {
  increaseQuality(item);
  if (item.sellIn <= SELL_IN.DAY_10) increaseQuality(item);
  if (item.sellIn <= SELL_IN.DAY_05) increaseQuality(item);

  decreaseSellIn(item);

  if (item.sellIn < SELL_IN.EXPIRATION) resetQuality(item);
};

const updateCommonItem = (item) => {
  decreaseQuality(item);

  decreaseSellIn(item);

  if (item.sellIn < SELL_IN.EXPIRATION) decreaseQuality(item);
};

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  /*
   * Update quality and sellIn properties for all items in the shop for 1 day
   */
  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case ITEM_TYPE.SULFURAS: {
          break;
        }
        case ITEM_TYPE.AGED_BRIE: {
          updateAgedBrie(item);
          break;
        }
        case ITEM_TYPE.BACKSTAGE: {
          updateBackstage(item);
          break
        }
        default: {
          updateCommonItem(item);
        }
      }
    });

    return this.items;
  }
}
