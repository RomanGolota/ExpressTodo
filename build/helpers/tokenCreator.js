import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default class TokenCreator {
    constructor() {
        this.checkPassword = (password, userPassword) => {
            return bcrypt.compareSync(password, userPassword);
        };
        this.getToken = (userId) => {
            return jsonwebtoken.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
        };
        this.hashPassword = async (password, salt) => {
            return await bcrypt.hash(password, salt);
        };
    }
}
//# sourceMappingURL=tokenCreator.js.map