import express from "express";
import * as reviewCtrl from "../controllers/reviewCtrl.js";
import { auth, allowedTo } from "../middlewares/Auth.js";
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from "../validation/review.validation.js";
const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
  .route("/")
  .get(reviewCtrl.createFilterObj, reviewCtrl.getAllReviews)
  .post(
    auth,
    allowedTo("user"),
    reviewCtrl.setProductIdAndUserIdToBody,
    createReviewValidator,
    reviewCtrl.createReview
  );

reviewRouter
  .route("/:id")
  .get(getReviewValidator, reviewCtrl.getOneReview)
  .put(auth, allowedTo("user"), updateReviewValidator, reviewCtrl.updateReview)
  .delete(
    auth,
    allowedTo("user", "admin"),
    deleteReviewValidator,
    reviewCtrl.deleteReview
  );

export default reviewRouter;
