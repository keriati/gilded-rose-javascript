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

  // So I would like you to refactor this piece of code so that
  // the updateQuality() function loops over the items, and based on given set of
  // predicates it will (or will not) perform updates on the item
  //
  // use something like:
  // addModification(predicateFn, updateFn)
  updateQuality() {
    // Replace for loop with a functional array.map
    for (var i = 0; i < this.items.length; i++) {
      // create a variable that holds the currently processed item (const item = ....)
      // use && instead of nesting conditions
      if (
        // use strict equal comparison
        this.items[i].name != "Aged Brie" &&
        // use strict equal comparison
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // use && instead of nesting conditions
        if (this.items[i].quality > 0) {
          // use strict equal comparison
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            // create and use function decreaseQuality(item)
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        // use && instead of nesting conditions
        if (this.items[i].quality < 50) {
          // create and use function increaseQuality(item)
          this.items[i].quality = this.items[i].quality + 1;
          // use && instead of nesting conditions
          if (
            // use strict equal comparison
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // use && instead of nesting conditions
            if (this.items[i].sellIn < 11) {
              // use && instead of nesting conditions
              if (this.items[i].quality < 50) {
                // create and use function increaseQuality(item)
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                // create and use function increaseQuality(item)
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // use strict equal comparison
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        // create and use function decreaseSellIn(item)
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // use && instead of nesting conditions
      // create and use a function that tells me that the product is expired - e.g. isExpired(item)
      if (this.items[i].sellIn < 0) {
        // use strict equal comparison
        // use && instead of nesting conditions
        if (this.items[i].name != "Aged Brie") {
          // use && instead of nesting conditions
          if (
            // use strict equal comparison
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            // use && instead of nesting conditions
            if (this.items[i].quality > 0) {
              // use && instead of nesting conditions
              // use strict equal comparison
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                // create and use function decreaseQuality(item)
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            // create and use a function to set quality to 0, e.g. setWorthless(item)
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            // create and use function increaseQuality(item)
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
