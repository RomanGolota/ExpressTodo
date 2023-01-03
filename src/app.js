import express from 'express';
import registerAuthRouter from './router/registerAuthRouter.js';
import todosRouter from './router/todosRouter.js';
import corsMiddleware from "./middleware/cors.middleware.js";

const application = () => {
    const app = express();

    app.use(corsMiddleware);
    app.use(express.json());
    app.use('/api/auth', registerAuthRouter);
    app.use('/api/todos', todosRouter);

    return app
}

export default application