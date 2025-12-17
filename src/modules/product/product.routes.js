import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    deleteProduct,
} from "./product.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { roleMiddleware } from "../../middlewares/role.middleware.js";
import { ROLES } from "../../constants/index.js";

const router = Router();

// مسیرهای کاربران
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// مسیرهای ادمین
router.post("/", authMiddleware, roleMiddleware(ROLES.ADMIN), addProduct);
router.put("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), editProduct);
router.delete("/:id", authMiddleware, roleMiddleware(ROLES.ADMIN), deleteProduct);

export default router;
