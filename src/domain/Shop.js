import { AgedBrieItem } from "./AgedBrieItem";
import { BackstagePassesItem } from "./BackstagePassesItem";
import { SulfurasItem } from "./SulfurasItem";

export class Shop {
  static updateQuality(items = []) {
    // return items.forEach((item) => {
    //   item.onEndTheOfDay();
    // });

    for (var i = 0; i < items.length; i++) {
      const item = items[i];

      // quality
      if (item instanceof SulfurasItem) {
        item.onEndOfTheDay();
        continue;
      }

      // quality
      if (item instanceof AgedBrieItem) {
        item.onEndOfTheDay();
        continue;
      }

      if (
        !(item instanceof AgedBrieItem) &&
        !(item instanceof BackstagePassesItem)
      ) {
        // decrease quality

        if (items[i].quality > 0) {
          items[i].quality = items[i].quality - 1;
        }
      } else {
        // increasing of quality

        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
          if (item instanceof BackstagePassesItem) {
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

      // sellIn

      items[i].sellIn = items[i].sellIn - 1;

      if (items[i].sellIn < 0) {
        if (!(item instanceof AgedBrieItem)) {
          if (!(item instanceof BackstagePassesItem)) {
            if (items[i].quality > 0) {
              items[i].quality = items[i].quality - 1;
            }
          } else {
            // zeros out quality
            items[i].quality = items[i].quality - items[i].quality;
          }
        }

        // handled in AgedBrie
        // else {
        //   if (items[i].quality < 50) {
        //     // increases quality for aged brie
        //     items[i].quality = items[i].quality + 1;
        //   }
        // }
      }
    }
  }
}
