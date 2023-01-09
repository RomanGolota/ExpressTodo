import TodosController from '../../src/controller/todosController.js';

describe('TodosController', () => {
    let todosController;
    let todosService;

    beforeEach(() => {
        todosService = {
            createNewTodo: jest.fn(),
        };
        todosController = new TodosController(todosService);
    });

    describe('createTodo', () => {
        it('should create a new todo with the given text and user', async () => {
            const req = { user: { id: 123 }, body: { text: 'Learn Jest' } };
            const res = { send: jest.fn(), status: jest.fn(() => res) };
            todosService.createNewTodo.mockResolvedValue(null);

            await todosController.createTodo(req, res);

            expect(todosService.createNewTodo).toHaveBeenCalledWith(
                expect.objectContaining({ text: 'Learn Jest'}),
            );
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({ text: 'Learn Jest'}),
            );
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should return a 400 error if text is not provided', async () => {
            const req = { user: { id: 123 }, body: {} };
            const res = { status: jest.fn(() => res), send: jest.fn() };

            await todosController.createTodo(req, res);

            expect(todosService.createNewTodo).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Text is required' });
        });

        it('should return a 500 error if there is a problem creating the todo', async () => {
            const req = { user: { id: 123 }, body: { text: 'Learn Jest' } };
            const res = { status: jest.fn(() => res), json: jest.fn() };
            todosService.createNewTodo.mockRejectedValue(new Error('Error creating todo'));

            await todosController.createTodo(req, res);

            expect(todosService.createNewTodo).toHaveBeenCalledWith(
                expect.objectContaining({ text: 'Learn Jest'}),
            );
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error creating todo' });
        });
    });
});