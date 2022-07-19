"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationChecker = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const logger_1 = require("../lib/logger");
const AuthService_1 = require("./AuthService");
function authorizationChecker(connection) {
    const log = new logger_1.Logger(__filename);
    const authService = typedi_1.Container.get(AuthService_1.AuthService);
    return function innerAuthorizationChecker(action, roles) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // here you can use request/response objects from action
            // also if decorator defines roles it needs to access the action
            // you can use them to provide granular access check
            // checker must return either boolean (true or false)
            // either promise that resolves a boolean value
            const credentials = authService.parseBearerAuthFromRequest(action.request);
            if (credentials === undefined) {
                log.warn('No credentials given');
                return false;
            }
            log.info('Successfully checked credentials');
            return true;
        });
    };
}
exports.authorizationChecker = authorizationChecker;
//# sourceMappingURL=authorizationChecker.js.map