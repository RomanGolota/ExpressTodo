import {Router} from "express";
import RegisterAuthController from "../controller/registerAuthController.js";
import RegisterAuthService from "../service/registerAuthService.js";

const router = Router();
const registerAuthService = new RegisterAuthService()
const registerAuthController = new RegisterAuthController(registerAuthService)

router.post('/register', registerAuthController.register);
router.post('/login', registerAuthController.login);

export default router;