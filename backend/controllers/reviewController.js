import Review from "../models/Review.js";
import Product from "../models/Product.js";

// @desc   Get all reviews for a product
// @route  GET /api/reviews/:productId
// @access Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc   Add a review for a product
// @route  POST /api/reviews/:productId
// @access Private
export const addReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReview = await Review.findOne({
      product: req.params.productId,
      user: req.user.id,
    });

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = new Review({
      user: req.user.id,
      product: req.params.productId,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
