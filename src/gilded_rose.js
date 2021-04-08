import {MaxQuality} from "./const";

export class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

function isBrie(item) {
    return item.name === 'Aged Brie';
}

function isPass(item) {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert'
}

function isSulfuras(item) {
    return item.name === 'Sulfuras, Hand of Ragnaros'
}

function isConjured(item) {
    const regEx = new RegExp("conjured", "i");
    return regEx.test(item.name)
}

/*function isNormal(item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert'
}*/

function increaseQuality(item) {
    if (item.quality >= MaxQuality) {
        return;
    }
    item.quality++;
}

function decreaseQuality(item) {
    if (item.quality <= 0) {
        return;
    }
    item.quality--;
}

function decreaseSellIn(item) {
    item.sellIn--;
}

function nullifyQuality(item) {
    item.quality = 0;
}

function isExpired(item) {
    return item.sellIn < 0
}

function isQualityItem(item) {
    return item.quality > 0;
}

function isMaxQuality (item) {
  return item.quality === MaxQuality;
}


function modifyBrie(item) {
  increaseQuality(item);
}
function modifySulfuras(item){
  return;
}

export class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        this.items.forEach((item) => {
            if (isSulfuras(item)) {
                return modifySulfuras(item)
            }

            if (isBrie(item)) {
                return modifyBrie(item);
            }


            if (isPass(item)) {
              if (!isMaxQuality(item)) {
                increaseQuality(item);
                if (item.sellIn < 11) {
                  if (!isMaxQuality(item)) {
                    increaseQuality(item);
                  }
                }
                if (item.sellIn < 6) {
                  if (!isMaxQuality(item)) {
                    increaseQuality(item);
                  }
                }

              }
              decreaseSellIn(item);
              if (isExpired(item)) {
                nullifyQuality(item);
              }
              return;

            }


          if (isQualityItem(item)) {
            decreaseQuality(item);
          }

          decreaseSellIn(item);


          if (isExpired(item)) {
            if (isQualityItem(item)) {
              decreaseQuality(item);
            }
          }


        })

        return this.items;
    }
}
