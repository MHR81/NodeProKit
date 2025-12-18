import File from "./file.model.js";
import { success, error } from "../../utils/response.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// فایل‌ها در پوشه uploads ذخیره می‌شوند
const UPLOADS_DIR = path.join(__dirname, "../../..", "uploads");

// مطمئن شو پوشه موجود است
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// POST - آپلود فایل
export const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) return next(error("No file provided", 400));

        // تولید نام فایل منحصر به فرد
        const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const fileExtension = path.extname(req.file.originalname);
        const storedFilename = fileId + fileExtension;
        const filePath = path.join(UPLOADS_DIR, storedFilename);

        // کپی فایل از tmp به uploads
        fs.copyFileSync(req.file.path, filePath);
        // حذف فایل از tmp
        fs.unlinkSync(req.file.path);

        // ذخیره در دیتابیس
        const file = await File.create({
            filename: req.file.originalname,
            filePath: storedFilename,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedBy: req.user.userId,
        });

        // برگردان فقط ID و نام فایل
        return success(res, {
            id: file._id,
            filename: file.filename,
        }, "File uploaded successfully");
    } catch (err) {
        next(err);
    }
};

// GET - اطلاعات فایل
export const getFileById = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return next(error("File not found", 404));
        return success(res, file);
    } catch (err) {
        next(err);
    }
};

// GET - دیدن/دانلود فایل (عمومی)
export const viewFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // بررسی کن که parameter یک ObjectId نیست (تنها filePath را پذیرفته شود)
        if (id.length === 24 && /^[0-9a-f]{24}$/.test(id)) {
            return next(error("Invalid file path", 400));
        }

        const file = await File.findOne({ filePath: id });
        if (!file) return next(error("File not found", 404));

        const filePath = path.join(UPLOADS_DIR, file.filePath);

        // بررسی وجود فایل
        if (!fs.existsSync(filePath)) {
            return next(error("File not found on server", 404));
        }

        // تنظیم headers و سرویس دهی فایل
        res.setHeader("Content-Type", file.mimeType || "application/octet-stream");
        res.setHeader("Content-Disposition", `inline; filename="${file.filename}"`);
        res.setHeader("Cache-Control", "public, max-age=3600"); // کش یک ساعت
        
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (err) {
        next(err);
    }
};

// DELETE - حذف فایل (فقط ادمین)
export const deleteFileByAdmin = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return next(error("File not found", 404));

        // حذف فایل از دیسک
        const filePath = path.join(UPLOADS_DIR, file.filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // حذف از دیتابیس
        await File.findByIdAndDelete(req.params.id);
        return success(res, null, "File deleted successfully");
    } catch (err) {
        next(err);
    }
};
