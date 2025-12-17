import { Router } from "express";
import {
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyOtp,
    logout,
} from "./auth.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { otpRateLimit } from "../../middlewares/rateLimit.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", otpRateLimit, forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", authMiddleware, logout);

export default router;
