import {Item} from "./item";

const SULFURA = 'Sulfuras, Hand of Ragnaros';

export class Sulfura extends Item {
    update() {

    }
    static isUsable(name) {
        return name === SULFURA;
    }
}
