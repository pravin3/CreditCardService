import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';
import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { CreditCard } from '../models/CreditCard';
import { CreditCardRepository } from '../repositories/CreditCardRepository';
import { events } from '../subscribers/events';
import { now } from 'moment';
@Service()
export class CreditCardService {

    constructor(
        @OrmRepository() private creditcardRepository: CreditCardRepository,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async find(limit: number, offset: number): Promise<CreditCard[]> {
        this.log.info('Find all credit card details');
        const cardList = await this.creditcardRepository.find({ skip: offset, take: limit });
        cardList.forEach((card) => {
            delete card._id;
        });
        return cardList;
    }

    public async create(cardObj: CreditCard): Promise<any> {
        this.log.info('Create a new card => ', cardObj.toString());
        cardObj.id = uuid.v1();
        cardObj.createAt = now();
        cardObj.updateAt = now();
        const newCard = await this.creditcardRepository.save(cardObj);
        this.eventDispatcher.dispatch(events.create.created, newCard);
        return newCard;
    }

}
