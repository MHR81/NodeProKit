import { verifyAccessToken } from "../utils/jwt.js";
import { error } from "../utils/response.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(error("Unauthorized", 401));
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyAccessToken(token);

        req.user = decoded;
        next();
    } catch (err) {
        next(error("Invalid or expired token", 401));
    }
};
