"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHeadermiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const HTTP_STATUS = tslib_1.__importStar(require("http-status-codes"));
let RequestHeadermiddleware = class RequestHeadermiddleware {
    use(req, res, next) {
        const authtoken = req.header('Authorization');
        if (!authtoken) {
            throw new routing_controllers_1.HttpError(HTTP_STATUS.BAD_REQUEST, 'The authorization has not been provided');
        }
        else if (authtoken.indexOf('Basic') < 0) {
            throw new routing_controllers_1.HttpError(HTTP_STATUS.UNAUTHORIZED, 'Not Authorized');
        }
        const urc = req.header('Unique-Reference-Code');
        if (!urc) {
            throw new routing_controllers_1.HttpError(HTTP_STATUS.BAD_REQUEST, 'URC can not be empty!!');
        }
        next();
    }
};
RequestHeadermiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], RequestHeadermiddleware);
exports.RequestHeadermiddleware = RequestHeadermiddleware;
//# sourceMappingURL=RequestHeaderMiddleware.js.map