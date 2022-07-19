"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityNoCacheMiddleware = void 0;
const tslib_1 = require("tslib");
const helmet = tslib_1.__importStar(require("helmet"));
const routing_controllers_1 = require("routing-controllers");
let SecurityNoCacheMiddleware = class SecurityNoCacheMiddleware {
    use(req, res, next) {
        return helmet.noCache()(req, res, next);
    }
};
SecurityNoCacheMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before' })
], SecurityNoCacheMiddleware);
exports.SecurityNoCacheMiddleware = SecurityNoCacheMiddleware;
//# sourceMappingURL=SecurityNoCacheMiddleware.js.map