const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const AGED_BRIE = "Aged Brie";
const SULFURAS = "Sulfuras, Hand of Ragnaros";
const BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";
const CONJURED = "Conjured Mana Cake";

const increaseQualityByOne = (item) => {
  item.quality = item.quality + 1;
};
const decreaseQualityByOne = (item) => {
  item.quality = item.quality - 1;
};
const setQualityToZero = (item) => {
  item.quality = 0;
};
const ageItemByDay = (item) => {
  item.sellIn = item.sellIn - 1;
};

export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map((item) => {
      if (item.name === SULFURAS) {
        return item;
      }
      if (item.name === AGED_BRIE){
        
      }

      if (item.name === AGED_BRIE || item.name === BACKSTAGE_PASSES) {
        if (item.quality < MAX_QUALITY) {
          increaseQualityByOne(item);
          if (item.name == BACKSTAGE_PASSES) {
            if (item.sellIn < 11) {
              if (item.quality < MAX_QUALITY) {
                increaseQualityByOne(item);
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < MAX_QUALITY) {
                increaseQualityByOne(item);
              }
            }
          }
        }
      }
      if (item.name != AGED_BRIE && item.name != BACKSTAGE_PASSES) {
        if (item.quality > MIN_QUALITY) {
          decreaseQualityByOne(item);
        }
      }
      ageItemByDay(item);
      if (item.sellIn < 0) {
        if (item.name === BACKSTAGE_PASSES) {
          setQualityToZero(item);
          return item;
        }
        if (item.name === AGED_BRIE) {
          if (item.quality < MAX_QUALITY) {
            increaseQualityByOne(item);
            return item;
          }
        }
        if (item.quality > 0) {
          decreaseQualityByOne(item);
          return item;
        }
      }
      return item;
    });
  }
}
