import Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { rate, comment, product } = req.body;

    const newReview = new Review({
      user: user._id,
      rate,
      comment,
      product,
    });

    const review = await newReview.save();
    res.status(201).json({
      message: "Review saved successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { rate, comment } = req.body;
    const { reviewId } = req.params;

    const result = await Review.updateOne(
      { _id: reviewId },
      { $set: { rate, comment } },
      { new: true }
    );
    res.status(200).json({
      message: "Review updated successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { rate, comment } = req.body;
    const { reviewId } = req.params;

    const result = await Review.findByIdAndDelete({
      _id: reviewId,
    });

    res.status(200).json({
      message: "Review deleted successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const review = await Review.find({
      product: productId,
    }).populate({
      path: "user",
      select: "_id avatar username",
    });
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
