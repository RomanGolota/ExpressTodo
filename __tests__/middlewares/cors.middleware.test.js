import corsMiddleware from "../../src/middleware/cors.middleware.ts";

describe('cors middleware', () => {
    it('should set the correct headers', async () => {
        const req = {}
        const res = {
            header: jest.fn((header, value) => res)
        }
        const next = jest.fn()

        await corsMiddleware(req, res, next)

        expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
        expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE')
        expect(res.header).toHaveBeenCalledWith('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        expect(next).toHaveBeenCalled()
    })
})