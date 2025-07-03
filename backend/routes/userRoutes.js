import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser } from '../controllers/userController.js';
const router = express.Router();
import { adminOnly, protect } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);  
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, adminOnly, getAllUsers); 
router.delete('/:id', protect, adminOnly, deleteUser);

export default router;