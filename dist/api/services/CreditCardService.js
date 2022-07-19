"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const EventDispatcher_1 = require("../../decorators/EventDispatcher");
const Logger_1 = require("../../decorators/Logger");
const CreditCardRepository_1 = require("../repositories/CreditCardRepository");
const events_1 = require("../subscribers/events");
const moment_1 = require("moment");
let CreditCardService = class CreditCardService {
    constructor(creditcardRepository, eventDispatcher, log) {
        this.creditcardRepository = creditcardRepository;
        this.eventDispatcher = eventDispatcher;
        this.log = log;
    }
    find(limit, offset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all credit card details');
            const cardList = yield this.creditcardRepository.find({ skip: offset, take: limit });
            cardList.forEach((card) => {
                delete card._id;
            });
            return cardList;
        });
    }
    create(cardObj) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new card => ', cardObj.toString());
            cardObj.id = uuid_1.default.v1();
            cardObj.createAt = moment_1.now();
            cardObj.updateAt = moment_1.now();
            const newCard = yield this.creditcardRepository.save(cardObj);
            this.eventDispatcher.dispatch(events_1.events.create.created, newCard);
            return newCard;
        });
    }
};
CreditCardService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, EventDispatcher_1.EventDispatcher()),
    tslib_1.__param(2, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [CreditCardRepository_1.CreditCardRepository,
        EventDispatcher_1.EventDispatcherInterface, Object])
], CreditCardService);
exports.CreditCardService = CreditCardService;
//# sourceMappingURL=CreditCardService.js.map