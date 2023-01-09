import TodosService from "../service/todosService.js";

const checkTodoOwnerMiddleware = async (req, res, next, todosService = new TodosService()) => {
    try {
        const id = req.params.id;
        const todo = await todosService.getTodoById(id);
        const reqUserId = req.user.id

        if (todo.user.toString() === reqUserId) {
            return next();
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.log('checkTodoOwnerMiddleware error!')
        return res.status(500).json({ message: error.message });
    }
};

export default checkTodoOwnerMiddleware