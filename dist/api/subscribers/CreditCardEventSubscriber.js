"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmEventSubscriber = void 0;
const tslib_1 = require("tslib");
const event_dispatch_1 = require("event-dispatch");
const logger_1 = require("../../lib/logger");
const CreditCard_1 = require("../models/CreditCard");
const events_1 = require("./events");
const log = new logger_1.Logger(__filename);
let FilmEventSubscriber = class FilmEventSubscriber {
    onUserCreate(creditCard) {
        log.info('CreditCard Details ' + creditCard.toString() + ' created!');
    }
};
tslib_1.__decorate([
    event_dispatch_1.On(events_1.events.create.created),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreditCard_1.CreditCard]),
    tslib_1.__metadata("design:returntype", void 0)
], FilmEventSubscriber.prototype, "onUserCreate", null);
FilmEventSubscriber = tslib_1.__decorate([
    event_dispatch_1.EventSubscriber()
], FilmEventSubscriber);
exports.FilmEventSubscriber = FilmEventSubscriber;
//# sourceMappingURL=CreditCardEventSubscriber.js.map