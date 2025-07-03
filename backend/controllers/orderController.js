import Order from '../models/Order.js';
import Product from '../models/Product.js';

const createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    let totalAmount = 0;
    const orderItems = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Product with ID ${item.product} not found`);
        
        totalAmount += product.price * item.quantity; 
        
        return {
          product: product._id,
          quantity: item.quantity
        };
      })
    );

    totalAmount = Number(totalAmount.toFixed(2));

    const order = new Order({
      user: req.user.id,
      products: orderItems,
      totalAmount, 
      status: 'Pending'
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    // Ensure only admin users can access this
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // Fetch all orders
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email address', 
      })
      .populate({
        path: 'products.product',
        select: 'name price description',
      });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('products.product', 'name price');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure that only the owner or admin can access the order
    if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fetch orders of the logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createOrder, getOrders };
