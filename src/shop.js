import rules from './rules';


export default class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const rule = rules[item.name] || {};

      const updateQuality = rule.updateQuality || rules.default.updateQuality;
      const updateQualitySpoiled = rule.updateQualitySpoiled || rules.default.updateQualitySpoiled;
      const updateSellIn = rule.updateSellIn || rules.default.updateSellIn;
      const isSpoiled = rule.isSpoiled || rules.default.isSpoiled;

      if (isSpoiled(item)) {
        updateQualitySpoiled(item);
      } else {
        updateQuality(item);
      }

      updateSellIn(item);
    });

    return this.items;
  }
}
