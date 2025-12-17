import { error } from "../utils/response.js";

export const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return next(error("Forbidden", 403));
        }
        next();
    };
};
