import {isBrie, updateBrie} from "./modules/brie";
import {isPass, updatePass} from "./modules/pass";
import {isSulfuras} from "./modules/sulfuras";
import {updateRegular} from "./modules/regular";

const updateItem = item => {
  if (isSulfuras(item)) {
    return;
  }
  if (isBrie(item)) {
    return updateBrie(item);
  }
  if (isPass(item)) {
    return updatePass(item);
  }

  updateRegular(item);
};

export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(updateItem)
    return this.items;
  }
}
