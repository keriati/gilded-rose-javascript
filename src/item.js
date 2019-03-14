export default class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const mutateQuality = (op, item) => {
  item.quality = op(item.quality);

  if (item.quality < 0) {
    item.quality = 0;
  }

  if (item.quality > 50) {
    item.quality = 50;
  }
};
