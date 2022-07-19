import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createConnection, getConnectionOptions } from 'typeorm';
import {Logger} from '../lib/logger';
import { env } from '../env';

const log = new Logger(__filename);

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    const loadedConnectionOptions = await getConnectionOptions();
    let connection;
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        host: env.db.host,
        port: env.db.port,
        database: env.db.database,
        synchronize: env.db.synchronize,
        logging: env.db.logging,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
    });
    try {
     connection = await createConnection(connectionOptions);
    log.info(`DB ${env.db.database} got connected`);
    } catch (err) {
        log.error('Database Error: ', err);
    }

    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
