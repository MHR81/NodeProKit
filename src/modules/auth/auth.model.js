import mongoose from "mongoose";
import { ROLES } from "../../constants/index.js";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            unique: true,
            sparse: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
