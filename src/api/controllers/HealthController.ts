import {
     Get,JsonController, Res
} from 'routing-controllers';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { getRepository } from 'typeorm'; 
import { CreditCard } from '../models/CreditCard'
import * as express from 'express';
import * as HTTP_STATUS from 'http-status-codes';   
@JsonController('/health')
export class HealthController {
  constructor(
      @Logger(__filename) private log: LoggerInterface

  ) { }

  @Get()
  public async checkHealth(@Res()response: express.Response): Promise<any> {
      this.log.info('inside health controller');
      const isHealthUp = await getRepository(CreditCard).findOne({});
      const heathstatus = {status: false};
      if (isHealthUp) {
          heathstatus.status = true;
      }

      if (!heathstatus.status) {
          return response.status(HTTP_STATUS.FAILED_DEPENDENCY).send(heathstatus);
      } 

      return response.status(HTTP_STATUS.OK).send(heathstatus);
  }

}
