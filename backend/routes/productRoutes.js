import express from 'express';
import { getProducts, addProduct, getProductById } from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { updateProductStock, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get("/:id", getProductById);
router.post('/', protect, adminOnly, addProduct); 
router.put('/:productId/stock', protect, adminOnly, updateProductStock);
router.delete('/:productId', protect, adminOnly, deleteProduct);

export default router;
