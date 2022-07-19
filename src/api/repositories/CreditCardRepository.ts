import { EntityRepository, Repository } from 'typeorm';

import { CreditCard } from '../models/CreditCard';

@EntityRepository(CreditCard)
export class CreditCardRepository extends Repository<CreditCard>  {

}
