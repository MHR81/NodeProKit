import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        filename: { type: String, required: true },
        url: { type: String, required: true },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        publicId: { type: String }, // Cloudinary public_id
    },
    { timestamps: true }
);

export default mongoose.model("File", fileSchema);
