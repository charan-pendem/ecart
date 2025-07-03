import Product from '../models/Product.js';

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;
    const product = new Product({ name, price, description, category, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProductStock = async (req, res) => {
  try {
    const { stock } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.stock = stock;
    await product.save();

    res.status(200).json({ message: 'Product stock updated', product });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Admin removes a product
export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getProducts, addProduct };