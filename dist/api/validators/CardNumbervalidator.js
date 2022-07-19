"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardNumbervalidator = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
let CardNumbervalidator = class CardNumbervalidator {
    validate(value, args) {
        if (/[^0-9-\s]+/.test(value)) {
            return false;
        }
        let nCheck = 0;
        let bEven = false;
        value = value.toString().replace(/\D/g, '');
        if (value.length > 19) {
            return false;
        }
        for (let n = value.length - 1; n >= 0; n--) {
            const cDigit = value.charAt(n);
            let nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }
            nCheck += nDigit;
            bEven = !bEven;
        }
        return (nCheck % 10) === 0;
    }
    defaultMessage(args) {
        return 'Invalid Card Number $value';
    }
};
CardNumbervalidator = tslib_1.__decorate([
    class_validator_1.ValidatorConstraint({ name: 'cardnumber', async: false })
], CardNumbervalidator);
exports.CardNumbervalidator = CardNumbervalidator;
//# sourceMappingURL=CardNumbervalidator.js.map