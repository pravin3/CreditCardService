"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const CreditCard_1 = require("../models/CreditCard");
let CreditCardRepository = class CreditCardRepository extends typeorm_1.Repository {
};
CreditCardRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(CreditCard_1.CreditCard)
], CreditCardRepository);
exports.CreditCardRepository = CreditCardRepository;
//# sourceMappingURL=CreditCardRepository.js.map