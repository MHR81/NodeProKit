import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            index: true, // برای حذف خودکار
        },
        verified: {
            type: Boolean,
            default: false,
        },
        used: {
            type: Boolean,
            default: false,
        },
        attempts: {
            type: Number,
            default: 0, // تعداد سعی برای تأیید
        },
        pendingData: {
            type: Object,
            default: null, // ذخیره اطلاعات موقتی ثبت نام
        },
    },
    { timestamps: true }
);

// حذف خودکار OTP پس از انقضا
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Otp", otpSchema);
