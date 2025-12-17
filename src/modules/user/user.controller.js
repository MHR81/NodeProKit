import User from "./user.model.js";
import { success, error } from "../../utils/response.js";
import { hashPassword } from "../../utils/hash.js";
import { ROLES } from "../../constants/index.js";

// کاربر خودش
export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        return success(res, user);
    } catch (err) {
        next(err);
    }
};

export const editMyProfile = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const updates = {};

        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (password) updates.password = await hashPassword(password);

        const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true }).select("-password");
        return success(res, user, "Profile updated");
    } catch (err) {
        next(err);
    }
};

// فقط برای ادمین
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        return success(res, users);
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return next(error("User not found", 404));
        return success(res, user);
    } catch (err) {
        next(err);
    }
};

export const editUserByAdmin = async (req, res, next) => {
    try {
        const { email, phone, password, role } = req.body;
        const updates = {};
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (password) updates.password = await hashPassword(password);
        if (role && Object.values(ROLES).includes(role)) updates.role = role;

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
        return success(res, user, "User updated by admin");
    } catch (err) {
        next(err);
    }
};

export const deleteUserByAdmin = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return success(res, null, "User deleted by admin");
    } catch (err) {
        next(err);
    }
};
