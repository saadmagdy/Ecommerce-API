import express from "express";
import * as brandCtrl from "../controllers/brandCtrl.js";
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from "../validation/brand.validation.js";
import uploadSingleFile from "../utils/file.upload.js";
import { allowedTo, auth } from "../middlewares/Auth.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    uploadSingleFile("brand", "logo"),
    auth,
    allowedTo("admin"),
    brandCtrl.setLogoToBody,
    createBrandValidator,
    brandCtrl.createBrand
  )
  .get(brandCtrl.getAllBrands);

brandRouter
  .route("/:id")
  .get(getBrandValidator, brandCtrl.getBrandById)
  .put(
    uploadSingleFile("brand", "logo"),
    auth,
    allowedTo("admin"),
    updateBrandValidator,
    brandCtrl.updateBrand
  )
  .delete(
    auth,
    allowedTo("admin"),
    deleteBrandValidator,
    brandCtrl.deleteBrand
  );

export default brandRouter;
