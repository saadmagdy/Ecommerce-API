import express from "express";
import { auth, allowedTo } from "../middlewares/Auth.js";
import * as couponCtrl from "../controllers/couponCtrl.js";
const couponRouter = express.Router();
couponRouter.use(auth, allowedTo("admin"));

couponRouter
  .route("/")
  .get(couponCtrl.getCoupons)
  .post(couponCtrl.createCoupon);
couponRouter
  .route("/:id")
  .get(couponCtrl.getCoupon)
  .put(couponCtrl.updateCoupon)
  .delete(couponCtrl.deleteCoupon);

export default couponRouter;
