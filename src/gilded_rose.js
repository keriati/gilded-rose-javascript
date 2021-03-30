export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(item => {
      item.update();
    });
    return this.items;
  }
}
