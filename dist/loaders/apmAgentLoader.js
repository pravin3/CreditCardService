"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_apm_node_1 = require("elastic-apm-node");
const env_1 = require("../env");
if (env_1.env.apm.active) {
    elastic_apm_node_1.start();
}
//# sourceMappingURL=apmAgentLoader.js.map