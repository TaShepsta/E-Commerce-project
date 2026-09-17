import Product from "../models/product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.getAll();

    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get product error:", error);
    next(error);
  }
};