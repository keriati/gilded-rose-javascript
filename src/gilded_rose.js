export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;

const isAgedBrie = (item) => {
  return item.name === 'Aged Brie';
}

const isBackStagePasses = (item) => {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

const isSulfuras = (item) => {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

const increaseItemQuality = (item) => {
  if (item.quality < MAX_QUALITY) {
    item.quality = item.quality + 1;
  }
}

const decreaseItemQuality = (item) => {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
}

const decreaseSellInValue = (item) => {
  item.sellIn = item.sellIn - 1;
}

const updateItem = (item) => {

  if(isSulfuras(item)) {
    return;
  }

  if (!isAgedBrie(item) && !isBackStagePasses(item)) {
    decreaseItemQuality(item);
  } else {
    increaseItemQuality(item);
    if (isBackStagePasses(item)) {
      if (item.sellIn < 11) {
        increaseItemQuality(item);
      }
      if (item.sellIn < 6) {
        increaseItemQuality(item);
      }
    }
  }
  decreaseSellInValue(item);
  if (item.sellIn < 0) {
    if (!isAgedBrie(item)) {
      if (!isBackStagePasses(item)) {
        decreaseItemQuality(item);
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      increaseItemQuality(item);
    }
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItem);
  }
}
