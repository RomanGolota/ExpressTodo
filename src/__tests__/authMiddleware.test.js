import authMiddleware from "../middleware/auth.middleware.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

describe('authMiddleware', () => {
    it('authMiddleware should return a 401 status code if no token is provided', () => {
        const req = {
            method: 'GET',
            headers: {
                authorization: ''
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        authMiddleware(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Auth error' });
    });

    it('authMiddleware should return a 401 status code if the token is invalid', () => {
        const req = {
            method: 'GET',
            headers: {
                authorization: 'Bearer invalid_token'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        authMiddleware(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Auth error' });
    });

    it('authMiddleware should add the user to the request object and call next if the token is valid', () => {
        const userId = 123;
        const token = jsonwebtoken.sign({ id: userId }, process.env.SECRET_KEY);
        const req = {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const res = {};
        const next = jest.fn();
        authMiddleware(req, res, next);

        expect(req.user).toEqual({ id: userId });
        expect(next).toHaveBeenCalled();
    });

    it('authMiddleware should call next if the request method is OPTIONS', () => {
        const req = {
            method: 'OPTIONS',
            headers: {
                authorization: ''
            }
        };
        const res = {};
        const next = jest.fn();
        authMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });
})
