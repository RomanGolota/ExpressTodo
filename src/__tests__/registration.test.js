import RegisterAuthController from "../controller/registerAuthController.js";
import {beforeEach} from "@jest/globals";

describe('registerAuthController', () => {
    let registerAuthController;
    let registerAuthService;
    let tokenCreator
    let req;
    let res;

    beforeEach(() => {
        registerAuthService = {
            findUser: jest.fn(),
            createUser: jest.fn(),
        };
        tokenCreator = {
            checkPassword: jest.fn(),
            getToken: jest.fn(),
            hashPassword: jest.fn()
        }
        registerAuthController = new RegisterAuthController(registerAuthService, tokenCreator);
        req = {
            body: {
                email: 'test@example.com',
                password: 'password',
            },
        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res),
        };
    });

    describe('register', () => {
        it('should return a 400 error if the user already exists', async () => {
            registerAuthService.findUser.mockResolvedValue(true);
            await registerAuthController.register(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'User with this email already exists' });
        });

        it('should create the user and return a 200 response', async () => {
            registerAuthService.findUser.mockResolvedValue(false);
            tokenCreator.hashPassword.mockResolvedValue('hashed password')
            await registerAuthController.register(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User test@example.com was created' });
        });

        it('should return a 500 error if an exception is thrown', async () => {
            registerAuthService.findUser.mockRejectedValue(new Error('Test error'));
            await registerAuthController.register(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });
});