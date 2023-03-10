import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';

import RegisterAuthService from '../service/registerAuthService.js';
import TokenCreator from '../helpers/tokenCreator.js';

export default class RegisterAuthController {
    private readonly registerAuthService: RegisterAuthService;
    private readonly tokenCreator: TokenCreator;

    constructor(registerAuthService: RegisterAuthService, tokenCreator: TokenCreator) {
        this.registerAuthService = registerAuthService;
        this.tokenCreator = tokenCreator;
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const candidate = await this.registerAuthService.findUser(email);
            if (candidate) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }
            const hashPassword = await this.tokenCreator.hashPassword(password, 7);
            await this.registerAuthService.createUser(email, hashPassword);
            return res.status(200).json({ message: `User ${email} was created` });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const user = await this.registerAuthService.findUser(email);

            if (!user) {
                return res.status(400).json({ message: 'User with this email does not exist' });
            }
            const validPassword = this.tokenCreator.checkPassword(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Incorrect password' });
            }
            const token = this.tokenCreator.getToken({ id: user.id });
            return res.status(200).json({ token });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
}
