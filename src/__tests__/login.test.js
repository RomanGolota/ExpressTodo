import bcrypt from "bcryptjs";
import registerAuthService from "../service/registerAuthService.js";
import registerAuthController from "../controller/registerAuthController.js";

describe('login', () => {
    describe('These tests must pass successfully', () => {
        it('returns a token when called with correct login credentials', async () => {
            // Create a mock request object
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'password',
                },
            };

            // Create a mock response object
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock the findUser function to return a user object
            registerAuthService.findUser = jest.fn().mockResolvedValue({
                id: 1,
                email: 'test@example.com',
                password: bcrypt.hashSync('password', 10),
            });

            // Call the login function with the mock request and response objects
            await registerAuthController.login(req, res);

            // Assert that the function returned a token in the response
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                token: expect.any(String),
            });
        });
    })

    describe('These tests must be failed', () => {
        it('returns an error message when called with incorrect login credentials', async () => {
            // Create a mock request object with incorrect login credentials
            const req = {
                body: {
                    email: 'test@example.com',
                    password: 'incorrect',
                },
            };

            // Create a mock response object
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock the findUser function to return a user object
            registerAuthService.findUser = jest.fn().mockResolvedValue({
                id: 1,
                email: 'test@example.com',
                password: bcrypt.hashSync('password', 10),
            });

            // Call the login function with the mock request and response objects
            await registerAuthController.login(req, res);

            // Assert that the function returned an error message in the response
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Incorrect password',
            });
        });

        it('returns an error message when called with a non-existent user', async () => {
            // Create a mock request object with a non-existent email
            const req = {
                body: {
                    email: 'non-existent@example.com',
                    password: 'password',
                },
            };

            // Create a mock response object
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock the findUser function to return null
            registerAuthService.findUser = jest.fn().mockResolvedValue(null);

            // Call the login function with the mock request and response objects
            await registerAuthController.login(req, res);

            // Assert that the function returned an error message in the response
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User with this email does not exist',
            });
        });
    })
});