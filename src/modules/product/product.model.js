import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        images: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
                filePath: { type: String }
            }
        ],
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
