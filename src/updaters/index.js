import { StandardItemUpdater } from './StandardItemUpdater';
import { AgingItemUpdater } from './AgingItemUpdater';
import { LegendaryItemUpdater } from './LegendaryItemUpdater';
import { BackstagePassUpdater } from './BackstagePassUpdater';

//StandardItemUpdater must be kept last, because it handles all items it receives
const updaters = [
    new AgingItemUpdater(),
    new LegendaryItemUpdater(),
    new BackstagePassUpdater(),
    new StandardItemUpdater()
];

export { updaters };
