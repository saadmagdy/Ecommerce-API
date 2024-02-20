import express from "express";
import { auth, allowedTo } from "../middlewares/Auth.js";
import * as whishlistCtrl from "../controllers/wishListCtrl.js";
const whishListRouter = express.Router();

whishListRouter.use(auth, allowedTo("user"));
whishListRouter
  .route("/")
  .post(whishlistCtrl.addProductToWishlist)
  .get(whishlistCtrl.getLoggedUserWishlist);
whishListRouter
  .route("/:productId")
  .delete(whishlistCtrl.removeProductFromWishlist);
export default whishListRouter;
