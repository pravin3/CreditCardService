"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const Logger_1 = require("../../decorators/Logger");
const typeorm_1 = require("typeorm");
const CreditCard_1 = require("../models/CreditCard");
const express = tslib_1.__importStar(require("express"));
const HTTP_STATUS = tslib_1.__importStar(require("http-status-codes"));
let HealthController = class HealthController {
    constructor(log) {
        this.log = log;
    }
    checkHealth(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('inside health controller');
            const isHealthUp = yield typeorm_1.getRepository(CreditCard_1.CreditCard).findOne({});
            const heathstatus = { status: false };
            if (isHealthUp) {
                heathstatus.status = true;
            }
            if (!heathstatus.status) {
                return response.status(HTTP_STATUS.FAILED_DEPENDENCY).send(heathstatus);
            }
            return response.status(HTTP_STATUS.OK).send(heathstatus);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get(),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], HealthController.prototype, "checkHealth", null);
HealthController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/health'),
    tslib_1.__param(0, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [Object])
], HealthController);
exports.HealthController = HealthController;
//# sourceMappingURL=HealthController.js.map