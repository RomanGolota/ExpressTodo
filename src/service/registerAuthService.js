import User from "../model/User.js";

class registerAuthService {
    async findUser(email) {
        const user = await User.findOne({email});
        return user;
    }

    async createUser(email, password) {
        const user = new User({email, password});
        await user.save();
    }
}

export default registerAuthService;