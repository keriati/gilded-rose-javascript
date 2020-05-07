export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function isConjured(item) {
  return item.name === "Conjured" ? true : false;
}

function decreaseQuality(item) {
  item.quality = item.quality - 1;
}

function increaseQuality(item) {
  if (item.quality < 50) {
    item.quality = item.quality + 1;
  }
}

function setQualityToZero(item) {
  item.quality = 0;
}

function decreaseSellIn(item) {
  item.sellIn = item.sellIn - 1;
}

function isBackstage(name) {
  return name === "Backstage passes to a TAFKAL80ETC concert";
}

function isSulfuras(name) {
  return name === "Sulfuras, Hand of Ragnaros";
}

function isNotIncreasingItem(name) {
  if (
    name !== "Aged Brie" &&
    name !== "Backstage passes to a TAFKAL80ETC concert"
  ) {
    return true;
  }

  return false;
}

export class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      /*
      if (isConjured(this.items[i])) {
        //  business logic

        break;
      }
      */
      if (isNotIncreasingItem(this.items[i].name)) {
        if (this.items[i].quality > 0) {
          if (!isSulfuras(this.items[i].name)) {
            decreaseQuality(this.items[i]);
          }
        }
      } else {
        increaseQuality(this.items[i]);
        if (isBackstage(this.items[i].name)) {
          if (this.items[i].sellIn < 11) {
            increaseQuality(this.items[i]);
          }
          if (this.items[i].sellIn < 6) {
            increaseQuality(this.items[i]);
          }
        }
      }
      if (!isSulfuras(this.items[i].name)) {
        decreaseSellIn(this.items[i]);
      }
      //
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (!isBackstage(this.items[i].name)) {
            if (this.items[i].quality > 0 && !isSulfuras(this.items[i].name)) {
              decreaseQuality(this.items[i]);
            }
          } else {
            setQualityToZero(this.items[i]);
          }
        } else {
          increaseQuality(this.items[i]);
        }
      }
    }

    return this.items;
  }
}
