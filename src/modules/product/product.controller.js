import Product from "./product.model.js";
import { success, error } from "../../utils/response.js";

// کاربران
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return success(res, products);
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return next(error("Product not found", 404));
        return success(res, product);
    } catch (err) {
        next(err);
    }
};

// فقط ادمین
export const addProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        if (!name || !price) return next(error("Name and price are required", 400));

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
            createdBy: req.user.userId,
        });

        return success(res, product, "Product created");
    } catch (err) {
        next(err);
    }
};

export const editProduct = async (req, res, next) => {
    try {
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!product) return next(error("Product not found", 404));
        return success(res, product, "Product updated");
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return success(res, null, "Product deleted");
    } catch (err) {
        next(err);
    }
};
