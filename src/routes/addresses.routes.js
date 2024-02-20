import express from "express";
import { auth, allowedTo } from "../middlewares/Auth.js";
import * as addressesCtrl from "../controllers/addressesCtrl.js";
const addressesRouter = express.Router();

addressesRouter.use(auth, allowedTo("user"));

addressesRouter
  .route("/")
  .post(addressesCtrl.addAddress)
  .get(addressesCtrl.getLoggedUserAddresses);
addressesRouter.route("/:addressId").delete(addressesCtrl.removeAddress);

export default addressesRouter;
