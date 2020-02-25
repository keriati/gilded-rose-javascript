export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;

function isBrie(item) {
  return item.name === 'Aged Brie';
}

function isPass(item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert';
}

function isSulfuras(item) {
  return item.name === 'Sulfuras, Hand of Ragnaros';
}

function increaseQuality(item) {
  if (item.quality < MAX_QUALITY) {
    item.quality += 1;
  }
}

const MIN_QUALITY = 0;

function decreaseQuality(item) {
  if (item.quality > MIN_QUALITY) {
    item.quality -= 1;
  }
}

function updateItem(item) {
  if (isSulfuras(item)) {
    return;
  }

  item.sellIn -= 1;


  if (isBrie(item)) {
    increaseQuality(item);
    if (item.sellIn < 0) {
      if (isBrie(item)) {
        increaseQuality(item);
      }
    }
    return;
  }
  if (isPass(item)) {
    increaseQuality(item);
    if (item.sellIn < 10) {
      increaseQuality(item);
    }
    if (item.sellIn < 5) {
      increaseQuality(item);
    }
    if (item.sellIn < 0) {
      item.quality -= item.quality;
    }
    return;
  }
  decreaseQuality(item);
  if (item.sellIn < 0) {
    decreaseQuality(item);
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItem)
    return this.items;
  }
}
