import TodosController from '../../src/controller/todosController.js';

describe('TodosController', () => {
    let todosController;
    let todosService;

    beforeEach(() => {
        todosService = {
            updateTodo: jest.fn(),
        };
        todosController = new TodosController(todosService);
    });

    describe('updateTodo', () => {
        it('should update the todo with the given id', async () => {
            const req = {params: {id: '123'}, body: {text: 'Learn NestJS'}};
            const res = {status: jest.fn(() => res), json: jest.fn()};
            todosService.updateTodo.mockResolvedValue(true);

            await todosController.updateTodo(req, res);

            expect(todosService.updateTodo).toHaveBeenCalledWith('123', {text: 'Learn NestJS'});
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({message: 'Todo updated successfully'});
        });

        it('should return a 404 error if the todo is not found', async () => {
            const req = {params: {id: '123'}, body: {text: 'Learn Jest'}};
            const res = {status: jest.fn(() => res), json: jest.fn()};
            todosService.updateTodo.mockResolvedValue(false);

            await todosController.updateTodo(req, res);

            expect(todosService.updateTodo).toHaveBeenCalledWith('123', {text: 'Learn Jest'});
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({message: 'Todo not found'});
        });
    });
});

