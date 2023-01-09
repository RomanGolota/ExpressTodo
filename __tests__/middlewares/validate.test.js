import validationMiddleware from "../../src/middleware/validationMiddleware.js";

describe('validate', () => {
    it('should call next if the request body is valid', async () => {
        const req = { body: { email: 'test@example.com', password: '1234' } };
        const res = { status: jest.fn(() => res), json: jest.fn() };
        const next = jest.fn();

        await validationMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should return a 400 error if password is invalid', async () => {
        const req = { body: { email: 'test@example.com', password: '123' } };
        const res = { status: jest.fn(() => res), json: jest.fn() };
        const next = jest.fn();

        await validationMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.any(Array) });
    });

    it('should return a 400 error if email is invalid', async () => {
        const req = { body: { email: 'invalidemail', password: '1234' } };
        const res = { status: jest.fn(() => res), json: jest.fn() };
        const next = jest.fn();

        await validationMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: expect.any(Array) });
    });
});