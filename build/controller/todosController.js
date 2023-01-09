import Todo from "../model/Todo.js";
class TodosController {
    constructor(todosService) {
        this.getTodos = async (req, res) => {
            try {
                const todos = await this.todosService.getTodos(req.user.id);
                res.send(todos);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        };
        this.createTodo = async (req, res) => {
            try {
                const todo = new Todo({
                    text: req.body.text,
                    user: req.user.id
                });
                if (!todo.text) {
                    res.status(400).send({ error: 'Text is required' });
                }
                else {
                    await this.todosService.createNewTodo(todo);
                    res.status(201).send(todo);
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        };
        this.findById = async (req, res) => {
            try {
                console.log(this.todosService);
                const id = req.params.id;
                const todo = await this.todosService.getTodoById(id);
                return res.status(200).json(todo);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.updateTodo = async (req, res) => {
            try {
                const id = req.params.id;
                const updatedTodo = req.body;
                const result = await this.todosService.updateTodo(id, updatedTodo);
                if (result) {
                    return res.status(200).json({ message: 'Todo updated successfully' });
                }
                else {
                    return res.status(404).json({ message: 'Todo not found' });
                }
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        };
        this.deleteTodo = async (req, res) => {
            try {
                const id = req.params.id;
                await this.todosService.deleteTodo(id);
                return res.status(200).json({ message: 'Todo delete' });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: error.message });
            }
        };
        this.todosService = todosService;
    }
}
export default TodosController;
//# sourceMappingURL=todosController.js.map