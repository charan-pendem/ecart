import express from "express";
import { getReviews, addReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get all reviews for a product (Public)
router.get("/:productId", getReviews);

// ✅ Add a review for a product (Protected)
router.post("/:productId", protect, addReview);

export default router;
