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

function isLesserThanMaximumQuality(item) {
  return item.quality < 50;
}

function setItemQuality(item, quality) {
  item.quality = quality;
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

function isIncreasingItem(name) {
  // return name === ("Aged Brie" || name === "Backstage passes to a TAFKAL80ETC concert"
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
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            decreaseQuality(this.items[i]);
          }
        }
      } else {
        if (isLesserThanMaximumQuality(this.items[i])) {
          increaseQuality(this.items[i]);
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              increaseQuality(this.items[i]);
            }
            if (this.items[i].sellIn < 6) {
              if (isLesserThanMaximumQuality(this.items[i])) {
                increaseQuality(this.items[i]);
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        decreaseSellIn(this.items[i]);
      }
      //
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (
              this.items[i].quality > 0 &&
              this.items[i].name != "Sulfuras, Hand of Ragnaros"
            ) {
              decreaseQuality(this.items[i]);
            }
          } else {
            setQualityToZero(this.items[i]);
          }
        } else {
          if (isLesserThanMaximumQuality(this.items[i])) {
            increaseQuality(this.items[i]);
          }
        }
      }
    }

    return this.items;
  }
}
