import authMiddleware from "../middleware/auth.middleware.js";
import {Router} from "express";
import todosController from "../controller/todosController.js";
import checkTodoOwnerMiddleware from "../middleware/checkTodoOwner.middleware.js";

const router = Router();

router.get('/', authMiddleware, todosController.getTodos);
router.get('/:id', authMiddleware, checkTodoOwnerMiddleware, todosController.findById);
router.post('/', authMiddleware, todosController.createTodo);
router.put('/:id', authMiddleware, checkTodoOwnerMiddleware, todosController.updateTodo);
router.delete('/:id', authMiddleware, checkTodoOwnerMiddleware, todosController.deleteTodo);

export default router;