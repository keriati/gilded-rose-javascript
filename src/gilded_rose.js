export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Rule {
  constructor(condition, fn) {
    this.condition = condition;
    this.fn = fn;
  }

  executeIfApplicable(...args) {
    if (this.condition) {
      return this.fn(...args);
    }
  }
}

function decreaseQuality(item) {
  if (item.quality > 0) {
    item.quality = item.quality - 1;
  }
}

function decreaseSellIn(item) {
  item.sellIn = item.sellIn - 1;
}

function increaseQuality(item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
}

function updateBackStageItem(item) {
  increaseQuality(item);
  if (item.sellIn < 11) {
    increaseQuality(item);
  }
  if (item.sellIn < 6) {
    increaseQuality(item);
  }

  decreaseSellIn(item);
  if (item.sellIn < 0) {
    item.quality = 0;
  }
}

function updateAgedbrieItem(item) {
  increaseQuality(item);
  decreaseSellIn(item);
  if (item.sellIn < 0) {
    increaseQuality(item);
  }
}

function updateItem(item) {
  decreaseQuality(item);
  decreaseSellIn(item);
  if (item.sellIn < 0) {
    decreaseQuality(item);
  }
}

export class Shop {
  constructor(items=[]){
    this.items = items;
    this.rules = [
      new Rule(true, Shop.baseUpdate),
    ];
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        continue;
      }
      if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        updateBackStageItem(this.items[i]);
        continue;
      }
      if (this.items[i].name === 'Aged Brie') {
        updateAgedbrieItem(this.items[i]);
        continue;
      }

      updateItem(this.items[i]);
    }

    return this.items
  }

}
