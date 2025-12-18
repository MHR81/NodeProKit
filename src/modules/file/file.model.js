import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        filename: { type: String, required: true },
        filePath: { type: String, required: true }, // محل ذخیره فایل
        fileSize: { type: Number }, // اندازه فایل بر حسب بایت
        mimeType: { type: String }, // نوع فایل (image/jpeg, etc)
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("File", fileSchema);
