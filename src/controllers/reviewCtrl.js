import Review from "../models/Review.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as factory from "./factoryHandler.js";

export const createFilterObj = asyncHandler(async (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
});

export const setProductIdAndUserIdToBody = asyncHandler(
  async (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
  }
);

// @desc     Create new Review
// route     POST /review
// @access   Private
export const createReview = factory.createOne(Review);

// @desc     Get list of Reviews
// route     GET /review
// @access   Public
export const getAllReviews = factory.getAll(Review);
// @desc     Get one Review
// route     GET /review/:id
// @access   Public
export const getOneReview = factory.getOne(Review);
// @desc     Update Review
// route     PUT /review/:id
// @access   Private
export const updateReview = factory.updateOne(Review);
// @desc     Delete Review
// route     DELETE /review/:id
// @access   Private
export const deleteReview = factory.deleteOne(Review);
