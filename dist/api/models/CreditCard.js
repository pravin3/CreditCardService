"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCard = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const CardNumbervalidator_1 = require("../validators/CardNumbervalidator");
let CreditCard = class CreditCard {
};
tslib_1.__decorate([
    typeorm_1.ObjectIdColumn(),
    tslib_1.__metadata("design:type", Object)
], CreditCard.prototype, "_id", void 0);
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], CreditCard.prototype, "id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], CreditCard.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.Validate(CardNumbervalidator_1.CardNumbervalidator),
    class_validator_1.IsInt(),
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    tslib_1.__metadata("design:type", Number)
], CreditCard.prototype, "cardnumber", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], CreditCard.prototype, "limit", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], CreditCard.prototype, "createAt", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], CreditCard.prototype, "updateAt", void 0);
CreditCard = tslib_1.__decorate([
    typeorm_1.Entity()
], CreditCard);
exports.CreditCard = CreditCard;
//# sourceMappingURL=CreditCard.js.map