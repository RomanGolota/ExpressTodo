import TodosController from '../../src/controller/todosController.ts';

describe('TodosController', () => {
    let todosController;
    let todosService;

    beforeEach(() => {
        todosService = {
            getTodos: jest.fn(),
        };
        todosController = new TodosController(todosService);
    });

    describe('getTodos', () => {
        it('should return the todos for the given user', async () => {
            const req = { user: { id: 123 } };
            const res = { send: jest.fn() };
            todosService.getTodos.mockResolvedValue([]);

            await todosController.getTodos(req, res);

            expect(todosService.getTodos).toHaveBeenCalledWith(123);
            expect(res.send).toHaveBeenCalledWith([]);
        });

        it('should return a 500 error if there is a problem retrieving the todos', async () => {
            const req = { user: { id: 123 } };
            const res = { status: jest.fn(() => res), json: jest.fn() };
            todosService.getTodos.mockRejectedValue(new Error('Error getting todos'));

            await todosController.getTodos(req, res);

            expect(todosService.getTodos).toHaveBeenCalledWith(123);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error getting todos' });
        });
    });
});