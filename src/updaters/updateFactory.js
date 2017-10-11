import * as SulfurasUpdater from "./sulfuras";
import * as BackstagePassUpdater from "./backstage";
import * as AgedBrieUpdater from "./agedBrie";
import * as ConjuredUpdater from "./conjured";
import * as NormalUpdater from "./normal";

const ITEM_UPDATERS = [
    SulfurasUpdater,
    BackstagePassUpdater,
    AgedBrieUpdater,
    ConjuredUpdater,
];

export const getItemUpdaterFor = (item)  =>
    ITEM_UPDATERS.find(ItemUpdater => ItemUpdater.isUsableFor(item))
    || NormalUpdater;
