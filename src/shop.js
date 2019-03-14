import getActions from './rules';


export default class Shop {
  constructor(items = []){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const {
        updateQuality,
        updateSellIn,
      } = getActions(item.name);

      updateQuality(item);
      updateSellIn(item);
    });

    return this.items;
  }
}
