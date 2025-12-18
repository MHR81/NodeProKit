import User from "./user.model.js";
import File from "../file/file.model.js";
import { success, error } from "../../utils/response.js";
import { hashPassword } from "../../utils/hash.js";
import { ROLES } from "../../constants/index.js";

// GET - پروفایل کاربر فعلی
export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        if (!user) return next(error("User not found", 404));
        return success(res, user);
    } catch (err) {
        next(err);
    }
};

// PUT - بروزرسانی پروفایل کاربر
export const editMyProfile = async (req, res, next) => {
    try {
        const { email, phone, password, avatarFileId } = req.body;
        const updates = {};

        if (email) updates.email = email.trim().toLowerCase();
        if (phone) updates.phone = phone.trim();
        if (password) updates.password = await hashPassword(password);

        // اگر avatarFileId داده شد، فایل را تایید کن
        if (avatarFileId) {
            const file = await File.findById(avatarFileId);
            if (!file) return next(error("Avatar file not found", 404));
            updates.avatars = [{
                _id: file._id,
                filePath: file.filePath
            }];
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        return success(res, user, "Profile updated successfully");
    } catch (err) {
        next(err);
    }
};

// GET - تمام کاربران (فقط ادمین)
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        return success(res, users);
    } catch (err) {
        next(err);
    }
};

// GET - یک کاربر (فقط ادمین)
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return next(error("User not found", 404));
        return success(res, user);
    } catch (err) {
        next(err);
    }
};

// PUT - بروزرسانی کاربر (فقط ادمین)
export const editUserByAdmin = async (req, res, next) => {
    try {
        const { email, phone, password, role, avatarFileId } = req.body;
        const updates = {};

        if (email) updates.email = email.trim().toLowerCase();
        if (phone) updates.phone = phone.trim();
        if (password) updates.password = await hashPassword(password);
        if (role && Object.values(ROLES).includes(role)) updates.role = role;

        // اگر avatarFileId داده شد، فایل را تایید کن
        if (avatarFileId) {
            const file = await File.findById(avatarFileId);
            if (!file) return next(error("Avatar file not found", 404));
            updates.avatars = [{
                _id: file._id,
                filePath: file.filePath
            }];
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) return next(error("User not found", 404));
        return success(res, user, "User updated successfully");
    } catch (err) {
        next(err);
    }
};

// DELETE - حذف کاربر (فقط ادمین)
export const deleteUserByAdmin = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return next(error("User not found", 404));
        return success(res, null, "User deleted successfully");
    } catch (err) {
        next(err);
    }
};
