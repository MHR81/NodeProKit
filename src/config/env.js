import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    appUrl: process.env.APP_URL || "http://localhost:5000/",
    
    mongoUri: process.env.MONGO_URI,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    jwtAccessExpire: process.env.JWT_ACCESS_EXPIRE,
    jwtRefreshExpire: process.env.JWT_REFRESH_EXPIRE,
};
