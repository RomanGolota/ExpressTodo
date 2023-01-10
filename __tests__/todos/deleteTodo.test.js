import TodosController from '../../src/controller/todosController.ts';

describe('TodosController', () => {
    let todosController;
    let todosService;

    beforeEach(() => {
        todosService = {
            deleteTodo: jest.fn(),
        };
        todosController = new TodosController(todosService);
    });

    describe('deleteTodo', () => {
        it('should delete the todo with the given id', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn(() => res), json: jest.fn() };
            todosService.deleteTodo.mockResolvedValue(null);

            await todosController.deleteTodo(req, res);

            expect(todosService.deleteTodo).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Todo delete' });
        });

        it('should return a 500 error if there is an issue deleting the todo', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn(() => res), json: jest.fn() };
            todosService.deleteTodo.mockRejectedValue(new Error('Error deleting todo'));

            await todosController.deleteTodo(req, res);

            expect(todosService.deleteTodo).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting todo' });
        });
    });
});