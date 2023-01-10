import TodosController from '../../src/controller/todosController.ts';

describe('TodosController', () => {
    let todosController;
    let todosService;

    beforeEach(() => {
        todosService = {
            getTodoById: jest.fn(),
        };
        todosController = new TodosController(todosService);
    });

    describe('findById', () => {
        it('should return the todo with the given id', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn(() => res), json: jest.fn() };
            todosService.getTodoById.mockResolvedValue({ text: 'Learn Jest' });

            await todosController.findById(req, res);

            expect(todosService.getTodoById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ text: 'Learn Jest' });
        });

        it('should return a 500 error if there is a problem retrieving the todo', async () => {
            const req = { params: { id: '123' } };
            const res = { status: jest.fn(() => res), json: jest.fn() };
            todosService.getTodoById.mockRejectedValue(new Error('Error getting todo'));

            await todosController.findById(req, res);

            expect(todosService.getTodoById).toHaveBeenCalledWith('123');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error getting todo' });
        });
    });
});