import { CreditCard } from '../../../src/api/models/CreditCard';
import { CreditCardService } from '../../../src/api/services/CreditCardService';
import { events } from '../../../src/api/subscribers/events';
import { EventDispatcherMock } from '../lib/EventDispatcherMock';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';
import moment from 'moment';

describe('FilmService', () => {

    test('Find should return a list of films', async (done) => {
        const log = new LogMock();
        const repo = new RepositoryMock();
        const ed = new EventDispatcherMock();
        const cards = new CreditCard();
        const limit = 100;
        const offset = 0;
        cards.id = '1';
        cards.name = 'Test user';
        cards.limit = 0;
        cards.cardnumber = 12345678
        repo.list = [cards];
        const cardService = new CreditCardService(repo as any, ed as any, log);
        const list = await cardService.find(limit , offset);
        expect(list[0].name).toBe(cards.name);
        done();
    });

    test('Create should dispatch subscribers', async (done) => {
        const log = new LogMock();
        const repo = new RepositoryMock();
        const ed = new EventDispatcherMock();
        const cards = new CreditCard();
        cards.id = '1';
        cards.name = 'Test USER';
        cards.cardnumber = 1234567491
        const cardService = new CreditCardService(repo as any, ed as any, log);
        const newCard = await cardService.create(cards);
        expect(ed.dispatchMock).toBeCalledWith([events.create.created, newCard]);
        done();
    });

});
