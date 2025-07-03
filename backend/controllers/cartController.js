import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Clear cart
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
