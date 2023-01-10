import TodosService from "../service/todosService.js";
import {Request, Response, NextFunction} from "express";

type MyRequest = Request & { user: any };

const checkTodoOwnerMiddleware = async (
    req: MyRequest,
    res: Response,
    next: NextFunction,
    todosService: TodosService = new TodosService()
) => {
    try {
        const id = req.params.id;
        const todo = await todosService.getTodoById(id);
        const reqUserId = req.user.id

        if (todo && todo.user.toString() === reqUserId) {
            return next();
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error: any) {
        console.log("checkTodoOwnerMiddleware error!");
        return res.status(500).json({ message: error.message });
    }
};

export default checkTodoOwnerMiddleware;