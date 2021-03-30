/**
 *
 * @param item
 * @param itemTypes {isUsable}
 * @param defaultItemType
 */
export function create(item, itemTypes, defaultItemType) {
    const itemType = itemTypes.find(it => it.isUsable(item.name)) || defaultItemType;
    return new itemType(item.name, item.sellIn, item.quality);
}