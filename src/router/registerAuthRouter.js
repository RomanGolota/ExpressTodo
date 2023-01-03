import {Router} from "express";
import registerAuthController from "../controller/registerAuthController.js";

const router = Router();

router.post('/register', registerAuthController.register);
router.post('/login', registerAuthController.login);

export default router;