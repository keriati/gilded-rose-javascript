import {getUpdater} from "./updater";

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      const updater = getUpdater(item);
      updater.update(item);
    });
    return this.items;
  }
}
