"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocLoader = void 0;
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
exports.iocLoader = (settings) => {
    /**
     * Setup routing-controllers to use typedi container.
     */
    routing_controllers_1.useContainer(typedi_1.Container);
    typeorm_1.useContainer(typedi_1.Container);
    class_validator_1.useContainer(typedi_1.Container);
    type_graphql_1.useContainer(typedi_1.Container);
};
//# sourceMappingURL=iocLoader.js.map