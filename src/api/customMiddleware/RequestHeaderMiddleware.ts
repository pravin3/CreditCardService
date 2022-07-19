import * as express from 'express';
import { ExpressMiddlewareInterface, Middleware, HttpError } from 'routing-controllers';
import * as HTTP_STATUS from 'http-status-codes';

@Middleware({ type: 'before' })
export class RequestHeadermiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        const authtoken = req.header('Authorization');
        if (!authtoken) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST , 'The authorization has not been provided');
        } else if (authtoken.indexOf('Basic') < 0) {
            throw new HttpError(HTTP_STATUS.UNAUTHORIZED , 'Not Authorized');
        }
        const urc = req.header('Unique-Reference-Code');
        if (!urc) {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST , 'URC can not be empty!!');
        }
        next();
    }

}
