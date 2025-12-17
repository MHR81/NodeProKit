import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/env.js";

cloudinary.config({
    secure: true,
    api_version: "1_1"
});

if (config.cloudinaryUrl) {
    process.env.CLOUDINARY_URL = config.cloudinaryUrl;
}

export default cloudinary;
