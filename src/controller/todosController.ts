import { Request, Response } from 'express';
import Todo from "../model/Todo.js";
import TodosService from "../service/todosService.js";

declare global {
    namespace Express {
        interface Request {
            user: any;
        }
    }
}

class TodosController {
    private readonly todosService: TodosService;

    constructor(todosService: TodosService) {
        this.todosService = todosService;
    }

    getTodos = async (req: Request, res: Response): Promise<Response> => {
        try {
            const todos = await this.todosService.getTodos(req.user.id);
            return res.send(todos);
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    };

    createTodo = async (req: Request, res: Response): Promise<Response> => {
        try {
            const todo = new Todo({
                text: req.body.text,
                user: req.user.id,
            });

            if (!todo.text) {
                return res.status(400).send({ error: 'Text is required' });
            } else {
                await this.todosService.createNewTodo(todo);
                return res.status(201).send(todo);
            }
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error })
        }
    }

    findById = async (req: Request, res: Response): Promise<Response> => {
        try {
            console.log(this.todosService);
            const id = req.params.id;
            const todo = await this.todosService.getTodoById(id);
            return res.status(200).json(todo);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    updateTodo = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = req.params.id;
            const updatedTodo = req.body;
            const result = await this.todosService.updateTodo(id, updatedTodo);
            if (result) {
                return res.status(200).json({ message: 'Todo updated successfully' });
            } else {
                return res.status(404).json({ message: 'Todo not found' });
            }
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    };

    deleteTodo = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = req.params.id;

            await this.todosService.deleteTodo(id);
            return res.status(200).json({ message: 'Todo delete' });
        } catch (error: any) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    };
}

export default TodosController;