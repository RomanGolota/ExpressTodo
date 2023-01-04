import bcrypt from 'bcryptjs';
import Joi from '@hapi/joi';
import jsonwebtoken from 'jsonwebtoken';
import registerAuthService from '../service/registerAuthService.js';
import dotenv from "dotenv";
dotenv.config();

class registerAuthController {
    constructor(registerAuthService) {
        this.registerAuthService = registerAuthService;
    }

    register = async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(4).max(255).required()
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details });
            }

            const {email, password} = req.body;
            const candidate = await this.registerAuthService.findUser(email);
            if (candidate) {
                return res.status(400).json({message: 'User with this email already exists'});
            }
            const hashPassword = await bcrypt.hash(password, 7);
            await registerAuthService.createUser(email, hashPassword);
            return res.status(200).json({message: `User ${email} was created`});
        }
        catch (e) {
            console.log(e)
        }
    }

    login = async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await this.registerAuthService.findUser(email);

            if (!user) {
                return res.status(400).json({message: 'User with this email does not exist'});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Incorrect password'});
            }
            const token = jsonwebtoken.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});
            return res.status(200).json({token});
        } catch (e) {
            console.log(e)
        }
    }
}

export default registerAuthController;