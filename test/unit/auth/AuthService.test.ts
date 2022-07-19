import { Request } from 'express';
import MockExpressRequest from 'mock-express-request';

import { AuthService } from '../../../src/auth/AuthService';
import { LogMock } from '../lib/LogMock';
describe('AuthService', () => {

    let authService: AuthService;
    let log: LogMock;
    beforeEach(() => {
        log = new LogMock();
        authService = new AuthService(log);
    });

    describe('parseTokenFromRequest', () => {
        test('Should return the credentials of the basic authorization header', () => {
            const req: Request = new MockExpressRequest({
                headers: {
                    Authorization: `Bearer 1234`,
                },
            });
            const token =  authService.parseBearerAuthFromRequest(req);
            expect(token).toEqual('1234')

        });

        test('Should return undefined if there is no basic authorization header', () => {
            const req: Request = new MockExpressRequest({
                headers: {},
            });
            const token = authService.parseBearerAuthFromRequest(req);
            expect(token).toBeUndefined();
            expect(log.infoMock).toBeCalledWith('No credentials provided by the client', []);
        });

        test('Should return undefined if there is a invalid basic authorization header', () => {
            const req: Request = new MockExpressRequest({
                headers: {
                    Authorization: 'Bearer 1234',
                },
            });
            const token = authService.parseBearerAuthFromRequest(req);
            expect(token).toEqual('1234');
            expect(log.infoMock).toBeCalledWith('credentials provided by the client', []);
        });

    });

});
