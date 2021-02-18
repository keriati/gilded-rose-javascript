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

const increaseItemQuality = (item) => {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
}

const decreaseItemQuality = (item) => {
  if (item.quality > MIN_QUALITY) {
    item.quality = item.quality - 1;
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

function updateDefaultItem(item) {
  decreaseSellInValue(item);
  decreaseItemQuality(item);
  if (isExpired(item)) {
    decreaseItemQuality(item);
  }
}

const updateItem = (item) => {

  if(isSulfuras(item)) {
    return;
  }

  if(isAgedBrie(item)) {
    updateAgedBrieItem(item);
    return;
  }

  if (isBackStagePasses(item)) {
    updateBackStageItem(item);
    return;
  }

  updateDefaultItem(item);
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItem);
  }
}
