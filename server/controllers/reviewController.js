import Review from "../models/reviewModel.js";

export const createReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { rate, comment, product, reply } = req.body;

    const newReview = new Review({
      user: user._id,
      rate,
      comment,
      product,
      reply,
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
    const { reviewId } = req.params;
    const { rate, comment } = req.body;

    const existedReview = await Review.findById(reviewId);
    if (!existedReview) {
      return res.status(404).json({
        message: "Review not found!",
      });
    }

    const newReview = {
      rate: rate ? rate : existedReview.rate,
      comment: comment ? comment : existedReview.comment,
    };

    const result = await Review.updateOne(
      { _id: reviewId },
      { $set: newReview },
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

export const likeReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review.likes.includes(req.user._id)) {
      await review.updateOne({
        $push: { likes: req.user._id },
      });
      res.status(200).json("The review has been liked");
    } else {
      await review.updateOne({
        $pull: { likes: req.user._id },
      });
      res.status(200).json("The review has been disliked");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
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
    const reviews = await Review.find({
      product: productId,
    })
      .populate({
        path: "user",
        select: "_id avatar username",
      })
      .populate({
        path: "likes",
        select: "_id avatar username",
      });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId).populate({
      path: "user",
      select: "_id avatar username",
    });
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};
