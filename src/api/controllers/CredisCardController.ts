import {
      Body, Get, JsonController, Post, Res, HttpCode, UseBefore, HeaderParam, QueryParam
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreditCard } from '../models/CreditCard';
import { CreditCardService } from '../services/CreditCardService';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { validate } from 'class-validator';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { RequestHeadermiddleware } from '../customMiddleware/RequestHeaderMiddleware';
import { RequestHashingMiddleware } from '../customMiddleware/RequestHashingMiddleware';
import { now } from 'moment';
import { env } from '../../env';
@UseBefore(bodyParser.urlencoded(),RequestHeadermiddleware,bodyParser.json())
@JsonController('/cards')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class CredtCardController {
    constructor(
        private creditCardService: CreditCardService,
        @Logger(__filename) private log: LoggerInterface

    ) { }

    @Get()
    public async getCardList(@HeaderParam('Authorization') authorization: string,
                             @HeaderParam('Unique-Reference-Code') urc: string,
                             @QueryParam('limit') limit: number,
                             @QueryParam('offset') offset: number
                             ): Promise<CreditCard[]> {
        if (!limit) {
           limit = env.app.constants.noofRecordCount;
        }
        if (!offset) {
            offset = env.app.constants.startIndex;
         }
        this.log.info(`Inside getCardList urc: ${urc} :: limit: ${limit} :: offset ${offset}`);
        const cardList =  await this.creditCardService.find(limit, offset);
        return cardList;
    }
    @UseBefore(RequestHashingMiddleware)
    @Post()
    @HttpCode(201)
    public async addCreditCardDetails(@Body({ validate : true }) body: CreditCard ,
                                      @HeaderParam('Authorization') authorization: string,
                                      @HeaderParam('Unique-Reference-Code') urc: string,
                                      @HeaderParam('X-Signature') xsignature: string,
                                      @Res() response: express.Response): Promise<string | void | express.Response> {
        this.log.info(`urc: ${urc} :: name: ${body.name} :: timestamp ${now()}`);
        const errors = await validate(body, { validationError: { target: false }});
         if (errors .length > 0) {
             throw { httpCode: 400 , errors};
         }
        return await this.creditCardService.create(body);
    }

}
