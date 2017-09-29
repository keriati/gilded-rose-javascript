const MAX_QUALITY = 50;
const MIN_QUALITY = 0;

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
    this.items.forEach((item) => {
      const itemUpdater = getItemUpdater(item.name);
      item.quality = itemUpdater.quality(item.quality, item.sellIn);
      item.sellIn = itemUpdater.sellIn(item.sellIn);
    });
    return this.items;
  }
}

function getItemUpdater(itemName) {
  return Object.assign({}, itemUpdaterMap.standard, itemUpdaterMap[getItemType(itemName)]);
}

function getItemType(itemName) {
  if (isLegendary(itemName)) {
    return 'legendary';
  }
  if (isAgingItem(itemName)) {
    return 'aging';
  }
  if (isBackstagePassItem(itemName)) {
    return 'backstagePass';
  }
  if (isConjuredItem(itemName)) {
    return 'conjured';
  }
  return 'standard';
}

function isLegendary(itemName) {
  return itemName == 'Sulfuras, Hand of Ragnaros';
}
function isAgingItem(itemName) {
  return itemName == 'Aged Brie';
}
function isBackstagePassItem(itemName) {
  return itemName.indexOf('Backstage passes') === 0;
}
function isConjuredItem(itemName) {
  return itemName.indexOf('Conjured') === 0;
}

const itemUpdaterMap = {
  aging: {
    quality: function (quality, sellIn) {
      return sellIn > 0 ? changeQuality(quality, 1) : changeQuality(quality, 2);
    }
  },
  backstagePass: {
    quality: function (quality, sellIn) {
      if (sellIn > 10) {
        return changeQuality(quality, 1);
      }
      if (sellIn > 5) {
        return changeQuality(quality, 2);
      }
      if (sellIn > 0) {
        return changeQuality(quality, 3);
      }
      //after concert
      return 0;
    }
  },
  legendary: {
    quality: function (quality) {
      return quality;
    },
    sellIn: function (sellIn) {
      return sellIn;
    }
  },
  conjured: {
    quality: function (quality, sellIn) {
      return sellIn > 0 ? changeQuality(quality, -2) : changeQuality(quality, -4);
    }
  },
  standard: {
    quality: function (quality, sellIn) {
      return sellIn > 0 ? changeQuality(quality, -1) : changeQuality(quality, -2);
    },
    sellIn: function (sellIn) {
      return sellIn - 1;
    }
  }
};

function changeQuality(quality, difference) {
  var retVal = quality + difference;
  if (retVal > MAX_QUALITY) {
    return MAX_QUALITY;
  }
  if (retVal < MIN_QUALITY) {
    return MIN_QUALITY;
  }
  return retVal;
}
