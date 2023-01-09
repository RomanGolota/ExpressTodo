import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }
        const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY);
        req.user = decoded.id;
        next();
    }
    catch (e) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.middleware.js.map