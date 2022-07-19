import * as express from 'express';
import { ExpressMiddlewareInterface, Middleware, HttpError } from 'routing-controllers';
import * as HTTP_STATUS from 'http-status-codes';
import * as crypto from 'crypto';
import {env} from '../../env';
@Middleware({ type: 'before' })
export class RequestHashingMiddleware implements ExpressMiddlewareInterface {

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        if (env.app.constants.isHashingRequired && env.app.constants.hashingNotReqMethods.indexOf(req.method) === -1) {
           const xSignature = (req.header('X-Signature') || '').trim();
           if (xSignature) {
               let hash = '';
               const getCryptoHash = env.app.constants.getCryptoHash;
               hash = crypto.createHmac('sha256', getCryptoHash).update(JSON.stringify(req.body)).digest('hex');
               if (hash!== xSignature) {
                   throw new HttpError(HTTP_STATUS.BAD_REQUEST , 'Invalid X- signature');
               }
           } else {
            throw new HttpError(HTTP_STATUS.BAD_REQUEST , 'X-signature can not be empty');
           }   
        }

        next();
    }

}
