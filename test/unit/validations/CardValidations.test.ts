import { validate } from 'class-validator';
import { CreditCard } from '../../../src/api/models/CreditCard';

describe('CardValidations', () => {

    test('Card should always have a name', async (done) => {
        const cardObj = new CreditCard();
        const errorsOne = await validate(cardObj);
        cardObj.name = 'TestName';
        const errorsTwo = await validate(cardObj);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Cards should always have a card number', async (done) => {
        const cardObj = new CreditCard();
        const errorsOne = await validate(cardObj);
        cardObj.cardnumber = 1234567491;
        const errorsTwo = await validate(cardObj);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Card should always have a limit', async (done) => {
        const cardObj = new CreditCard();
        const errorsOne = await validate(cardObj);
        cardObj.limit = 100;
        const errorsTwo = await validate(cardObj);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Card validation should succeed with all required fields', async (done) => {
        const cardObj = new CreditCard();
        cardObj.cardnumber = 1234567491;
        cardObj.limit = 100;
        cardObj.name = 'test'
        const errors = await validate(cardObj);
        expect(errors.length).toEqual(0);
        done();
    });

});
