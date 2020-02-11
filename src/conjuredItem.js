import { decreaseQuality, decreaseSellin} from './gilded_rose';

export const isConjured = item => item.name.split(' ')[0].toLowerCase() === 'conjured'
export function conjured(item) {
    decreaseQuality(item)
    decreaseQuality(item)
    decreaseSellin(item)
    if (item.sellIn < 0) {
        decreaseQuality(item)
        decreaseQuality(item)   
    }
}
