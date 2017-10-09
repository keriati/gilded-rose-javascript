export class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {


  constructor (items=[]) {
    this.items = items;
  }

  getSpecialsConfiguration () {
    return [
      {
        name:"Sulfuras, Hand of Ragnaros",
        sellInChange: 0,
        qualityChange: 0
      },
      {
        name:"Aged Brie",
        sellInChange: -1,
        qualityChange: 1
      },
      {
        name:"Backstage passes to a TAFKAL80ETC concert",
        sellInChange: -1,
        qualityChange: 1,
        qualityChange5days: 3,
        qualityChange10days: 2,
        qualityAfterExpiration: 0
      },
      {
        name: "Conjured Mana Cake",
        sellInChange: -1,
        qualityChange: -2
      }
    ];
  }

  updateQuality() {
    const specialsConfiguration = this.getSpecialsConfiguration();

    for (let i = 0; i < this.items.length; i++) {

      let sellInChange = -1;
      let qualityChange = -1;
      let qualityChange5days = -1;
      let qualityChange10days = -1;
      let qualityAfterExpiration = undefined;

      for (let config of specialsConfiguration) {
        if (config.name === this.items[i].name) {
          sellInChange = config.sellInChange;
          qualityChange = config.qualityChange;
          qualityChange5days = (config.qualityChange5days ? config.qualityChange5days : config.qualityChange);
          qualityChange10days = (config.qualityChange10days ? config.qualityChange10days : config.qualityChange);
          qualityAfterExpiration = (config.qualityAfterExpiration !== undefined ? config.qualityAfterExpiration : undefined);
        }
      }
      let current = this.items[i];
      if (qualityChange !== 0) {
        if (current.sellIn < 1) {
          this.items[i].quality = this.items[i].quality + 2 * qualityChange;
        } else if (current.sellIn < 6) {
          this.items[i].quality = this.items[i].quality + qualityChange5days;
        } else if (current.sellIn < 11){
          this.items[i].quality = this.items[i].quality + qualityChange10days;
        } else {
          this.items[i].quality = this.items[i].quality + qualityChange;
        }

        if (this.items[i].quality < 0) {
          this.items[i].quality = 0;
        }

        if (this.items[i].quality > 50) {
          this.items[i].quality = 50;
        }
      }

      this.items[i].sellIn = this.items[i].sellIn + sellInChange;

      if (qualityAfterExpiration !== undefined &&
          this.items[i].sellIn < 0) {
        this.items[i].quality = qualityAfterExpiration;
      }

    }

    return this.items;
  }
}
