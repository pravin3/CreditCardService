"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHashingMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const HTTP_STATUS = tslib_1.__importStar(require("http-status-codes"));
const crypto = tslib_1.__importStar(require("crypto"));
const env_1 = require("../../env");
let RequestHashingMiddleware = class RequestHashingMiddleware {
    use(req, res, next) {
        if (env_1.env.app.constants.isHashingRequired && env_1.env.app.constants.hashingNotReqMethods.indexOf(req.method) === -1) {
            const xSignature = (req.header('X-Signature') || '').trim();
            if (xSignature) {
                let hash = '';
                const getCryptoHash = env_1.env.app.constants.getCryptoHash;
                console.log(req.body);
                hash = crypto.createHmac('sha256', getCryptoHash).update(JSON.stringify(req.body)).digest('hex');
                console.log(hash);
                if (hash !== xSignature) {
                    throw new routing_controllers_1.HttpError(HTTP_STATUS.BAD_REQUEST, 'Invalid X- signature');
                }
            }
            else {
                throw new routing_controllers_1.HttpError(HTTP_STATUS.BAD_REQUEST, 'X-signature can not be empty');
            }
        }
        next();
    }
};
RequestHashingMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], RequestHashingMiddleware);
exports.RequestHashingMiddleware = RequestHashingMiddleware;
//# sourceMappingURL=RequestHashingMiddleware.js.map