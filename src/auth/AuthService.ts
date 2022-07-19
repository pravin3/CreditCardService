import * as express from 'express';
import { Service } from 'typedi';
import { Logger, LoggerInterface } from '../decorators/Logger';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public parseBearerAuthFromRequest(req: express.Request): string | undefined {
        const authorization = req.header('authorization');
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            this.log.info('credentials provided by the client');
            return authorization.split(' ')[1];
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

}
