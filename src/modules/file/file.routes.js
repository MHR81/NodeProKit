import { Router } from "express";
import { uploadFile, getFileById, deleteFileByAdmin } from "./file.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/index.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "tmp/" }); // temp storage

// مسیرهای کاربران
router.get("/:id", getFileById);
router.post("/", authMiddleware, upload.single("file"), uploadFile);

// مسیرهای ادمین
router.delete("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), deleteFileByAdmin);

export default router;
