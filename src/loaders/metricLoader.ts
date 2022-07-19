import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { env } from '../env';
import * as Prometheus from 'prom-client';
export const metricLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
        const expressApp = settings.getData('express_app');
        const httpRequestDurationMicroseconds = new Prometheus.Histogram({
          name: 'http_request_duration_ms',
          help: 'Duration of HTTP requests in ms',
          labelNames: ['method', 'route', 'code' ],
          buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
        });
        expressApp.use(env.app.routePrefix + '/metrics', (req, res) => {
            res.set('Content-Type', Prometheus.register.contentType);
            res.end(Prometheus.register.metrics());
        });
        expressApp.use((req, res , next) => {
        const reqStartTime = new Date(req._startTime).valueOf();
           let responseTimeInMs = 0;
           if (res.statuscode) {
               responseTimeInMs = Date.now() - reqStartTime;
           }
           httpRequestDurationMicroseconds.labels(req.method, req && req.route ? req.route.path :  undefined , res.statusCode)
           .observe(responseTimeInMs);
           next();
        });
};
