// In-memory rate limiting store
const rateLimitStore = new Map();

const OTP_RATE_LIMIT = {
    maxAttempts: 3, // حداکثر 3 بار درخواست
    windowMs: 5 * 60 * 1000, // در 5 دقیقه
};

export const otpRateLimit = (req, res, next) => {
    const { phone } = req.body;

    if (!phone) {
        return next();
    }

    const key = `otp:${phone}`;
    const now = Date.now();
    const userData = rateLimitStore.get(key);

    // تمیز کردن درخواست‌های قدیمی
    if (userData && now - userData.firstRequest > OTP_RATE_LIMIT.windowMs) {
        rateLimitStore.delete(key);
        return next();
    }

    // اگر اول بار است
    if (!userData) {
        rateLimitStore.set(key, {
            attempts: 1,
            firstRequest: now,
            lastRequest: now,
        });
        return next();
    }

    // اگر تعداد تلاش بیشتر از حد است
    if (userData.attempts >= OTP_RATE_LIMIT.maxAttempts) {
        const remainingTime = Math.ceil(
            (OTP_RATE_LIMIT.windowMs - (now - userData.firstRequest)) / 1000
        );
        const error = new Error(
            `Too many OTP requests. Try again after ${remainingTime} seconds`
        );
        error.status = 429;
        return next(error);
    }

    // افزایش تعداد تلاش‌ها
    userData.attempts += 1;
    userData.lastRequest = now;
    rateLimitStore.set(key, userData);

    // اگر نزدیک به محدودیت است، هشدار بده
    const remainingAttempts = OTP_RATE_LIMIT.maxAttempts - userData.attempts;
    if (remainingAttempts <= 1) {
        res.locals.warning = `You have ${remainingAttempts} OTP request(s) left`;
    }

    next();
};

// تمیز کنندہ خودکار (هر ۱۰ دقیقه)
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of rateLimitStore.entries()) {
        if (now - data.firstRequest > OTP_RATE_LIMIT.windowMs) {
            rateLimitStore.delete(key);
        }
    }
}, 10 * 60 * 1000);
