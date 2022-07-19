import { EventSubscriber, On } from 'event-dispatch';
import { Logger } from '../../lib/logger';
import { CreditCard } from '../models/CreditCard';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class FilmEventSubscriber {

    @On(events.create.created)
    public onUserCreate(creditCard: CreditCard): void {
        log.info('CreditCard Details ' + creditCard.toString() + ' created!');
    }

}
