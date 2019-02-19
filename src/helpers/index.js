export const isSulfuras = name => name === "Sulfuras, Hand of Ragnaros";
export const isBrie = name => name === "Aged Brie";
export const isBackstagePasses = name =>
  name === "Backstage passes to a TAFKAL80ETC concert";
export const isConjured = name => name === "Conjured Mana Cake";

export const isExpired = item => {
  return item.sellIn < 0;
};
