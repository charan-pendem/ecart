import express from 'express';
import { createOrder, getOrders, getSingleOrder, getUserOrders } from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, adminOnly, getOrders);
router.get('/myorders', protect, getUserOrders);
router.get('/:orderId', protect, getSingleOrder); 
router.put('/:orderId/status', protect, adminOnly, updateOrderStatus);

export default router;