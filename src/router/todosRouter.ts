import authMiddleware from "../middleware/auth.middleware.js";
import {Router} from "express";
import TodosController from "../controller/todosController.js";
import TodosService from "../service/todosService.js";
import checkTodoOwnerMiddleware from "../middleware/checkTodoOwner.middleware.js";

const router = Router();
const todosService = new TodosService()
const todosControllerInstance = new TodosController(todosService)

router.get('/', authMiddleware, todosControllerInstance.getTodos);
router.get('/:id', authMiddleware, checkTodoOwnerMiddleware, todosControllerInstance.findById);
router.post('/', authMiddleware, todosControllerInstance.createTodo);
router.put('/:id', authMiddleware, checkTodoOwnerMiddleware, todosControllerInstance.updateTodo);
router.delete('/:id', authMiddleware, checkTodoOwnerMiddleware, todosControllerInstance.deleteTodo);

export default router;