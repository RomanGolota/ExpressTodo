import RegisterAuthController from "../controller/registerAuthController.js";
import {beforeEach} from "@jest/globals";

describe('registerAuthController', () => {
    let req
    let res
    let registerAuthService
    let registerAuthController
    let tokenCreator

    beforeEach(() => {
        req = {
            body: {
                email: 'test@email.com',
                password: 'password'
            }
        }
        res = {
            status: jest.fn(() => res),
            json: jest.fn(() => res)
        }
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
    })

    describe('login', () =>{
        it('should return a 400 error if the request body is invalid', async () => {
            req.body.email = 'invalid';
            await registerAuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBe;
        })

        it('should return a 400 error if password is short', async () => {
            req.body.password = 'pas';
            await registerAuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "User with this email does not exist" });
        })

        it('should return a 400 error if user not found', async () => {
            req.body.user = 'notExistingUser@email.com';
            registerAuthService.findUser.mockResolvedValue(false);
            await registerAuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'User with this email does not exist' });
        });

        it('should return a 200 status code and token if user found', async () => {
            registerAuthService.findUser.mockResolvedValue({});
            tokenCreator.checkPassword.mockResolvedValue(true)
            tokenCreator.getToken.mockResolvedValue({token: 'token'})

            await registerAuthController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: expect.anything() });
        });
    })
})