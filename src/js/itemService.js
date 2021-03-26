export function isBackstagePass(itemName){
    return itemName == 'Backstage passes to a TAFKAL80ETC concert'
}

export function isAgedBrie(itemName){
    return itemName == 'Aged Brie'
}

export function isSulfuras(itemName){
    return itemName == 'Sulfuras, Hand of Ragnaros'
}

export function isConjured(itemName){
    return itemName == 'Conjured'
}

export function decreaseQuality(quality){
    return quality - 1;
}

export function increaseQuality(quality){
    return quality + 1;
}

export function floorQuality(){
    return 0;
}

export function isQualityAboveMin(quality){
    return quality > 0;
}

export function isQualityBelowMax(quality){
    return quality < 50;
}

export function increaseItemQuality(item){
    if (isQualityBelowMax(item.quality)) {
        item.quality = increaseQuality(item.quality);
    }
}

export function decreaseItemQuality(item){
    if (isQualityAboveMin(item.quality)) {
        item.quality = decreaseQuality(item.quality);
    }   
}
