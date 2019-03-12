export function increaseQuality(item) {
  if (item.quality === 50) return;
  item.quality++;
}
export function decreaseQuality(item) {
  if (item.quality === 0) return;
  item.quality--;
}
