import express from "express";
import * as productCtrl from "../controllers/productCtrl.js";
import {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
} from "../validation/product.validation.js";
import uploadMixOfFiles from "../utils/mixFilesUpload.js";
import { auth, allowedTo } from "../middlewares/Auth.js";
import reviewsRoute from "./review.routes.js";
const productRouter = express.Router();

productRouter.use("/:productId/review", reviewsRoute);
productRouter
  .route("/")
  .post(
    uploadMixOfFiles("Product", [
      {
        name: "imageCover",
        maxCount: 1,
      },
      {
        name: "images",
        maxCount: 5,
      },
    ]),
    auth,
    allowedTo("admin"),
    productCtrl.setCoverImageToBody,
    productCtrl.setImagesToBody,
    createProductValidator,
    productCtrl.createProduct
  )
  .get(productCtrl.getAllProducts);

productRouter
  .route("/:id")
  .get(getProductValidator, productCtrl.getProductById)
  .put(
    auth,
    allowedTo("admin"),
    updateProductValidator,
    productCtrl.updateProduct
  )
  .delete(
    auth,
    allowedTo("admin"),
    deleteProductValidator,
    productCtrl.deleteProduct
  );

export default productRouter;
