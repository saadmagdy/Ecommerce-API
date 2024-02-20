import express from "express";
import * as orderCtrl from "../controllers/orderCtrl.js";
import { auth, allowedTo } from "../middlewares/Auth.js";

const orderRouter = express.Router();

orderRouter.use(auth);
orderRouter.get(
  "/checkout-session/:cartId",
  allowedTo("user"),
  orderCtrl.checkoutSession
);

orderRouter
  .route("/:cartId")
  .post(allowedTo("user"), orderCtrl.createCashOrder);

orderRouter.get(
  "/",
  allowedTo("user", "admin"),
  orderCtrl.filterOrderForLoggedUser,
  orderCtrl.findAllOrders
);

orderRouter.get("/:id", orderCtrl.findSpecificOrder);

orderRouter.put("/:id/pay", allowedTo("admin"), orderCtrl.updateOrderToPaid);

orderRouter.put(
  "/:id/deliver",
  allowedTo("admin"),
  orderCtrl.updateOrderToDelivered
);

export default orderRouter;
