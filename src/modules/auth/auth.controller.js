import User from "./auth.model.js";
import Otp from "./otp.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";
import { success, error } from "../../utils/response.js";
import { ROLES } from "../../constants/index.js";
import { generateOTP } from "../../utils/otp.js";
import { getOtpExpireTime } from "../../utils/otp.js";

export const register = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;

        if (!phone || !password) {
            return next(error("Phone and password are required", 400));
        }

        // بررسی کاربر موجود
        const exists = await User.findOne({ $or: [{ email }, { phone }] });
        if (exists) {
            return next(error("User already exists", 400));
        }

        // بررسی اینکه OTP غیرمتقضی‌شده در ۲ دقیقه آخر وجود دارد
        const existingOtp = await Otp.findOne({
            phone,
            verified: false,
            expiresAt: { $gt: new Date() },
        });

        if (existingOtp) {
            const timeRemaining = Math.ceil((existingOtp.expiresAt - new Date()) / 1000);
            return next(
                error(
                    `Please wait ${timeRemaining} seconds before requesting a new OTP`,
                    429
                )
            );
        }

        // تولید کد OTP
        const code = generateOTP();
        const expiresAt = getOtpExpireTime();

        // Hash کردن رمز برای ذخیره در OTP
        const hashedPassword = await hashPassword(password);

        // ذخیره OTP با اطلاعات موقتی رجیستر
        await Otp.create({
            phone,
            code,
            expiresAt,
            attempts: 0,
            verified: false,
            pendingData: {
                email: email || null,
                hashedPassword,
                role: ROLES.USER,
            },
        });

        return success(res, { phone, code }, "OTP sent successfully. Verify it to complete registration");
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;

        if ((!email && !phone) || !password) {
            return next(error("Credentials required", 400));
        }

        const user = await User.findOne(
            email ? { email } : { phone }
        );

        if (!user) {
            return next(error("Invalid credentials", 401));
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return next(error("Invalid credentials", 401));
        }

        const payload = { userId: user._id, role: user.role };

        return success(res, {
            accessToken: signAccessToken(payload),
            refreshToken: signRefreshToken(payload),
        }, "Login successful");
    } catch (err) {
        next(err);
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return next(error("Phone required", 400));
        }

        // بررسی وجود کاربر
        const user = await User.findOne({ phone });
        if (!user) {
            return next(error("User not found", 404));
        }

        // بررسی اینکه OTP غیرمتقضی‌شده در ۲ دقیقه آخر وجود دارد
        const existingOtp = await Otp.findOne({
            phone,
            verified: false,
            expiresAt: { $gt: new Date() },
        });

        if (existingOtp) {
            const timeRemaining = Math.ceil((existingOtp.expiresAt - new Date()) / 1000);
            return next(
                error(
                    `Please wait ${timeRemaining} seconds before requesting a new OTP`,
                    429
                )
            );
        }

        const code = generateOTP();
        const expiresAt = getOtpExpireTime();

        // ایجاد یا بروزرسانی OTP
        await Otp.findOneAndUpdate(
            { phone },
            {
                phone,
                code,
                expiresAt,
                attempts: 0,
                verified: false,
                used: false,
            },
            { upsert: true, new: true }
        );

        return success(res, { phone, code }, "OTP sent successfully");
    } catch (err) {
        next(err);
    }
};

export const verifyOtp = async (req, res, next) => {
    try {
        const { phone, code } = req.body;

        if (!phone || !code) {
            return next(error("Phone and OTP code are required", 400));
        }

        // بررسی OTP
        const otp = await Otp.findOne({
            phone,
            verified: false,
            expiresAt: { $gt: new Date() },
        });

        if (!otp) {
            return next(error("OTP not found or expired", 400));
        }

        // بررسی کد
        if (otp.code !== code) {
            otp.attempts += 1;

            // اگر 5 سعی ناموفق بود، حذف کن
            if (otp.attempts >= 5) {
                await Otp.deleteOne({ _id: otp._id });
                return next(
                    error("Too many wrong OTP attempts. Request a new OTP", 429)
                );
            }

            await otp.save();
            const remainingAttempts = 5 - otp.attempts;
            return next(
                error(
                    `Invalid OTP. ${remainingAttempts} attempts remaining`,
                    400
                )
            );
        }

        // بررسی کاربر موجود
        const exists = await User.findOne({ phone });
        if (exists) {
            return next(error("User already exists", 400));
        }

        // گرفتن اطلاعات موقتی از OTP
        const pendingData = otp.pendingData || {};
        
        // ایجاد کاربر جدید
        const user = await User.create({
            email: pendingData.email,
            phone,
            password: pendingData.hashedPassword,
            role: pendingData.role || ROLES.USER,
        });

        // حذف OTP بعد از استفاده موفق
        await Otp.deleteOne({ _id: otp._id });

        return success(
            res,
            { id: user._id },
            "Registered successfully",
            201
        );
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { phone, code, newPassword } = req.body;

        // بررسی اینپوت‌ها
        if (!phone || !code || !newPassword) {
            return next(error("Phone, OTP code, and new password are required", 400));
        }

        // بررسی کد OTP
        const otp = await Otp.findOne({ phone });
        if (!otp) {
            return next(error("OTP not found. Request a new one", 400));
        }

        // بررسی انقضای OTP
        if (new Date() > otp.expiresAt) {
            await Otp.deleteOne({ phone });
            return next(error("OTP expired. Request a new one", 400));
        }

        // بررسی صحت کد OTP
        if (otp.code !== code) {
            // افزایش تعداد تلاش نادرست
            otp.attempts += 1;

            // اگر بیش از 5 بار اشتباه شد
            if (otp.attempts >= 5) {
                await Otp.deleteOne({ phone });
                return next(error("Too many incorrect attempts. Request a new OTP", 429));
            }

            await otp.save();
            const remainingAttempts = 5 - otp.attempts;
            return next(
                error(`Invalid OTP. You have ${remainingAttempts} attempts left`, 400)
            );
        }

        // بررسی وجود کاربر
        const user = await User.findOne({ phone });
        if (!user) {
            return next(error("User not found", 404));
        }

        // بروزرسانی رمز عبور
        user.password = await hashPassword(newPassword);
        await user.save();

        // حذف OTP بعد از استفاده موفق
        await Otp.deleteOne({ phone });

        return success(res, null, "Password updated successfully");
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res) => {
    return success(res, null, "Logged out");
};
