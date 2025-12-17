import File from "./file.model.js";
import { success, error } from "../../utils/response.js";
import cloudinary from "../../utils/cloudinary.js";

// آپلود فایل
export const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) return next(error("No file provided", 400));

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "uploads",
        });

        const file = await File.create({
            filename: req.file.originalname,
            url: result.secure_url,
            publicId: result.public_id,
            uploadedBy: req.user.userId,
        });

        return success(res, file, "File uploaded successfully");
    } catch (err) {
        next(err);
    }
};

// دریافت فایل توسط ID
export const getFileById = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return next(error("File not found", 404));
        return success(res, file);
    } catch (err) {
        next(err);
    }
};

// حذف فایل توسط ادمین
export const deleteFileByAdmin = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return next(error("File not found", 404));

        // حذف از Cloudinary
        if (file.publicId) {
            await cloudinary.uploader.destroy(file.publicId);
        }

        await File.findByIdAndDelete(req.params.id);
        return success(res, null, "File deleted by admin");
    } catch (err) {
        next(err);
    }
};
