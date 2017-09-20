export class Item {
  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

export class Shop {
  constructor(items=[]) {
    this.items = items
  }
  updateQuality() {
    const categories = {
      aged: ['Aged Brie'],
      passes: ['Backstage passes to a TAFKAL80ETC concert'],
      legendary: ['Sulfuras, Hand of Ragnaros'],
      conjured: ['Conjured Dagger', 'Conjured Familiar'],
    }

    const isInCategory = (item, category) => {
      return categories[category].indexOf(item) >= 0
    }

    const isQualityMaxed = (quality) => {
      return quality >= 50
    }

    const decreaseQuality = (quality) => {
      return quality > 0 ? quality - 1 : quality
    }

    const increaseQuality = (quality) => {
      return isQualityMaxed(quality) ? quality : quality + 1
    }

    const handleSellIn = (name, sellIn) => {
      return isInCategory(name, 'legendary') ? sellIn : sellIn - 1
    }

    for (let i = 0; i < this.items.length; i++) {
      const {name} = this.items[i]
      let {sellIn, quality} = this.items[i]

      sellIn = handleSellIn(name, sellIn)

      if (isInCategory(name, 'conjured')) {
        quality = decreaseQuality(quality)
        quality = decreaseQuality(quality)
        if (sellIn < 0) {
          quality = decreaseQuality(quality)
          quality = decreaseQuality(quality)
        }
      } else if (isInCategory(name, 'aged')) {
        quality = increaseQuality(quality)
        if (sellIn < 0) {
          quality = increaseQuality(quality)
        }
      } else if (isInCategory(name, 'passes')) {
        if (sellIn < 0) {
          quality = 0
        } else {
          quality = increaseQuality(quality)
          if (sellIn < 11) {
            quality = increaseQuality(quality)
          }
          if (sellIn < 6) {
            quality = increaseQuality(quality)
          }
        }
      } else if (!isInCategory(name, 'legendary')) {
        quality = decreaseQuality(quality)
        if (sellIn < 0) {
          quality = decreaseQuality(quality)
        }
      }
      this.items[i].sellIn = sellIn
      this.items[i].quality = quality
    }

    return this.items
  }
}
