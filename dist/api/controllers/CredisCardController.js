"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredtCardController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const CreditCard_1 = require("../models/CreditCard");
const CreditCardService_1 = require("../services/CreditCardService");
const express = tslib_1.__importStar(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const class_validator_1 = require("class-validator");
const Logger_1 = require("../../decorators/Logger");
const RequestHeaderMiddleware_1 = require("../customMiddleware/RequestHeaderMiddleware");
const RequestHashingMiddleware_1 = require("../customMiddleware/RequestHashingMiddleware");
const moment_1 = require("moment");
const env_1 = require("../../env");
let CredtCardController = class CredtCardController {
    constructor(creditCardService, log) {
        this.creditCardService = creditCardService;
        this.log = log;
    }
    getCardList(authorization, urc, limit, offset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!limit) {
                limit = env_1.env.app.constants.noofRecordCount;
            }
            if (!offset) {
                offset = env_1.env.app.constants.startIndex;
            }
            this.log.info(`Inside getCardList urc: ${urc} :: limit: ${limit} :: offset ${offset}`);
            const cardList = yield this.creditCardService.find(limit, offset);
            return cardList;
        });
    }
    addCreditCardDetails(body, authorization, urc, xsignature, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info(`urc: ${urc} :: name: ${body.name} :: timestamp ${moment_1.now()}`);
            const errors = yield class_validator_1.validate(body, { validationError: { target: false } });
            if (errors.length > 0) {
                throw { httpCode: 400, errors };
            }
            return yield this.creditCardService.create(body);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    tslib_1.__param(0, routing_controllers_1.HeaderParam('Authorization')),
    tslib_1.__param(1, routing_controllers_1.HeaderParam('Unique-Reference-Code')),
    tslib_1.__param(2, routing_controllers_1.QueryParam('limit')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('offset')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CredtCardController.prototype, "getCardList", null);
tslib_1.__decorate([
    routing_controllers_1.UseBefore(RequestHashingMiddleware_1.RequestHashingMiddleware),
    routing_controllers_1.Post(),
    routing_controllers_1.HttpCode(201),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })),
    tslib_1.__param(1, routing_controllers_1.HeaderParam('Authorization')),
    tslib_1.__param(2, routing_controllers_1.HeaderParam('Unique-Reference-Code')),
    tslib_1.__param(3, routing_controllers_1.HeaderParam('X-Signature')),
    tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreditCard_1.CreditCard, String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CredtCardController.prototype, "addCreditCardDetails", null);
CredtCardController = tslib_1.__decorate([
    routing_controllers_1.UseBefore(bodyParser.urlencoded(), RequestHeaderMiddleware_1.RequestHeadermiddleware, bodyParser.json()),
    routing_controllers_1.JsonController('/cards'),
    routing_controllers_openapi_1.OpenAPI({ security: [{ basicAuth: [] }] }),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [CreditCardService_1.CreditCardService, Object])
], CredtCardController);
exports.CredtCardController = CredtCardController;
//# sourceMappingURL=CredisCardController.js.map