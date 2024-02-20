import express from "express";
import * as cartCtrl from "../controllers/cartCtrl.js";
import { auth, allowedTo } from "../middlewares/Auth.js";

const cartRouter = express.Router();

cartRouter.use(auth, allowedTo("user"));
cartRouter
  .route("/")
  .post(cartCtrl.addProductToCart)
  .get(cartCtrl.getLoggedUserCart)
  .delete(cartCtrl.clearCart);

cartRouter.put("/applyCoupon", cartCtrl.applyCoupon);

cartRouter
  .route("/:itemId")
  .put(cartCtrl.updateCartItemQuantity)
  .delete(cartCtrl.removeSpecificCartItem);

export default cartRouter;
