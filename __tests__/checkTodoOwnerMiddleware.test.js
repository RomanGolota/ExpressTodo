import checkTodoOwnerMiddleware from "../src/middleware/checkTodoOwner.middleware.js";
import {beforeEach, jest} from "@jest/globals";

describe('checkTodoOwnerMiddleware', () => {
    let todosService;

    beforeEach(() => {
        todosService = {
            getTodoById: jest.fn()
        }
    })

    it('should call next if the user is the owner of the todo', async () => {
        const req = { params: { id: '123' }, user: { id: '123' } };
        const res = { status: jest.fn(() => res), json: jest.fn() };
        const next = jest.fn();
        todosService.getTodoById.mockResolvedValue({ user: '123' });

        await checkTodoOwnerMiddleware(req, res, next, todosService);

        expect(todosService.getTodoById).toHaveBeenCalledWith('123');
        expect(next).toHaveBeenCalled();
    });

    it('should return a 401 error if the user is not the owner of the todo', async () => {
        const req = { params: { id: '123' }, user: { id: '456' } };
        const res = { status: jest.fn(() => res), json: jest.fn() };
        todosService.getTodoById.mockResolvedValue({ user: '123' });

        await checkTodoOwnerMiddleware(req, res, jest.fn(), todosService);

        expect(todosService.getTodoById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
    });

    it('should return a 500 error if there is an issue getting the todo', async () => {
        const req = { params: { id: '123' } };
        const res = { status: jest.fn(() => res), json: jest.fn() };
        todosService.getTodoById.mockRejectedValue(new Error('Error getting todo'));

        await checkTodoOwnerMiddleware(req, res, jest.fn(), todosService);

        expect(todosService.getTodoById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Error getting todo' });
    });
});