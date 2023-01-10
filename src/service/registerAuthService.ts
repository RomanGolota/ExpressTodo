import User from "../model/User.js";

export default class registerAuthService {
    async findUser(email: string) {
        const user = await User.findOne({email});
        return user;
    }

    async createUser(email: string, password: string) {
        const user = new User({email, password});
        await user.save();
    }
}
