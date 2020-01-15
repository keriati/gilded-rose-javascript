import {agedBrieSKU,backstagePassesToATafkalConcert,sulfurasHandofRagnaros,conjuredProduct } from './products';

export const increaseQuality = item => {
    if (item.quality < 50) {
        item.quality = item.quality + 1;
    }
    return item;
}

export const decreaseQuality = (item, byAmout = 1) => {
    if (item.quality > 0) {
        item.quality = item.quality - byAmout;
    }
}

export const isBackstagePassesToATafkalConcert = item => item.name == backstagePassesToATafkalConcert;
export const isAgedBrie = item => item.name == agedBrieSKU;
export const isSulfuras = item => item.name == sulfurasHandofRagnaros;
export const isConjured = item => item.name == conjuredProduct;