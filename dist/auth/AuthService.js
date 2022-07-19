"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const Logger_1 = require("../decorators/Logger");
let AuthService = class AuthService {
    constructor(log) {
        this.log = log;
    }
    parseBearerAuthFromRequest(req) {
        const authorization = req.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('credentials provided by the client');
            return authorization.split(' ')[1];
        }
        this.log.info('No credentials provided by the client');
        return undefined;
    }
};
AuthService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map