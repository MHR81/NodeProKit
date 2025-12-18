import Product from "./product.model.js";
import File from "../file/file.model.js";
import { success, error } from "../../utils/response.js";

// GET - تمام محصولات
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().select("-createdBy").sort({ createdAt: -1 });
        return success(res, products);
    } catch (err) {
        next(err);
    }
};

// GET - یک محصول
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).select("-createdBy");
        if (!product) return next(error("Product not found", 404));
        return success(res, product);
    } catch (err) {
        next(err);
    }
};

// POST - ایجاد محصول
export const addProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, imageFileIds } = req.body;

        // Validation
        if (!name || !price) {
            return next(error("Name and price are required", 400));
        }
        if (price < 0) {
            return next(error("Price must be positive", 400));
        }
        if (stock < 0) {
            return next(error("Stock must be positive", 400));
        }

        // پردازش تصاویر
        const images = [];
        if (imageFileIds && Array.isArray(imageFileIds) && imageFileIds.length > 0) {
            for (const fileId of imageFileIds) {
                const file = await File.findById(fileId);
                if (file) {
                    images.push({
                        _id: file._id,
                        filePath: file.filePath
                    });
                }
            }
        }

        const product = await Product.create({
            name: name.trim(),
            description: description?.trim() || "",
            price,
            stock: stock || 0,
            images,
            createdBy: req.user.userId,
        });

        return success(res, product, "Product created successfully");
    } catch (err) {
        next(err);
    }
};

// PUT - بروزرسانی محصول
export const editProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, imageFileIds } = req.body;
        const updates = {};

        // تغییر فیلدهای معمولی
        if (name) updates.name = name.trim();
        if (description !== undefined) updates.description = description.trim();
        if (price) {
            if (price < 0) return next(error("Price must be positive", 400));
            updates.price = price;
        }
        if (stock !== undefined) {
            if (stock < 0) return next(error("Stock must be positive", 400));
            updates.stock = stock;
        }

        // تغییر تصاویر
        if (imageFileIds && Array.isArray(imageFileIds)) {
            const images = [];
            for (const fileId of imageFileIds) {
                const file = await File.findById(fileId);
                if (file) {
                    images.push({
                        _id: file._id,
                        filePath: file.filePath
                    });
                }
            }
            updates.images = images;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true, runValidators: true }
        );
        if (!product) return next(error("Product not found", 404));

        return success(res, product, "Product updated successfully");
    } catch (err) {
        next(err);
    }
};

// DELETE - حذف محصول
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return next(error("Product not found", 404));
        return success(res, null, "Product deleted successfully");
    } catch (err) {
        next(err);
    }
};
