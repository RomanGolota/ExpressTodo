import {Router} from "express";
import RegisterAuthController from "../controller/registerAuthController.js";
import RegisterAuthService from "../service/registerAuthService.js";
import TokenCreator from "../helpers/tokenCreator.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = Router();
const tokenCreator = new TokenCreator()
const registerAuthService = new RegisterAuthService()
const registerAuthController = new RegisterAuthController(registerAuthService, tokenCreator)

router.post('/register', validationMiddleware, registerAuthController.register);
router.post('/login', validationMiddleware, registerAuthController.login);

export default router;