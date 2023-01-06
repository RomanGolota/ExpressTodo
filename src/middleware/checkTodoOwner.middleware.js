import todosService from "../service/todosService.js";

const checkTodoOwnerMiddleware = async (req, res, next) => {
    try {
        const id = req.params.id;
        const todo = await todosService.getTodoById(id);

        if (todo.user.equals(req.user.id)) {
            console.log(todo.user)
            console.log(req.user.id)
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