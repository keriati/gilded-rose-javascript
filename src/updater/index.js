import * as BrieUpdater from "../modules/brie";
import * as PassUpdater from "../modules/pass";
import * as SulfurasUpdater from "../modules/sulfuras";
import * as RegularUpdater from "../modules/regular";

const UPDATERS = [BrieUpdater, PassUpdater,SulfurasUpdater, RegularUpdater];

export const getUpdater = (item) => {
    return UPDATERS.find(updater => updater.check(item))
};