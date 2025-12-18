import { config } from "../config/env.js";

// Helper برای ساختن URL فایل
// این تابع میتواند براساس محیط localhost یا production URL تولید کند

export const getFileUrl = (filePath, filename = null) => {
    return `${config.appUrl}/${filePath}`;
};

export const getFullFileUrl = (fileObject) => {
    if (!fileObject || !fileObject.filePath) return null;
    return getFileUrl(fileObject.filePath, fileObject.filename);
};

// Export URL همراه با اطلاعات فایل برای response
export const enrichFileResponse = (fileObject) => {
    if (!fileObject) return null;
    return {
        id: fileObject._id,
        filename: fileObject.filename,
        url: getFileUrl(fileObject.filePath),
        mimeType: fileObject.mimeType,
    };
};

// برای Product Images
export const enrichProductImages = (images) => {
    if (!images || !Array.isArray(images)) return [];
    return images.map(img => ({
        fileId: img.fileId?._id,
        filename: img.fileId?.filename,
        url: img.fileId ? getFileUrl(img.fileId.filePath) : null,
        mimeType: img.fileId?.mimeType,
    }));
};

// برای User Avatar
export const enrichUserAvatar = (avatarFileId) => {
    if (!avatarFileId) return null;
    return {
        fileId: avatarFileId._id,
        filename: avatarFileId.filename,
        url: getFileUrl(avatarFileId.filePath),
        mimeType: avatarFileId.mimeType,
    };
};
