"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricLoader = void 0;
const tslib_1 = require("tslib");
const env_1 = require("../env");
const Prometheus = tslib_1.__importStar(require("prom-client"));
exports.metricLoader = (settings) => {
    const expressApp = settings.getData('express_app');
    const httpRequestDurationMicroseconds = new Prometheus.Histogram({
        name: 'http_request_duration_ms',
        help: 'Duration of HTTP requests in ms',
        labelNames: ['method', 'route', 'code'],
        buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
    });
    expressApp.use(env_1.env.app.routePrefix + '/metrics', (req, res) => {
        res.set('Content-Type', Prometheus.register.contentType);
        res.end(Prometheus.register.metrics());
    });
    expressApp.use((req, res, next) => {
        const reqStartTime = new Date(req._startTime).valueOf();
        let responseTimeInMs = 0;
        if (res.statuscode) {
            responseTimeInMs = Date.now() - reqStartTime;
        }
        httpRequestDurationMicroseconds.labels(req.method, req && req.route ? req.route.path : undefined, res.statusCode)
            .observe(responseTimeInMs);
        next();
    });
};
//# sourceMappingURL=metricLoader.js.map