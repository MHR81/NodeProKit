import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import fileRoutes from "../modules/file/file.routes.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ success: true, message: "🚀API is running..." });
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/files", fileRoutes);

export default router;
