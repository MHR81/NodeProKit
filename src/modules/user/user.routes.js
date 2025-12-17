import { Router } from "express";
import {
    getMyProfile,
    editMyProfile,
    getAllUsers,
    getUserById,
    editUserByAdmin,
    deleteUserByAdmin,
} from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/index.js";

const router = Router();

// مسیرهای کاربر خودش
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, editMyProfile);

// مسیرهای ادمین
router.get("/", authMiddleware, roleMiddleware(ROLES.ADMIN), getAllUsers);
router.get("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), getUserById);
router.put("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), editUserByAdmin);
router.delete("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), deleteUserByAdmin);

export default router;
