import { OTP_EXPIRE_TIME } from "../constants/index.js";

export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOtpExpireTime = () => {
    return new Date(Date.now() + OTP_EXPIRE_TIME);
};
