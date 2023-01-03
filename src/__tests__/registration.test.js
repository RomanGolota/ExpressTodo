import registerAuthController from "../controller/registerAuthController.js"
import registerAuthService from "../service/registerAuthService.js"
import {beforeEach} from "@jest/globals";

jest.mock('../service/registerAuthService');

describe('registration', () => {
    beforeEach(() => {
        registerAuthService.createUser.mockReset();
    })

    describe('These tests must pass successfully', () => {
        describe('It should receive valid data and response 200 code', () => {
            it('should return valid data and 200 status code', async () => {
                const req = {
                    body: {
                        email: 'valid@email.com',
                        password: 'password'
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };

                await registerAuthController.register(req, res);

                expect(res.status).toHaveBeenCalledWith(200);
            })

            it('should create a new user and return a success message', async () => {
                registerAuthService.findUser.mockResolvedValue(null);
                registerAuthService.createUser.mockResolvedValue();

                const req = {
                    body: {
                        email: 'user@example.com',
                        password: 'password'
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };

                await registerAuthController.register(req, res);

                expect(res.status).toHaveBeenCalledWith(200);
                expect(registerAuthService.findUser).toHaveBeenCalledWith('user@example.com');
                expect(registerAuthService.createUser).toHaveBeenCalledWith('user@example.com', expect.any(String));
                expect(res.json).toHaveBeenCalledWith({
                    message: 'User user@example.com was created'
                });
            });
        })
    })

    describe('These tests must be failed', () => {
        describe('It should return 400, because data is not valid', () => {
            it('should return a 400 error if the email is not in the correct format', async () => {
                const req = {
                    body: {
                        email: 'invalid_email.com',
                        password: 'password'
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };

                await registerAuthController.register(req, res);

                expect(res.status).toHaveBeenCalledWith(400);
            });

            it('should return a 400 error if the password is not long enough', async () => {
                const req = {
                    body: {
                        email: 'user@example.com',
                        password: '123'
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };

                await registerAuthController.register(req, res);

                expect(res.status).toHaveBeenCalledWith(400);
            });

            it('should return a 400 error if the email is already in use', async () => {
                registerAuthService.findUser.mockResolvedValue({});

                const req = {
                    body: {
                        email: 'user@example.com',
                        password: 'password'
                    }
                };
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn()
                };

                await registerAuthController.register(req, res);

                expect(res.status).toHaveBeenCalledWith(400);
                expect(res.json).toHaveBeenCalledWith({
                    message: 'User with this email already exists'
                });
            });
        })
    })
})