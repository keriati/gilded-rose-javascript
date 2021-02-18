export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

const isAgedBrie = ({name}) => name === 'Aged Brie';

const isBackStagePasses = ({name}) => name === 'Backstage passes to a TAFKAL80ETC concert';

const isSulfuras = ({name}) => name === 'Sulfuras, Hand of Ragnaros';

const isConjured = ({name}) => name ==='Conjured Mana Cake';

const increaseItemQuality = (item) => {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
}

const decreaseItemQuality = (item, numberOfDecreases = 1) => {
    if((item.quality - numberOfDecreases) > MIN_QUALITY) {
      item.quality = item.quality - numberOfDecreases;
    } else {
      item.quality = 0;
    }
}

const decreaseSellInValue = (item) => {
  item.sellIn = item.sellIn - 1;
}

const isExpired = ({sellIn}) => sellIn < 0;


const updateAgedBrieItem = (item) => {
  decreaseSellInValue(item);
  increaseItemQuality(item);
  if (isExpired(item)) {
    increaseItemQuality(item);
  }
}

const updateBackStageItem = (item) => {
  increaseItemQuality(item);
  if (item.sellIn < 11) {
    increaseItemQuality(item);
  }
  if (item.sellIn < 6) {
    increaseItemQuality(item);
  }
  decreaseSellInValue(item);
  if (isExpired(item)) {
    item.quality = MIN_QUALITY;
  }
}

const updateDefaultItem = (item) => {
  decreaseSellInValue(item);
  decreaseItemQuality(item);
  if (isExpired(item)) {
    decreaseItemQuality(item);
  }
}

const updateConjuredItem = (item) => {
  decreaseSellInValue(item);
  decreaseItemQuality(item, 2);
  if (isExpired(item)) {
    decreaseItemQuality(item, 2);
  }
}

const getUpdateStrategy = (item) => {

  if(isSulfuras(item)) {
    return () => {}

  }

  if(isAgedBrie(item)) {
    return updateAgedBrieItem;
  }

  if (isBackStagePasses(item)) {
    return updateBackStageItem;

  }

  if(isConjured(item)) {
    return updateConjuredItem;
  }

  return updateDefaultItem;
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      const updateStrategy = getUpdateStrategy(item);
      updateStrategy(item);
    });
  }
}
