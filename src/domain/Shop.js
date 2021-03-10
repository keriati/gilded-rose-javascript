import { AgedBrieItem } from "./AgedBrieItem";
import { BackstagePassesItem } from "./BackstagePassesItem";
import { SulfurasItem } from "./SulfurasItem";

export class Shop {
  static updateQuality(items = []) {
    for (var i = 0; i < items.length; i++) {
      const item = items[i];

      if (
        !(item instanceof AgedBrieItem) &&
        !(item instanceof BackstagePassesItem)
      ) {
        if (items[i].quality > 0) {
          if (!(item instanceof SulfurasItem)) {
            items[i].quality = items[i].quality - 1;
          }
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
          if (items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
            if (items[i].sellIn < 11) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1;
              }
            }
            if (items[i].sellIn < 6) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1;
              }
            }
          }
        }
      }
      if (!(item instanceof SulfurasItem)) {
        items[i].sellIn = items[i].sellIn - 1;
      }
      if (items[i].sellIn < 0) {
        if (!(item instanceof AgedBrieItem)) {
          if (!(item instanceof BackstagePassesItem)) {
            if (items[i].quality > 0) {
              if (!(item instanceof SulfurasItem)) {
                items[i].quality = items[i].quality - 1;
              }
            }
          } else {
            items[i].quality = items[i].quality - items[i].quality;
          }
        } else {
          if (items[i].quality < 50) {
            items[i].quality = items[i].quality + 1;
          }
        }
      }
    }
  }
}
