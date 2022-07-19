"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeormLoader = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const logger_1 = require("../lib/logger");
const env_1 = require("../env");
const log = new logger_1.Logger(__filename);
exports.typeormLoader = (settings) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const loadedConnectionOptions = yield typeorm_1.getConnectionOptions();
    let connection;
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env_1.env.db.type,
        host: env_1.env.db.host,
        port: env_1.env.db.port,
        database: env_1.env.db.database,
        synchronize: env_1.env.db.synchronize,
        logging: env_1.env.db.logging,
        entities: env_1.env.app.dirs.entities,
        migrations: env_1.env.app.dirs.migrations,
    });
    try {
        connection = yield typeorm_1.createConnection(connectionOptions);
        log.info(`DB ${env_1.env.db.database} got connected`);
    }
    catch (err) {
        log.error('Database Error: ', err);
    }
    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
});
//# sourceMappingURL=typeormLoader.js.map