import * as nock from 'nock';
import request from 'supertest';
import { runSeed } from 'typeorm-seeding';
import { CreditCard } from '../../../src/api/models/CreditCard';
import { CreateBruce } from '../../../src/database/seeds/CreateBruce';
import { closeDatabase } from '../../utils/database';
import { BootstrapSettings } from '../utils/bootstrap';
import { prepareServer } from '../utils/server';

describe('/api/users', () => {

    let bruce: User;
    let bruceAuthorization: string;
    let settings: BootstrapSettings;

    // -------------------------------------------------------------------------
    // Setup up
    // -------------------------------------------------------------------------

    beforeAll(async () => {
        settings = await prepareServer({ migrate: true });
        bruce = await runSeed<CreditCard>(CreateBruce);
        bruceAuthorization = Buffer.from(`${bruce.username}:1234`).toString('base64');
    });

    // -------------------------------------------------------------------------
    // Tear down
    // -------------------------------------------------------------------------

    afterAll(async () => {
        nock.cleanAll();
        await closeDatabase(settings.connection);
    });

    // -------------------------------------------------------------------------
    // Test cases
    // -------------------------------------------------------------------------

    test('GET: / should return a list of users', async (done) => {
        const response = await request(settings.app)
            .get('/api/cards')
            .set('Authorization', `Basic ${bruceAuthorization}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.length).toBe(1);
        done();
    });


});
